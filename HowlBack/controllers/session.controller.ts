import { UUID } from 'crypto';
import { Request, Response } from 'express';
import Course from '../models/course.model';
import Session from '../models/session.model';
import Ticket from '../models/ticket.model';
import User from '../models/user.model';
import { isValidInstructorForCourse, isValidInstructorOrAssistantForCourse, isValidUserForCourse } from '../services/course.service';
import { findOrCreateUser, retrieveUser } from '../services/user.service';

export const createSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const instructorUser = await retrieveUser(req.headers['x-shib_mail'] as string);
    if(instructorUser ) {
      const courses = await Promise.all(req.body.courseIDs.map(async (id: UUID) => {
        const course = await Course.findByPk(id);
        if ( await isValidInstructorOrAssistantForCourse(instructorUser.email, course)) {
          return course;
        }
        return Promise.reject("User not eligible to start Session for Course: " + course.name);
      }));
      const createdSession = await Session.create(req.body);
      await createdSession.setUser(instructorUser);
      await Promise.all(courses.map(async (course: Course) => {
        return createdSession.addCourse(course);
      }));
      res.status(201).json(createdSession);
    }
    else {
      throw new Error("invalid/empty instructor");
    }
    
  } catch (error) {
    res.status(500).json({ message: 'Error creating the course', error: error.message });
  }
};

export const getSessionTickets = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await retrieveUser(req.headers['x-shib_mail'] as string);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const session = await user.getSession();
    if (!session) {
      res.status(404).json({ message: 'Session not found' });
      return;
    }

    // Fetch all the courses
    const courses = await session.getCourses();

    // Now, for each course, fetch the tickets
    const ticketsPromises = courses.map(course => {
      return course.getTickets({
        include: [{ 
          model: Course, 
          attributes: ['name', 'description'] 
        }, 
        {
          model: User,
          attributes: ['firstName', 'lastName'],
        },]
      });
    });

    // Resolve all promises to get the tickets
    const ticketsResults = await Promise.all(ticketsPromises);

    // Flatten the array of ticket arrays
    const tickets = ticketsResults.flat();

    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching session tickets:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const userHasOngoingSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await retrieveUser(req.headers['x-shib_mail'] as string);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const session = await user.getSession();
    // Check if the user has a session and it's not yet ended
    if (session && session.endTime > new Date()) {
      res.status(200).json({ hasSession: true });
    } else {
      res.status(200).json({ hasSession: false });
    }

    
  } catch (error) {
    console.error('Error checking if this user has an ongoing session', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};