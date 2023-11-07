import express, { Application, Request, Response, Router } from 'express';
import { createSession } from '../controllers/session.controller';
import cors from "cors";
import { createTicket } from '../controllers/ticket.controller';
import { getMyTicket } from '../controllers/ticket.controller';

const ticketRouter: Router = express.Router();

ticketRouter.get('/', cors(), getMyTicket );

ticketRouter.post('/create', cors(), createTicket );

export default ticketRouter;

