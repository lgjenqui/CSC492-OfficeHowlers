import { Request, Response } from 'express';
import Course from '../models/course.model';
import User from '../models/user.model';
import Session from '../models/session.model';
import Ticket from '../models/ticket.model';
import { retrieveUser, findOrCreateUser } from '../services/user.service';
import { isValidInstructorForCourse, isValidInstructorOrAssistantForCourse, isValidUserForCourse } from '../services/course.service';
import { UUID } from 'crypto';
import { getCourseQueue } from './course.controller';
import { IntegerDataType } from 'sequelize';
import exp from 'constants';

export const createTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const createdTicket = await Ticket.create(req.body.ticket);
    const student = await retrieveUser(req.headers['x-shib_mail'] as string);
    if( student ) {
      await createdTicket.setUser(student);
      await student.setTicket(createdTicket)
      const course = await Course.findByPk(req.query.id as string);
      if (await isValidUserForCourse(student.email, course)) {
        await createdTicket.setCourse(course!);
        await course.addTicket(createdTicket);
        res.status(201).json(createdTicket);
      } else {
        throw new Error("You are not a current member of the course");
      }
    }
    else {
      throw new Error("invalid/empty student");
    }
    
  } catch (error) {
    res.status(500).json({ message: 'Error creating the ticket', error: error.message });
  }
};

export const setTicketStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await retrieveUser(req.headers['x-shib_mail'] as string);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const ticket = await Ticket.findByPk(req.body.ticketId);
    if (!ticket) {
      res.status(404).json({ message: 'Ticket not found' });
      return;
    }

    const session = await user.getSession();
    if (!session) {
      res.status(404).json({ message: 'Session not found for the user' });
      return;
    }

    ticket.active = req.body.active;

    // Determine the ticket location based on the session location
    let ticketLocation = session.inPersonLocation.length > 0 ? session.inPersonLocation : session.onlineLocation;
    console.log(ticketLocation);
    ticket.location = ticketLocation as string;

    // Save the changes to the ticket
    await ticket.save();
    console.log(ticket.location);
    res.status(200).json(ticket);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getMyTicket = async (req: Request, res: Response): Promise<void> => {
  const user = await retrieveUser((req.headers['x-shib_mail']) as string);
  try {
    const ticket = await user.getTicket({
      include: [{
        model: Course,
        attributes: ['name', 'description'],
      }]
    });
    res.status(200).json(ticket);
  } catch {
    res.status(500).json //server side error
  }
}

export const getMyTicketPosition = async (req: Request, res: Response): Promise<void> => {
  const user = (await retrieveUser((req.headers['x-shib_mail']) as string));
  const myTicket = await user.getTicket();
  const course = await myTicket.getCourse();
  const tickets = await course.getTickets();

  try {
    let position = 0;
    tickets.forEach((t, index) => {
      if(t.id == myTicket.id) {
        position = index;        
      }
    });
    res.status(200).json(position + 1);
  } catch {
    res.status(404).json;
  }
}
