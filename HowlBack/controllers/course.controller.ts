import { Request, Response } from 'express';
import Course from '../models/course.model'; 
import CourseAttributes from '../models/course.model'

type CourseBasicInfo = Pick<Course, 'courseName' | 'description'>;

export const createCourse = async (req: Request, res: Response): Promise<void> => {
  const testcourse: CourseBasicInfo = {
    courseName: 'CSC316',
    description: 'algos bb'
  };


  try {
    // Create a course in the database
    const createdCourse = await Course.create(testcourse);

    // Send the created course as a response
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(500).json({ message: 'Error creating the course', error: error.message });
  }

};
