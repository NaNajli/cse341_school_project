const routes = require("express").Router();


const studentsController = require("../controllers/students");
const validateStudent = require("../middleware/validation");


routes.get("/", studentsController.getAllStudents);

routes.get("/:id", studentsController.getSingleStudent);

routes.post("/", validateStudent, studentsController.createStudent);


module.exports = routes