import { Router } from "express";
import * as ChatController from "../controllers/ChatController"

const chatRouter = Router();

chatRouter.get('/', ChatController.test);

chatRouter.get('/:id', ChatController.get);

chatRouter.post('/', ChatController.test);

chatRouter.delete('/:id', ChatController.del);

export default chatRouter;