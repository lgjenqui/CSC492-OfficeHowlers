import express, { Application, Request, Response, Router } from 'express';
import { createSession } from '../controllers/session.controller';
import cors from "cors";
import { createTicket, getMyTicketPosition, setBeingHelped } from '../controllers/ticket.controller';
import { getMyTicket } from '../controllers/ticket.controller';

const ticketRouter: Router = express.Router();

ticketRouter.get('/', cors(), getMyTicket );

ticketRouter.get('/position', cors(), getMyTicketPosition );

ticketRouter.post('/create', cors(), createTicket );

ticketRouter.post('/help', cors(), setBeingHelped );

export default ticketRouter;

