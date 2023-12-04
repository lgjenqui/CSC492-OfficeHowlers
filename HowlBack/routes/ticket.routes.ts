import express, { Router } from 'express';
import cors from "cors";
import {
  createTicket, 
  getMyTicket, 
  getMyTicketPosition, 
  setTicketStatus 
} from '../controllers/ticket.controller';

const ticketRouter: Router = express.Router();

// Apply CORS middleware to all routes in this router
ticketRouter.use(cors());

ticketRouter.get('/', getMyTicket);
ticketRouter.get('/position', getMyTicketPosition);
ticketRouter.post('/create', createTicket);
ticketRouter.post('/setStatus', setTicketStatus);

export default ticketRouter;
