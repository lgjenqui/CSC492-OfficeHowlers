import { Request, Response } from 'express';
import Course from '../models/course.model';
import User from '../models/user.model';
import { retrieveUser, findOrCreateUser } from '../services/user.service';
import { isValidInstructorForCourse, isValidUserForCourse } from '../services/course.service';

export const createCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    // Create a course in the database
    const createdCourse = await Course.create(req.body);
    const instructorUser = await retrieveUser(req.headers['x-shib_mail'] as string);
    await instructorUser.addInstructorCourse(createdCourse);
    createdCourse.addInstructor(instructorUser);
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
  if (await isValidUserForCourse((req.headers['x-shib_mail']) as string, course)) {
    res.send(course);
  } else {
    res.status(403).json({ success: false, error: "Unauthorized for course retrieval" });
  }
};

export const getAllMyCourses = async (req: Request, res: Response): Promise<void> => {
  // const courses = await Course.findAll({include: [Course.associations.instructors, Course.associations.assistants, Course.associations.students]});
  const user = await User.findByPk((req.headers['x-shib_mail']) as string);
  const instructorCourses = await user.getInstructorCourses();
  const assistantCourses = await user.getAssistantCourses();
  const studentCourses = await user.getStudentCourses();
  const courses = { instructorCourses: instructorCourses, 
    assistantCourses: assistantCourses, 
    studentCourses: studentCourses
  };
  res.send(courses);
};


// ====== For testing only ===> To be deleted later
export const deleteCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    Course.destroy({ where: { id: Number(req.query.id as string) } });
    res.status(200).send(true);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the course', error: error.message });
  }
};

export const setInstructorsByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findByPk(Number(req.query.id as string));
    const instructorEmail = (req.headers['x-shib_mail']) as string;
    if (await isValidInstructorForCourse(instructorEmail, course)) {
      if (req.body.emails.includes(instructorEmail)) {
        const instructors = await Promise.all(req.body.emails.map(async (email: string) => {
          return findOrCreateUser(email);
        }));
        await course.setInstructors(instructors);
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ success: false, error: "Not permitted to remove oneself from the course" });
      }
    } else {
      res.status(403).json({ success: false, error: "Unauthorized for course modification" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error setting assistants for the course', error: error.message });
  }
};

export const getCourseInstructors = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findByPk(Number(req.query.id as string));
    if (await isValidInstructorForCourse((req.headers['x-shib_mail']) as string, course)) {
      const instructors = await course.getInstructors();
      const instructorEmails = instructors.map((instructor) => instructor.email);
      res.status(200).json({ instructors: instructorEmails });
    } else {
      res.status(403).json({ success: false, error: "Unauthorized to view course instructors" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving course instructors', error: error.message });
  }
};

export const setAssistantsByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findByPk(Number(req.query.id as string));
    if (await isValidInstructorForCourse((req.headers['x-shib_mail']) as string, course)) {
      const assistants = await Promise.all(req.body.emails.map(async (email: string) => {
        return findOrCreateUser(email);
      }));
      await course.setAssistants(assistants);
      res.status(200).json({ success: true });
    } else {
      res.status(403).json({ success: false, error: "Unauthorized for course modification" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error setting assistants for the course', error: error.message });
  }
};

export const getCourseAssistants = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findByPk(Number(req.query.id as string));
    if (await isValidInstructorForCourse((req.headers['x-shib_mail']) as string, course)) {
      const assistants = await course.getAssistants();
      const assistantEmails = assistants.map((assistant) => assistant.email);
      res.status(200).json({ assistants: assistantEmails });
    } else {
      res.status(403).json({ success: false, error: "Unauthorized to view course assistants" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving course teaching assistants', error: error.message });
  }
};

export const setStudentsByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findByPk(Number(req.query.id as string));
    if (await isValidInstructorForCourse((req.headers['x-shib_mail']) as string, course)) {
      const students = await Promise.all(req.body.emails.map(async (email: string) => {
        return findOrCreateUser(email);
      }));
      await course.setStudents(students);
      res.status(200).json({ success: true });
    } else {
      res.status(403).json({ success: false, error: "Unauthorized for course modification" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error setting assistants for the course', error: error.message });
  }
};

export const getCourseStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findByPk(Number(req.query.id as string));
    if (await isValidInstructorForCourse((req.headers['x-shib_mail']) as string, course)) {
      const students = await course.getStudents();
      const studentEmails = students.map((student) => student.email);
      res.status(200).json({ students: studentEmails });
    } else {
      res.status(403).json({ success: false, error: "Unauthorized to view course roster" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving student roster', error: error.message });
  }
};

export const joinCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await retrieveUser(req.headers['x-shib_mail'] as string);
    const course = await Course.findByPk(Number(req.query.id as string));
    course.addStudent(user);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error adding the course', error: error.message });
  }
};