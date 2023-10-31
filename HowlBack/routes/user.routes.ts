import express, { Router } from 'express';
import { getUser } from '../controllers/user.controller';
import cors from "cors";

const userRouter: Router = express.Router();
userRouter.get('/', cors(), getUser );

export default userRouter;

