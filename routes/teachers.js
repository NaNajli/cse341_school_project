const router = require("express").Router();
const express = require("express");
const { body, param, validationResult } = require('express-validator');

//validate teacher
const validateTeacher = [

  body("email").isEmail().withMessage("Invalid email format"),
  body("yearsOfExperience").isInt({min: 0}).withMessage("Must be a valid number, integer greater than 0"),

];



/* #swagger.tags = ['Teachers'] */


const teachersController = require("../controllers/teachers");

// #swagger.summary = 'Get all teachers'
router.get("/", teachersController.getAllteachers);

// #swagger.summary = 'Get teacher details'
router.get("/:id", teachersController.getSingleTeacher);

// #swagger.summary = 'Add a new teacher'
router.post("/", validateTeacher, teachersController.createTeacher);

// #swagger.summary = 'Update existing teacher'
router.put(
  '/:id',
  [
    param('id')
      .isMongoId()
      .withMessage('ID must be a valid MongoDB ObjectId')
  ],
  async (req, res, next) => {
    try {
      await teachersController.updateTeacher(req, res);
    } catch (error) {
      next(error);
    }
  }
);

// #swagger.summary = 'Delete existing teacher'
router.delete(
  '/:id',
  [
    param('id')
      .isMongoId()
      .withMessage('ID must be a valid MongoDB ObjectId'),
    ],
  async (req, res, next) => {
    try {
      await teachersController.deleteTeacher(req, res);
    } catch (error) {
      next(error);
    }
  }
);



module.exports = router;