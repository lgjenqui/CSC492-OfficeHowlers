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
      // await instructorUser.session(createdSession);
      // createdSession.addInstructor(instructorUser);
    }
    // const ourUser = await User.findByPk(createdUser.email, {
    //   include: [User.associations.courses],
    //   rejectOnEmpty: true // Specifying true here removes `null` from the return type!
    // });

    // Send the created course as a response
    res.status(201).json(createdSession);
  } catch (error) {
    res.status(500).json({ message: 'Error creating the course', error: error.message });
  }
};
