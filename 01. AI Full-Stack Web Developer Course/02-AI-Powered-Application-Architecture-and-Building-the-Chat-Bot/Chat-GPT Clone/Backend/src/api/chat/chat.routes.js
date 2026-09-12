import express from 'express'

const chatRouter = express.Router();

import { createConvesationController, getConvesationController } from './contoller/chat.controller.js'

chatRouter.post('/conversation',  createConvesationController);

chatRouter.get('/conversations', getConvesationController);

export default chatRouter