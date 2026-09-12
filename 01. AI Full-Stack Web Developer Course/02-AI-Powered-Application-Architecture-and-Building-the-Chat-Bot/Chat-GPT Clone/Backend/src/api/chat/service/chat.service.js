import { text } from "express";
import db from "../../../../db/db.config.js";
import { GoogleGenAI } from "@google/genai";

const GEMINI_MODEL = "gemini-3.5-flash-lite";

const geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getRecentConversationRows = async (limit = 5) => {
    const normalizedLimit = Number.parseInt(limit, 10);
    const safeLimit = 
    Number.isNaN(normalizedLimit) || normalizedLimit <= 0
    ? 20
    : normalizedLimit;

    const [rows] = await db.execute(
        `SELECT id, role, content, created_at
        FROM conversations
        ORDER BY id DESC
        LIMIT ?`,
        [limit],
    );

    return rows.reverse();
};

const generateAssistantAnswer = async ({ historyRows, question }) => {
    // Format history for Gemini chats
    const formattedHistory = historyRows.map((row) => ({
        role: row.role === "assistant" ? "model" : "user",
        parts: [{ text: row.content }],
    }));

    const chat = geminiClient.chats.create({
        model: GEMINI_MODEL,
        config: {
            maxOutputTokens: 1024,
            systemInstruction: "Your name is Abduletif, an expert AI software engineering assistant. Always introduce yourself by name if asked (e.g., 'Hello! I am Abduletif, your AI software engineering assistant.'). Your primary focus is coding, web development, debugging, and software architecture. If the user asks a non-technical or personal question (like travel), acknowledge it briefly through the lens of a developer or tech enthusiast, but gently steer the conversation back to how you can help them build, code, or solve technical problems today."
        },
        history: formattedHistory,
    });

    const result = await chat.sendMessage({ message: question });
    return {
        text: result.text,
        totalTokens: result.usageMetadata.totalTokenCount,
    };
};


const getMessageById = async messageId => {
    const [rows] = await db.execute(
        'SELECT id, role, content, token_count, created_at FROM conversations WHERE id = ? LIMIT 1',
        [messageId],
    );
    if (!rows[0]) return null;
    return {
        id: rows[0].id,
        role: rows[0].role,
        content: rows[0].content,
        tokenCount: Number(rows[0].token_count || 0),
        createdAt: rows[0].created_at,
    };
};


export async function createConvesationService(question) {
    try {
        // validation
        if (!question || !question.trim()) {
            const error = new Error("Question is required");
            error.status = 400;
            throw error;
        }

        // get recent conversations
        const historyRows = await getRecentConversationRows(5);

        // insert new conversation
        const [userInsertResult] = await db.execute(
            `INSERT INTO conversations (content, role) VALUES (?, "user")`,
            [question],
        );

        const assistantAnswer = await generateAssistantAnswer({
            historyRows,
            question,
        });

        const [assistantInsertResult] = await db.execute(
            "INSERT INTO conversations (role, content, token_count) VALUES (?, ?, ?)",
            ["assistant", assistantAnswer.text, assistantAnswer.totalTokens],
        );

        const userConversation = await getMessageById(
            userInsertResult.insertId
        );

        const assistantConversation = await getMessageById(
            assistantInsertResult.insertId
        );

        return {
            userConversation,
            assistantConversation,
        };
    } catch (error) {
        throw error;
    }
}
