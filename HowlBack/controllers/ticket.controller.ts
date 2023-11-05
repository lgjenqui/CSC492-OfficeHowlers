import { Request, Response } from 'express';
import Course from '../models/course.model';
import User from '../models/user.model';
import Session from '../models/session.model';
import Ticket from '../models/ticket.model';
import { retrieveUser, findOrCreateUser } from '../services/user.service';
import { isValidInstructorForCourse, isValidInstructorOrAssistantForCourse, isValidUserForCourse } from '../services/course.service';
import { UUID } from 'crypto';

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

export const getMyTicket = async (req: Request, res: Response): Promise<void> => {
  const user = await retrieveUser((req.headers['x-shib_mail']) as string);
  const ticket = await user.getTicket();
  res.status(200).json(ticket);
}
