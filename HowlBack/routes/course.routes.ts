import express, { Application, Request, Response, Router } from 'express';
import { createCourse, getCourse, deleteCourse } from '../controllers/course.controller';

const courseRouter: Router = express.Router();

courseRouter.post('/create', createCourse );

courseRouter.get('/', getCourse );

courseRouter.get('/delete', deleteCourse );

export default courseRouter;

