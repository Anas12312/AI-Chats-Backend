import express, { json } from "express";
import chatRouter from "./api/ChatRouter";

console.log('ENV:' + process.env.NODE_ENV);

const app = express();
const port = process.env.PORT || 3000;

// JSON Parser Middleware
app.use(json());

// Routers Middleware
app.use('/test', chatRouter);

app.listen(port, () => {
    console.log('Server listening on port: ' + port);
})