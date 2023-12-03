import express, { Application, Request, Response, Router } from 'express';
import { createSession, getSessionTickets, userHasOngoingSession } from '../controllers/session.controller';
import cors from "cors";

const sessionRouter: Router = express.Router();

sessionRouter.get('/tickets', cors(), getSessionTickets );

sessionRouter.get('/ongoing', cors(), userHasOngoingSession ); 

sessionRouter.post('/create', cors(), createSession );

export default sessionRouter;

