import { Request, Response } from 'express';
import Course, { generateUniqueJoinCode }  from '../models/course.model';
import { retrieveUser, findOrCreateUser } from '../services/user.service';
import { isValidInstructorForCourse, isValidInstructorOrAssistantForCourse, isValidUserForCourse } from '../services/course.service';
import { COURSE_JOIN_CODE_LENGTH } from '../src/constants';

export const createCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    // Create a course in the database
    const createdCourse = await Course.create(req.body);
    const instructorUser = await retrieveUser(req.headers['x-shib_mail'] as string);
    await instructorUser.addInstructorCourse(createdCourse);
    await createdCourse.addInstructor(instructorUser);

    // Send the created course as a response
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(500).json({ message: 'Error creating the course', error: error.message });
  }
};

export const getCourse = async (req: Request, res: Response): Promise<void> => {
  const course = await Course.findByPk(req.query.id as string,
    {include: [Course.associations.instructors, Course.associations.assistants, Course.associations.students]});
  if (await isValidUserForCourse((req.headers['x-shib_mail']) as string, course)) {
    res.send(course);
  } else {
    res.status(403).json({ success: false, error: "Unauthorized for course retrieval" });
  }
};

export const getAllMyCourses = async (req: Request, res: Response): Promise<void> => {
  // const courses = await Course.findAll({include: [Course.associations.instructors, Course.associations.assistants, Course.associations.students]});
  const user = await retrieveUser((req.headers['x-shib_mail']) as string);
  const instructorCourses = await user.getInstructorCourses();
  const assistantCourses = await user.getAssistantCourses();
  const studentCourses = await user.getStudentCourses();
  const courses = { instructorCourses: instructorCourses, 
    assistantCourses: assistantCourses, 
    studentCourses: studentCourses
  };
  res.status(200).send(courses);
};


// ====== For testing only ===> To be deleted later
export const deleteCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    Course.destroy({ where: { id: req.query.id as string } });
    res.status(200).send(true);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the course', error: error.message });
  }
};

export const addInstructorsByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findByPk(req.query.id as string);
    const instructorEmail = (req.headers['x-shib_mail']) as string;
    if (await isValidInstructorForCourse(instructorEmail, course)) {
      const instructors = await Promise.all(req.body.emails.map(async (email: string) => {
        return findOrCreateUser(email, "Unset firstname", "Unset lastname", "instructor");
      }));
      await course.addInstructors(instructors);
      res.status(200).json({success:true});
    } 
    else {
      res.status(403).json({ success: false, error: "Unauthorized for course modification" });
    }
    
  } catch (error) {
    res.status(500).json({ message: 'Error adding instructor for the course', error: error.message });
  }
};

