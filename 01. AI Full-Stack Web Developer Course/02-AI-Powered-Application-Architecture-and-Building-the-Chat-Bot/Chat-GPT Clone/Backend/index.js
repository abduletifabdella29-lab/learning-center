import 'dotenv/config';

import express from 'express'
import cors from 'cors';
import db from './db/db.config.js'

import mainRouter from './src/api/main.routes.js';
import { errorHandler } from './src/middleware/error-handler.js'; 

const app = express();

// allow request from frontend port
app.use(
    cors({
        origin: ['http://localhost:5173', 'http://localhost:5174'],
        credentials: true,
    }),
);

app.use(express.json());
app.use('/api', mainRouter);

// final middleware for error handling
app.use(errorHandler);

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
