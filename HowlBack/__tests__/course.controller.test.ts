import { Request, Response } from 'express';
import {
  createCourse,
  getCourse,
  getAllCourses,
  deleteCourse,
} from '../controllers/course.controller';
import Course from '../models/course.model';

jest.mock('../models/course.model', () => ({
  create: jest.fn(),
  findByPk: jest.fn(),
  findAll: jest.fn(),
  destroy: jest.fn(),
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
      const mockCreatedCourse = { name: 'CSC492', description: 'Senior Design' };
      (Course.create as jest.Mock).mockImplementation(() => Promise.resolve(mockCreatedCourse));

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
      const mockCreatedCourse = { name: '', description: 'Senior Design' };
      (Course.create as jest.Mock).mockImplementation(() => Promise.reject(mockCreatedCourse));

      await createCourse(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({message: 'Error creating the course'});
    });

  });  

  describe('getCourse', () => {
    it('should get a course by ID', async () => {
      const courseId = 'xyzuuid';
      const mockCourse = { id: courseId, name: 'CSC246', description: 'Operating System' };
      (Course.findByPk as jest.Mock).mockResolvedValueOnce(mockCourse);

      mockRequest.query = { id: courseId };

      await getCourse(mockRequest as Request, mockResponse as Response);

      expect(Course.findByPk).toHaveBeenCalledWith(courseId);
      expect(mockResponse.send).toHaveBeenCalledWith(mockCourse);
    });
  });

  describe('deleteCourse', () => {
    it('should delete a course', async () => {
      const courseId = 'xyzuuid';
  
      // Mock a successful course deletion
      (Course.destroy as jest.Mock).mockResolvedValueOnce(1); // Assuming 1 row was affected (course deleted)
  
      mockRequest.query = { id: courseId };
  
      await deleteCourse(mockRequest as Request, mockResponse as Response);
  
      expect(mockResponse.status).toHaveBeenCalledWith(200); // Check for a success status
      expect(mockResponse.send).toHaveBeenCalledWith(true); // Check for the correct response
    });
  });

  describe('getAllCourses', () => {
    it('should get all courses', async () => {
      const mockCourses = [
        { id: 'xyzuuid', name: 'CSC226', description: 'Discrete Mathematics' },
        { id: 'abcuuid', name: 'CSC316', description: 'Data Structures and Algorithms' },
      ];
  
      // Mock a successful retrieval of all courses
      (Course.findAll as jest.Mock).mockResolvedValueOnce(mockCourses);
  
      await getAllCourses(mockRequest as Request, mockResponse as Response);
  
      expect(mockResponse.status).toHaveBeenCalledWith(200); // Checking for a success status
      expect(mockResponse.send).toHaveBeenCalledWith(mockCourses); // Checking for the correct response
    });
  });


  // Add test cases for getAllCourses
});
