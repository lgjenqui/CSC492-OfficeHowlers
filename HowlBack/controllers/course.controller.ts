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
    const instructorUser = await User.findByPk((req.headers['x-shib_mail']) as string);
    await instructorUser.addInstructorCourse(createdCourse);
    createdCourse.addInstructor(instructorUser);
    await Promise.all(req.body.studentRoster.map( async (email: string ) => {
      let student = await User.findByPk(email);
      if (!student) {
        student = await User.create({
          name: "Unset name",
          email: email,
        });
      }
      return createdCourse.addStudent(student);
    }));
    // const ourUser = await User.findByPk(createdUser.email, {
    //   include: [User.associations.courses],
    //   rejectOnEmpty: true // Specifying true here removes `null` from the return type!
    // });

    // Send the created course as a response
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(500).json({ message: 'Error creating the course', error: error.message });
  }
};

export const getCourse = async (req: Request, res: Response): Promise<void> => {
  const course = await Course.findByPk(Number(req.query.id as string), 
    {include: [Course.associations.instructors, Course.associations.assistants, Course.associations.students]});
  res.send(course);
};

export const getAllCourses = async (req: Request, res: Response): Promise<void> => {
  const courses = await Course.findAll({include: [Course.associations.instructors, Course.associations.assistants, Course.associations.students]});
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
