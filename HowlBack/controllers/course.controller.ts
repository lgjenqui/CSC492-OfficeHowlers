import { Request, Response } from 'express';
import Course from '../models/course.model'; 
import CourseAttributes from '../models/course.model';

type CourseBasicInfo = Pick<Course, 'courseName' | 'description'>;

const course: CourseBasicInfo = {
  courseName: "default",
  description: "Another default"
}
export const createCourse = async (req: Request, res: Response): Promise<void> => {
  course.courseName = req.body.courseName || "invalid body ig";
  course.description = req.body.courseDescription || "Invalid desc";


  // try {
  //   // Create a course in the database
  //   const createdCourse = await Course.create(testcourse);

  //   // Send the created course as a response
  //   res.status(201).json(createdCourse);
  // } catch (error) {
  //   res.status(500).json({ message: 'Error creating the course', error: error.message });
  // }

  res.send(course);

};


export const getCourse = async (req: Request, res: Response): Promise<void> => {
  res.send(course);
};

export const deleteCourse = async (req: Request, res: Response): Promise<void> => {
  course.courseName = "deleted";
  course.description = "deleted too";
  res.send(course);
};