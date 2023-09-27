import express, { Application, Request, Response, Router } from 'express';
import { createCourse, getCourse, deleteCourse, getAllCourses } from '../controllers/course.controller';
import cors from "cors";

const courseRouter: Router = express.Router();

courseRouter.post('/create', cors(), createCourse );

courseRouter.get('/', cors(), getCourse );

courseRouter.get('/all', cors(), getAllCourses );

courseRouter.delete('/', cors(), deleteCourse );

export default courseRouter;

