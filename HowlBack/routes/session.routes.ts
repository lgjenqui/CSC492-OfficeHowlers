import express, { Application, Request, Response, Router } from 'express';
import { createSession, getSessionTickets } from '../controllers/session.controller';
import cors from "cors";

const sessionRouter: Router = express.Router();

sessionRouter.get('/tickets', cors(), getSessionTickets );

sessionRouter.post('/create', cors(), createSession );

export default sessionRouter;

