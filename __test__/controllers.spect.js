const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
 
// Create a minimal Express app for testing
const app = express();
app.use(express.json());
 
// Import your controllers from your controller file
const {
  getAllBooks,
  getSingleBook,
  getAllClasses,
  getSingleClass,
  getAllStudents,
  getSingleStudent,
  getAllteachers,
  getSingleTeacher,
} = require('../controllers');

 
// Setup routes for each endpoint
app.get('/books', getAllBooks);
app.get('/books/:id', getSingleBook);
app.get('/classes', getAllClasses);
app.get('/classes/:id', getSingleClass);
app.get('/students', getAllStudents);
app.get('/students/:id', getSingleStudent);
app.get('/teachers', getAllteachers);
app.get('/teachers/:id', getSingleTeacher);
 
// Import your Mongoose models which we will mock
const Book = require('../models/books');
const Class = require('../models/classes');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
 
// Create a valid ObjectId string for testing
const validId = new mongoose.Types.ObjectId().toHexString();
 
// Mock your Mongoose model methods so that no real DB calls are made
jest.mock('../models/books');
jest.mock('../models/classes');
jest.mock('../models/student');
jest.mock('../models/teacher');
 
// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});
 
describe('Books Endpoints', () => {
  test('GET /books returns a list of books', async () => {
    const books = [{ title: 'Book 1' }, { title: 'Book 2' }];
    Book.find.mockResolvedValue(books);
 
    const res = await request(app).get('/books');
 
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(books);
  });
 
  test('GET /books/:id returns a single book when given a valid id', async () => {
    const book = { title: 'Book 1' };
    Book.findById.mockResolvedValue(book);
 
    const res = await request(app).get(`/books/${validId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(book);
  });
 
  test('GET /books/:id returns a 400 error for an invalid id', async () => {
    const res = await request(app).get('/books/123');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});
 
describe('Classes Endpoints', () => {
  test('GET /classes returns a list of classes', async () => {
    const classes = [{ name: 'Class A' }, { name: 'Class B' }];
    Class.find.mockResolvedValue(classes);
 
    const res = await request(app).get('/classes');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(classes);
  });
 
  test('GET /classes/:id returns a single class when given a valid id', async () => {
    const classe = { name: 'Class A' };
    Class.findById.mockResolvedValue(classe);
 
    const res = await request(app).get(`/classes/${validId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(classe);
  });
 
  test('GET /classes/:id returns a 400 error for an invalid id', async () => {
    const res = await request(app).get('/classes/123');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});
 
describe('Students Endpoints', () => {
  test('GET /students returns a list of students', async () => {
    const students = [{ name: 'Student 1' }, { name: 'Student 2' }];
    Student.find.mockResolvedValue(students);
 
    const res = await request(app).get('/students');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(students);
  });
 
  test('GET /students/:id returns a single student when given a valid id', async () => {
    const student = { name: 'Student 1' };
    Student.findById.mockResolvedValue(student);
 
    const res = await request(app).get(`/students/${validId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(student);
  });
 
  test('GET /students/:id returns a 400 error for an invalid id', async () => {
    const res = await request(app).get('/students/123');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});
 
describe('Teachers Endpoints', () => {
  test('GET /teachers returns a list of teachers', async () => {
    const teachers = [{ name: 'Teacher 1' }, { name: 'Teacher 2' }];
    Teacher.find.mockResolvedValue(teachers);
 
    const res = await request(app).get('/teachers');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(teachers);
  });
 
  test('GET /teachers/:id returns a single teacher when given a valid id', async () => {
    const teacher = { name: 'Teacher 1' };
    Teacher.findById.mockResolvedValue(teacher);
 
    const res = await request(app).get(`/teachers/${validId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(teacher);
  });
 
  test('GET /teachers/:id returns a 400 error for an invalid id', async () => {
    const res = await request(app).get('/teachers/123');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});

 