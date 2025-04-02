const router = require("express").Router();
const express = require("express");
const { body, param, validationResult } = require('express-validator');


/* #swagger.tags = ['Teachers'] */
const validateTeacher = require("../middleware/validation");

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