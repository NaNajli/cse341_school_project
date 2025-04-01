const routes = require("express").Router();


const studentsController = require("../controllers/students");
const validateStudent = require("../middleware/validation");

/* #swagger.tags = ['Students'] */

// #swagger.summary = 'Get all students'
routes.get("/", studentsController.getAllStudents);

// #swagger.summary = 'Get student details'
routes.get("/:id", studentsController.getSingleStudent);

// #swagger.summary = 'Add a new student'
routes.post("/", validateStudent, studentsController.createStudent);


module.exports = routes