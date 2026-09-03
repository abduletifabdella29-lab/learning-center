import 'dotenv/config';

import express from 'express'
import db from './db/db.config.js'

import mainRouter from './src/api/main.routes.js';

const app = express();

app.use('/api', mainRouter);


async function startServer() {
    try {
        const connection = await db.getConnection();
        connection.release();

        app.listen(3777, (err) => {
            if (err) {
                throw err;
            }
            console.log("server is running on port http://localhost:3777")
        });
    } catch (error) {
        console.log('Error starting server:', error.message)
    }
}

startServer()
