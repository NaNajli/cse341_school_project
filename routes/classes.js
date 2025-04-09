const routes = require("express").Router();

const classesContrroller = require("../controllers/classes");

const { body } = require("express-validator");

const {isAuthenticated} = require('../middleware/authenticate')

const validateClasses = [
    body("year").isInt({min:0}).withMessage("Year must be an integer number"),
]


routes.get("/", classesContrroller.getAllClasses);

routes.get("/:id", classesContrroller.getSingleClass);

routes.post("/", isAuthenticated, validateClasses, classesContrroller.createClass);
routes.put("/:id",isAuthenticated , validateClasses, classesContrroller.updateClass);
routes.delete("/:id", isAuthenticated, classesContrroller.deleteClass);

module.exports = routes;