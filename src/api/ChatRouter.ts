import { Router } from "express";
import * as ChatController from "../controllers/ChatController"

const chatRouter = Router();

chatRouter.get('/', ChatController.getAll);

chatRouter.get('/:id', ChatController.get);

chatRouter.post('/', ChatController.create);

chatRouter.delete('/:id', ChatController.del);

chatRouter.post('/:id/send', ChatController.sned);

chatRouter.post('/:id/add-bot/:botId', ChatController.addBot);

export default chatRouter;