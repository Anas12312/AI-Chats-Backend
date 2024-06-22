import { RequestHandler } from "express";

export const test: RequestHandler = async (req, res, next) => {

    try {

        const { username, password } = req.body;

        // API Logic

        return res.status(200).send();
 
    }

    catch(e) {
        next(e)
    }

}