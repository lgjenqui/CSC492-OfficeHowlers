import express, { Application, Request, Response, Router } from 'express';
import { createSession } from '../controllers/session.controller';
import cors from "cors";

const sessionRouter: Router = express.Router();

sessionRouter.post('/create', cors(), createSession );

export default sessionRouter;
