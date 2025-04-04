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

// #swagger.summary = 'Update existing student'
routes.put("/:id", studentsController.updateStudent);

// #swagger.summary = 'Delete existing student'
routes.delete("/:id", studentsController.deleteStudent);


module.exports = routes