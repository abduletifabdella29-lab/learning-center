import { Connection } from 'mysql2';
import db from '../../../../db/db.config.js'

export async function createConvesatioService(question) {
    try {
        // validation
        if (!question.trim()) {
            const error = new Error('Question is requierd')
            error.status = 400;
            throw error;
        }

        // save to db
        await db.execute(
            'INSERT INTO conversations (content) VALUE (?)',
            [question,]
        );

        return `chat saved to db with question: ${question}`;
    } catch (error) {
        throw error;
    }
}