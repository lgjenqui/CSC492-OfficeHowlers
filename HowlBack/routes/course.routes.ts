import express, { Application, Request, Response, Router } from 'express';
import { createCourse } from '../controllers/course.controller';

const courseRouter: Router = express.Router();

// Create a course
courseRouter.get('/', createCourse);

export default courseRouter;

