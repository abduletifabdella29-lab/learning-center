import { createConvesationService } from "../service/chat.service.js";

export async function createConversationController(req, res) {
}


export async function createConvesationController(req, res) {

    try {
        const { question } = req.body;

        const result = await createConvesatioService(question);

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
        res.send('get conversation api')
    } catch (error) {
        throw error;
    }
}