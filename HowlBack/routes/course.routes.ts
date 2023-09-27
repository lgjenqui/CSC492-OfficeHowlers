import express, { Application, Request, Response, Router } from 'express';
import { createCourse, getCourse, deleteCourse, getAllCourses } from '../controllers/course.controller';

const courseRouter: Router = express.Router();

courseRouter.post('/create', createCourse );

courseRouter.get('/', getCourse );

courseRouter.get('/all', getAllCourses );

courseRouter.delete('/', deleteCourse );

export default courseRouter;

