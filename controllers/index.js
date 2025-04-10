// controllers/index.js

const { getAllBooks, getSingleBook } = require('./books');
const { getAllClasses, getSingleClass } = require('./classes');
const { getAllStudents, getSingleStudent } = require('./students');
const { getAllteachers, getSingleTeacher } = require('./teachers');

module.exports = {
  getAllBooks,
  getSingleBook,
  getAllClasses,
  getSingleClass,
  getAllStudents,
  getSingleStudent,
  getAllteachers,
  getSingleTeacher,
};
