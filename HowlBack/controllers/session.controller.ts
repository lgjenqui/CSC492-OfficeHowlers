import { Request, Response } from 'express';
import Course from '../models/course.model';
import User from '../models/user.model';
import Session from '../models/session.model';
import { retrieveUser, findOrCreateUser } from '../services/user.service';
import { isValidInstructorForCourse, isValidInstructorOrAssistantForCourse, isValidUserForCourse } from '../services/course.service';
import { UUID } from 'crypto';

export const createSession = async (req: Request, res: Response): Promise<void> => {
  try {
    // Create a course in the database
    const createdSession = await Session.create();
    const instructorUser = await retrieveUser(req.headers['x-shib_mail'] as string);
    if(instructorUser ) {
      await createdSession.setUser(instructorUser);
      await Promise.all(req.body.courseIDs.map(async (id: UUID) => {
        const course = await Course.findByPk(id);
        if ( await isValidInstructorOrAssistantForCourse(instructorUser.email, course)) {
          return createdSession.addCourse(course);
        }
        return Promise.reject("User not eligible to start Session for Course: " + course.name);
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