export const getCourseInstructors = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findByPk(req.query.id as string);
    if (await isValidInstructorForCourse((req.headers['x-shib_mail']) as string, course)) {
      const instructors = await course.getInstructors();
      res.status(200).json({ instructors: instructors });
    } else {
      res.status(403).json({ success: false, error: "Unauthorized to view course instructors" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving course instructors', error: error.message });
  }
};

export const addAssistantsByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findByPk(req.query.id as string);
    if (await isValidInstructorForCourse((req.headers['x-shib_mail']) as string, course)) {
      const assistants = await Promise.all(req.body.emails.map(async (email: string) => {
        return findOrCreateUser(email, "Unset firstname", "Unset lastname", "assistant");
      }));
      await course.addAssistants(assistants);
      res.status(200).json({ success: true });
    } else {
      res.status(403).json({ success: false, error: "Unauthorized for course modification" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding assistants for the course', error: error.message });
  }
};

export const getCourseAssistants = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findByPk(req.query.id as string);
    if (await isValidInstructorForCourse((req.headers['x-shib_mail']) as string, course)) {
      const assistants = await course.getAssistants();
      res.status(200).json({ assistants: assistants });
    } else {
      res.status(403).json({ success: false, error: "Unauthorized to view course assistants" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving course teaching assistants', error: error.message });
  }
};

export const addStudentsByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findByPk(req.query.id as string);
    if (await isValidInstructorForCourse((req.headers['x-shib_mail']) as string, course)) {
      const students = await Promise.all(req.body.emails.map(async (email: string) => {
        return findOrCreateUser(email, "Unset firstname", "Unset lastname", "student");
      }));
      await course.addStudents(students);
      res.status(200).json({ success: true });
    } else {
      res.status(403).json({ success: false, error: "Unauthorized for course modification" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error setting assistants for the course', error: error.message });
  }
};

export const removeStudentsByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findByPk(req.query.id as string);
    if (await isValidInstructorForCourse((req.headers['x-shib_mail']) as string, course)) {
      const student = await Promise.all(req.body.email.map(async (email: string) => {
        return retrieveUser(email);
      }));
      await course.removeStudent(student);
      res.status(200).json({ success: true });
    } else {
      res.status(403).json({ success: false, error: "Unauthorized for course modification" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing students for the course', error: error.message });
  }
};

export const removeInstructorsByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findByPk(req.query.id as string);
    if (await isValidInstructorForCourse((req.headers['x-shib_mail']) as string, course) && (req.headers['x-shib_mail']) as string != req.body.email[0]) {
      const instructor = await Promise.all(req.body.email.map(async (email: string) => {
        return retrieveUser(email);
      }));
      await course.removeInstructor(instructor);
      res.status(200).json({ success: true });
    } else {
      res.status(403).json({ success: false, error: "Unauthorized for course modification" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing students for the course', error: error.message });
  }
};

export const removeTeachingAssistantsByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findByPk(req.query.id as string);
    if (await isValidInstructorForCourse((req.headers['x-shib_mail']) as string, course)) {
      const assistant = await Promise.all(req.body.email.map(async (email: string) => {
        return retrieveUser(email);
      }));
      await course.removeAssistant(assistant);
      res.status(200).json({ success: true });
    } else {
      res.status(403).json({ success: false, error: "Unauthorized for course modification" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing students for the course', error: error.message });
  }
};

export const getCourseStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findByPk(req.query.id as string);
    if (await isValidInstructorForCourse((req.headers['x-shib_mail']) as string, course)) {
      const students = await course.getStudents();
      res.status(200).json({ students: students });
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
    const course = await Course.findByPk(req.query.id as string);
    course.addStudent(user);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error adding the course', error: error.message });
  }
};

export const joinCourseByCourseCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const userEmail = req.headers['x-shib_mail'] as string;
    const courseCode = req.query.courseCode as string

    // Check that the course code consists of uppercase letters, numbers, and is of the appropriate length
    const courseCodeRegex = new RegExp(`^[A-Z0-9]{${COURSE_JOIN_CODE_LENGTH}}$`);
    if (!courseCodeRegex.test(courseCode)) {
      res.status(400).json({ message: 'Invalid course code'});
      return;
    }

    const user = await retrieveUser(userEmail);
    const course = await Course.findOne({ where: { studentJoinCode: courseCode } });

    if (!course) {
      res.status(404).json({ message: 'Could not find a course with that course code'});
      return;
    }

    await course.addStudent(user);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error joining the course', error: error.message });
  }
};

export const regenerateJoinCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findByPk(req.query.id as string);
    if (course && await isValidInstructorForCourse((req.headers['x-shib_mail']) as string, course)) {
      const newCourseCode = await generateUniqueJoinCode();
      course.studentJoinCode = newCourseCode;
      await course.save();
      res.status(200).json({ success: true, studentJoinCode: newCourseCode });
    } else {
      res.status(403).json({ success: false, error: "Unauthorized for course modification" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error regenerating the course join code', error: error.message });
  }
};

export const getCourseSessions = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findByPk(req.query.id as string);
    if (await isValidUserForCourse((req.headers['x-shib_mail']) as string, course)) {
      const sessions = await course.getSessions();
      res.status(200).json({ sessions: sessions });
    } else {
      res.status(403).json({ success: false, error: "Unauthorized to view course sessions" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving course sessions', error: error.message });
  }
};

export const getCourseExpiredSessions = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findByPk(req.query.id as string);
    if (await isValidUserForCourse((req.headers['x-shib_mail']) as string, course)) {
      const expiredSessions = await course.getExpiredSessions();
      res.status(200).json({ expiredSessions: expiredSessions });
    } else {
      res.status(403).json({ success: false, error: "Unauthorized to view course sessions" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving course sessions', error: error.message });
  }
};

export const getCourseQueue = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findByPk(req.query.id as string);
    if (await isValidInstructorOrAssistantForCourse((req.headers['x-shib_mail']) as string, course)) {
      const tickets = await course.getTickets();
      res.status(200).json({ tickets: tickets });
    } else {
      res.status(403).json({ success: false, error: "Unauthorized to view course queue" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving course queue', error: error.message });
  }
};

export const getActiveFacultyMembers = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findByPk(req.query.id as string);
    if (course && await isValidUserForCourse(req.headers['x-shib_mail'] as string, course)) {
      const sessions = await course.getSessions();
      const activeFacultyPromises = sessions.map(async (session) => {
        const user = await session.getUser();
        return user ? user.firstName + " " + user.lastName : "";
      });

      const activeFaculty: string[] = await Promise.all(activeFacultyPromises);
      res.status(200).json({ activeFaculty: activeFaculty });
    } else {
      res.status(403).json({ success: false, error: "Unauthorized to view course sessions" });
    }
  } catch (error) {
    console.error('Error retrieving course sessions:', error);
    res.status(500).json({ message: 'Error retrieving course sessions', error: error.message });
  }
};
