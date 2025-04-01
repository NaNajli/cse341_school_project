const router = require("express").Router();
const express = require("express");


/* #swagger.tags = ['Teachers'] */
const validateTeacher = require("../middleware/validation");

const teachersController = require("../controllers/teachers");

// #swagger.summary = 'Get all teachers'
router.get("/", teachersController.getAllteachers);

// #swagger.summary = 'Get teacher details'
router.get("/:id", teachersController.getSingleTeacher);

// #swagger.summary = 'Add a new teacher'
router.post("/", validateTeacher, teachersController.createTeacher);



module.exports = router;