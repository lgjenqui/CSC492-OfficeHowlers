import express, { Application, Request, Response, Router } from 'express';
import { createCourse } from '../controllers/course.controller';

const courseRouter: Router = express.Router();

// Create a course
courseRouter.get('/', createCourse);

// const setupRoutes = (app: Application): void => {
//   app.use('/api/course', courseRouter);
// };

export default courseRouter;

