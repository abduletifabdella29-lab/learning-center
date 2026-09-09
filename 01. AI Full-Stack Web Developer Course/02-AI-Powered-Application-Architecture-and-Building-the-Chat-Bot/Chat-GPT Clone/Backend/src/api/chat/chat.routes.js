import express from 'express'

const chatRouter = express.Router();

import { createConvesationController, getConvesationController } from './contoller/chat.controller.js'

// api/chat/conversations (በብዙ ቁጥር)
chatRouter.post('/conversation',  createConvesationController);

// 'conversations' ብለህ አስተካክለው (s ጨምርበት)
chatRouter.get('/conversations', getConvesationController);

export default chatRouter