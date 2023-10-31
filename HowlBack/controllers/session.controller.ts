import { Request, Response } from 'express';
import Course from '../models/course.model';
import User from '../models/user.model';
import Session from '../models/session.model';
import { retrieveUser, findOrCreateUser } from '../services/user.service';
import { isValidInstructorForCourse, isValidUserForCourse } from '../services/course.service';

export const createSession = async (req: Request, res: Response): Promise<void> => {
  try {
    // Create a course in the database
    const createdSession = await Session.create(req.body);
    const instructorUser = await retrieveUser(req.headers['x-shib_mail'] as string);
    if(instructorUser) {
      createdSession.setInstructor(instructorUser);
      res.status(201).json(createdSession);
    }
    else {
      throw new Error("invalid/empty instructor");
    }
    
  } catch (error) {
    res.status(500).json({ message: 'Error creating the course', error: error.message });
  }
};
