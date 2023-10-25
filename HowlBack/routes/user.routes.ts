import express, { Application, Request, Response, Router } from 'express';
import { getUsername } from '../controllers/user.controller';
import cors from "cors";

const userRouter: Router = express.Router();
userRouter.get('/', cors(), getUsername );

export default userRouter;

