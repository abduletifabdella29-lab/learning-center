import express from 'express'

const chatRouter = express.Router();

import { createConvesationController, getConvesationController } from './contoller/chat.controller.js'

// api/chat/conversation
chatRouter.post('/conversation',  createConvesationController);

chatRouter.get('/conversation', getConvesationController);

export default chatRouter