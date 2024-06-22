import { Router } from "express";
import * as ChatController from "../controllers/ChatController"

const chatRouter = Router();

chatRouter.get('/sessions', ChatController.test);

export default chatRouter;