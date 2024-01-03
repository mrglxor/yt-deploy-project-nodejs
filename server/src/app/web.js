import express from "express";
import errorMiddleware from "../middleware/error.middleware.js";
import publicRouter from "../route/public-api.route.js";
import mongoDB from "./database.js";
import cors from "cors";
import webRouter from "../route/web.route.js";
import userRouter from "../route/api.route.js";

const web = express();

web.use(express.json());
web.use(cors());


mongoDB.then(() => {
    console.log('\n> connected to database..');
}).catch((e) => {
    console.error(`\n> failed connect to database!\n> message: ${e.message}`);
});

web.use(webRouter);
web.use(publicRouter);
web.use(userRouter);
web.use(errorMiddleware);

export default web;