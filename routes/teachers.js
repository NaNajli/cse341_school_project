const router = require("express").Router();
const express = require("express");



const validateTeacher = require("../middleware/validation");

const teachersController = require("../controllers/teachers")

router.get("/", teachersController.getAllteachers);

router.get("/:id", teachersController.getSingleTeacher);

router.post("/", validateTeacher, teachersController.createTeacher);



module.exports = router;