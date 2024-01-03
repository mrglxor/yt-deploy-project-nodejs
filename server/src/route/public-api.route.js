import express from "express";
import userController from "../controller/user.controller.js";

const publicRouter = express.Router();

publicRouter.post('/api/users',userController.register);
publicRouter.post('/api/users/login',userController.login);

export default publicRouter;