import OpenAI from "openai";
import { Chat } from "../types/Chat";

export const bots = [];
export const chats: Chat[] = [];

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_TOKEN
})

console.log('Init OpenAI');

export default openai;
