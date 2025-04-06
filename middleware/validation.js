const {body} = require("express-validator");

const validateTeacher = [

    body("email").isEmail().withMessage("Invalid email format"),
    body("yearsOfExperience").isInt({min: 0}).withMessage("Must be a valid number, integer greater than 0"),

];

const validateStudent = [
    body("email").isEmail().withMessage("Invalid email format"),
    body("age").isInt({min:0}).withMessage("Age must be an integer"),
    body("hasScholarship").isBoolean().withMessage("hasScholarship must be a boolean"),
]

module.exports = [
    validateTeacher,
    validateStudent
]