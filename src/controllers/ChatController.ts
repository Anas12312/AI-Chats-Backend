import { RequestHandler } from "express";
import openai, { chats } from "../openai/opanai";
import { Chat } from "../types/Chat";

export const test: RequestHandler = async (req, res, next) => {

    try {

        const { username, password } = req.body;

        // API Logic

        return res.status(200).send();

    }

    catch (e) {
        next(e)
    }

}

export const create: RequestHandler = async (req, res, next) => {
    try {

        const { name } = req.body;

        // Create Thread
        const thread = await openai.beta.threads.create();

        const chatObj: Chat = {
            id: thread.id,
            name: name
        }

        chats.push(chatObj)

        return res.send(chatObj);

    }
    catch (e) {
        next(e)
    }
}


export const get: RequestHandler<{ id: string }> = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Create Thread
        const thread = await openai.beta.threads.retrieve(id);

        const messages = await openai.beta.threads.messages.list(thread.id);

        return res.send(messages);

    }
    catch (e) {
        next(e)
    }
}

export const del: RequestHandler<{id: string}> = async (req, res, next) => {
    try {

        const { id } = req.params;

        const thread = await openai.beta.threads.retrieve(id);

        if(!thread) return res.status(404).send();

        // Create Thread
        await openai.beta.threads.del(id);

        return res.send();
    }
    catch (e) {
        next(e)
    }
} 