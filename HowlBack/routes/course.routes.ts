import express, { Application, Request, Response, Router } from 'express';
import { createCourse, getCourse, deleteCourse, getAllMyCourses } from '../controllers/course.controller';
import cors from "cors";

const courseRouter: Router = express.Router();

courseRouter.post('/create', cors(), createCourse );

courseRouter.get('/', cors(), getCourse );

courseRouter.get('/all', cors(), getAllMyCourses );

courseRouter.delete('/', cors(), deleteCourse );

export default courseRouter;

