import { Request, Response } from 'express';
import {
  createCourse,
  getCourse,
  getAllMyCourses,
  deleteCourse,
} from '../controllers/course.controller';
import Course from '../models/course.model';
import User from '../models/user.model';
import { retrieveUser } from '../services/user.service';

jest.mock('../models/course.model', () => ({
  create: jest.fn(() => Course),
  findByPk: jest.fn(),
  findAll: jest.fn(),
  destroy: jest.fn(),
  belongsToMany: jest.fn(),
  addInstructor: jest.fn(),
  associations: {instructors: null, assistants: null, students: null}
}));

jest.mock('../models/user.model', () => ({
  create: jest.fn(),
  findByPk: jest.fn(),
  findAll: jest.fn(),
  destroy: jest.fn(),
  belongsToMany: jest.fn(),
  getInstructorCourses: jest.fn(), 
  getAssistantCourses: jest.fn(), 
  getStudentCourses: jest.fn(),
  addInstructorCourse: jest.fn()
}));

jest.mock('../services/user.service', () => ({
  findOrCreateUser: jest.fn(),
  retrieveUser: jest.fn(() => User)
}));

jest.mock('../services/course.service', () => ({
  isValidUserForCourse: jest.fn(() => true)
}));

describe('Course Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };
  });

  describe('createCourse', () => {
    it('should create a course', async () => {
      // Mock the request and response objects
      mockRequest.body = { courseName: 'CSC492', courseDescription: 'Senior Design' };

      // Mock the Course.create function
      const mockCreatedCourse = Course;
      (Course.create as jest.Mock).mockImplementation(() => Promise.resolve(mockCreatedCourse));
      mockRequest.headers = {'x-shib_mail': "john@mail.com"};

      await createCourse(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201); //https status code 201 = 'Created'
      expect(mockResponse.json).toHaveBeenCalledWith(mockCreatedCourse);
    });

  });  

  describe('failToCreateCourse', () => {
    it('should not create a course', async () => {
      // Mock the request and response objects
      mockRequest.body = { courseName: 'CSC492', courseDescription: 'Senior Design' };

      // Mock the Course.create function
      const mockCreatedCourse = Course;
      (Course.create as jest.Mock).mockImplementation(() => Promise.reject(mockCreatedCourse));
      mockRequest.headers = {'x-shib_mail': "john@mail.com"};

      await createCourse(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({message: 'Error creating the course'});
    });

  });  

  describe('getCourse', () => {
    it('should get a course by ID', async () => {
      const courseId = 1;
      const mockCourse = { id: courseId, name: 'CSC246', description: 'Operating System' };
      (Course.findByPk as jest.Mock).mockResolvedValueOnce(mockCourse);

      mockRequest.query = { id: courseId.toString() };
      mockRequest.headers = {'x-shib_mail': "john@mail.com"};

      await getCourse(mockRequest as Request, mockResponse as Response);

      expect(Course.findByPk).toHaveBeenCalledWith(courseId, {include: [Course.associations.instructors, 
        Course.associations.assistants, Course.associations.students]});
      expect(mockResponse.send).toHaveBeenCalledWith(mockCourse);
    });
  });

  describe('deleteCourse', () => {
    it('should delete a course', async () => {
      const courseId = 1;
  
      // Mock a successful course deletion
      (Course.destroy as jest.Mock).mockResolvedValueOnce(1); // Assuming 1 row was affected (course deleted)
  
      mockRequest.query = { id: courseId.toString() };
  
      await deleteCourse(mockRequest as Request, mockResponse as Response);
  
      expect(mockResponse.status).toHaveBeenCalledWith(200); // Check for a success status
      expect(mockResponse.send).toHaveBeenCalledWith(true); // Check for the correct response
    });
  });

  describe('getAllMyCourses', () => {
    it('should get all courses', async () => {
      const newUser: any = User; //assigning the object to a constant of type any. This recognizes the getCourse methods
      (retrieveUser as jest.Mock).mockImplementation(() => Promise.resolve(newUser));
      const mockCourses = [
        { id: 1, name: 'CSC226', description: 'Discrete Mathematics' },
        { id: 2, name: 'CSC316', description: 'Data Structures and Algorithms' },
      ];
      (newUser.getInstructorCourses as jest.Mock).mockImplementation(() => Promise.resolve(mockCourses));
      (newUser.getAssistantCourses as jest.Mock).mockImplementation(() => Promise.resolve([]));
      (newUser.getStudentCourses as jest.Mock).mockImplementation(() => Promise.resolve([]));
      mockRequest.headers = {'x-shib_mail': "john@mail.com"};
  
      // Mock a successful retrieval of all courses
      // (Course.findAll as jest.Mock).mockResolvedValueOnce(mockCourses);
  
      await getAllMyCourses(mockRequest as Request, mockResponse as Response);
  
      expect(mockResponse.status).toHaveBeenCalledWith(200); // Checking for a success status
      expect(mockResponse.send).toHaveBeenCalledWith({instructorCourses: mockCourses, 
        assistantCourses: [], studentCourses: []}); // Checking for the correct response
    });
  });


  // Add test cases for getAllCourses
});
