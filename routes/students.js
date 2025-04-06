const routes = require("express").Router();


const studentsController = require("../controllers/students");
const { body, param, validationResult } = require('express-validator');


//validate student
const validateStudent = [
    body("email").isEmail().withMessage("Invalid email format"),
    body("age").isInt({min:0}).withMessage("Age must be an integer"),
    body("hasScholarship").isBoolean().withMessage("hasScholarship must be a boolean"),
]

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