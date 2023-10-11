import { Request, Response } from 'express';
import Course from '../models/course.model';
import User from '../models/user.model';

export const createCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    // Create a course in the database
    const createdCourse = await Course.create({
      name: req.body.courseName || "Empty name",
      description: req.body.courseDescription || "Empty description",
    });
    const createdUser = await User.create({
      name: req.body.userName || "Empty name",
      email: req.body.userEmail || "Empty email",
    });
    await createdUser.addCourse(createdCourse);
    const ourUser = await User.findByPk(createdUser.email, {
      include: [User.associations.courses],
      rejectOnEmpty: true // Specifying true here removes `null` from the return type!
    });

    // Send the created course as a response
    res.status(201).json(ourUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating the course', error: error.message });
  }
};


export const getCourse = async (req: Request, res: Response): Promise<void> => {
  const course = await Course.findByPk(Number(req.query.id as string))
  res.send(course);
};

export const getAllCourses = async (req: Request, res: Response): Promise<void> => {
  const courses = await Course.findAll();
  res.send(courses);
};

export const deleteCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    Course.destroy({ where: { id: Number(req.query.id as string) } });
    res.status(200).send(true);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the course', error: error.message });
  }
};
