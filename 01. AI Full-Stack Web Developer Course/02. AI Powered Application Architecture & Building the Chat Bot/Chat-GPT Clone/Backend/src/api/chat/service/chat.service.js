export async function createConvesatioService(question) {
    try {

        // validation
        if (!question.trim()) {
            const error = new Error('Question is requierd')
            error.status = 400;
            throw error;
        }

        return `chat saved to db with question: ${question}`;
    } catch (error) {
        throw error;
    }
}