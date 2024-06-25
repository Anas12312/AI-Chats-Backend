import { RequestHandler } from "express";
import openai, { chats, setChats } from "../openai/opanai";
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

export const sned: RequestHandler<{ id: string }> = async (req, res, next) => {
    try {
        const { message } = req.body;
        const { id } = req.params

        await openai.beta.threads.messages.create(
            id,
            {
                role: 'user',
                content: message
            }
        )

        // Run 

        return res.send('Hello');
    }
    catch (e) {
        next(e);
    }
}

export const create: RequestHandler = async (req, res, next) => {
    try {

        const { name } = req.body;

        // Create Thread
        const thread = await openai.beta.threads.create();

        console.log(name);

        chats.push({
            name,
            id: thread.id
        })

        return res.send(chats);

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

export const del: RequestHandler<{ id: string }> = async (req, res, next) => {
    try {

        const { id } = req.params;

        const thread = await openai.beta.threads.retrieve(id);

        if (!thread) return res.status(404).send();

        // Create Thread
        await openai.beta.threads.del(id);

        setChats(chats.filter(x => x.id !== id));
        return res.send(chats);
    }
    catch (e) {
        next(e)
    }
}

export const getAll: RequestHandler = async (req, res, next) => {
    try {
        res.send(chats);
    }
    catch (e) {
        next(e)
    }
}

export const addBot: RequestHandler<{ id: string, botId: string }> = async (req, res, next) => {
    try {
        const { id, botId } = req.params;

        const bot = await openai.beta.assistants.retrieve(botId)

        if (!bot) return res.send(404);

        const chat = await openai.beta.assistants.retrieve(id);

        if (!chat) return res.send(404);

        let botList

        setChats(chats.map(x => {
            if (x.id === id) {
                botList = x.bots?.concat({
                    id: bot.id,
                    name: bot.name
                })
                x.bots = botList
            }
            return x;
        }))

        return res.send({
            botList
        });

    }
    catch (e) {
        next(e)
    }
}