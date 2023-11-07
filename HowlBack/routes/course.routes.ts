import express, { Application, Request, Response, Router } from 'express';
import { createCourse, getCourse, deleteCourse, getAllMyCourses, 
    joinCourse, getCourseInstructors, getCourseAssistants,
    getCourseStudents, addStudentsByEmail, addAssistantsByEmail,
    addInstructorsByEmail,
    getCourseQueue,
    getCourseSessions,
    removeStudentsByEmail,
    removeTeachingAssistantsByEmail,
    removeInstructorsByEmail} from '../controllers/course.controller';
import cors from "cors";

const courseRouter: Router = express.Router();

courseRouter.post('/create', cors(), createCourse );

courseRouter.get('/', cors(), getCourse );

courseRouter.get('/all', cors(), getAllMyCourses );

courseRouter.post('/manage/instructors/add', addInstructorsByEmail);

courseRouter.get('/manage/instructors/get', getCourseInstructors);

courseRouter.post('/manage/assistants/add', addAssistantsByEmail);

courseRouter.get('/manage/assistants/get', getCourseAssistants);

courseRouter.post('/manage/roster/add', addStudentsByEmail);

courseRouter.get('/manage/roster/get', getCourseStudents);

courseRouter.delete('/manage/roster/remove', removeStudentsByEmail);

courseRouter.delete('/manage/assistants/remove', removeTeachingAssistantsByEmail);

courseRouter.delete('/manage/instructors/remove', removeInstructorsByEmail)

courseRouter.delete('/', cors(), deleteCourse );

courseRouter.get('/manage/roster/join', cors(), joinCourse );

courseRouter.get('/queue', cors(), getCourseQueue );

courseRouter.get('/sessions', cors(), getCourseSessions );

export default courseRouter;

