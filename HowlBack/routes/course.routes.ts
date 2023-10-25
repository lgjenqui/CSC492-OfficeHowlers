import express, { Application, Request, Response, Router } from 'express';
import { createCourse, getCourse, deleteCourse, getAllMyCourses, 
    addAssistantsByEmail, addInstructorsByEmail, addStudentsByEmail,
    joinCourse, getCourseInstructors, getCourseAssistants,
    getCourseStudents } from '../controllers/course.controller';
import cors from "cors";

const courseRouter: Router = express.Router();

courseRouter.post('/create', cors(), createCourse );

courseRouter.get('/', cors(), getCourse );

courseRouter.get('/all', cors(), getAllMyCourses );

courseRouter.post('/manage/instructors/set', addInstructorsByEmail);

courseRouter.get('/manage/instructors/get', getCourseInstructors);

courseRouter.post('/manage/assistants/set', addAssistantsByEmail);

courseRouter.get('/manage/assistants/get', getCourseAssistants);

courseRouter.post('/manage/roster/set', addStudentsByEmail);

courseRouter.get('/manage/roster/get', getCourseStudents);

courseRouter.delete('/', cors(), deleteCourse );

courseRouter.get('/manage/roster/join', cors(), joinCourse );

export default courseRouter;

