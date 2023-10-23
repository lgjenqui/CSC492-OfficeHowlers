import { Request, Response } from 'express';
import Course from '../models/course.model'; 

export const createCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req);
    // Create a course in the database
    const createdCourse = await Course.create({
      name: req.body.courseName || "Empty name",
      description: req.body.courseDescription || "Empty description",
    });

    // Send the created course as a response
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(500).json({ message: 'Error creating the course', error: error.message });
  }
};


export const getCourse = async (req: Request, res: Response): Promise<void> => {
  const course = await Course.findByPk(req.query.id as string)
  res.send(course);
};

export const getAllCourses = async (req: Request, res: Response): Promise<void> => {
  const courses = await Course.findAll();
  res.send(courses);
};

export const deleteCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    Course.destroy({ where: { id: req.query.id as string } });
    res.status(200).send(true);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the course', error: error.message });
  }
};
