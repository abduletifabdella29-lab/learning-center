import { text } from "express";
import db from "../../../../db/db.config.js";
import { GoogleGenAI } from "@google/genai";

const GEMINI_MODEL = "gemini-3.5-flash-lite";

const geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const getRecentConversationRows = async (limit = 5) => {
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
        history: formattedHistory,
    });

    const result = await chat.sendMessage({ message: question });
    return {
        text: result.text,
        totalTokens: result.usageMetadata.totalTokenCount,
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
        await db.execute(
            `INSERT INTO conversations (content, role) VALUES (?, "user")`,
            [question],
        );

        const assistantAnswer = await generateAssistantAnswer({
            historyRows,
            question,
        });

        const createAssistantMessageResult = await db.execute(
            "INSERT INTO conversations (role, content, token_count) VALUES (?, ?, ?)",
            ["assistant", assistantAnswer.text, assistantAnswer.totalTokens],
        );

        return {
            assistantAnswer: assistantAnswer.text,
        };
    } catch (error) {
        throw error;
    }
}
