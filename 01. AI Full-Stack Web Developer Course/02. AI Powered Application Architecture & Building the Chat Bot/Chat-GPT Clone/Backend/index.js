import 'dotenv/config';
import express from 'express'
import db from './db/db.config.js'

const app = express();

app.post("api/chat/conversations", (req,res) => {
    res.send('post method');
})

app.get("api/chat/conversations", (req,res) => {
    res.send('get method');
})

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
