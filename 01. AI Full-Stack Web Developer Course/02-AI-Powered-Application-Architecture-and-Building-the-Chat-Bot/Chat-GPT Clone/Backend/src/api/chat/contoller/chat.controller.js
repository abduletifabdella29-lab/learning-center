import { GenerateContentResponse } from "@google/genai";
import { createConvesationService, getRecentConversationRows } from "../service/chat.service.js";

export async function createConversationController(req, res) {
}

export async function createConvesationController(req, res) {

    try {
        const { question } = req.body;

        const result = await createConvesationService(question);

        res.status(201).json({
            success: true,
            message: 'Conversation posted successfully.',
            data: result,
        });
    } catch (error) {
        throw error;
    }
}

export async function getConvesationController(req, res) {
    try {
    const result = await getRecentConversationRows(100);
    res.status(200).json({
        success: true,
        message: 'conversation fetched successfully',
        data: result,
    });
    } catch (error) {
        throw error;
    }
}