import db from '../../../../db/db.config.js';

const getRecentConversationRows = async (limit = 5) => {
    const [rows] = await db.execute(
            `SELECT id, role, content, created_at
            FROM conversations
            ORDER BY id DESC
            LIMIT ?`,
            [limit]
    );

    return rows.reverse();
};

export async function createConvesatioService(question) {
    try {
        // validation
        if (!question || !question.trim()) {
            const error = new Error('Question is required');
            error.status = 400;
            throw error;
        }

        // save to DB
        await db.execute(
            'INSERT INTO conversations (role, content) VALUES (?, ?)',
            ['user', question]
        );

        // get recent conversations
        const rows = await getRecentConversationRows(5);

        return rows;

    } catch (error) {
        throw error;
    }
}