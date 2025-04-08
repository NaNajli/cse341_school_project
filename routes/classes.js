const routes = require("express").Router();

const classesContrroller = require("../controllers/classes");

const { body } = require("express-validator");

const validateClasses = [
    body("year").isInt({min:0}).withMessage("Year must be an integer number"),
]


routes.get("/", classesContrroller.getAllClasses);

routes.get("/:id", classesContrroller.getSingleClass);

routes.post("/",validateClasses, classesContrroller.createClass);
routes.put("/:id",validateClasses, classesContrroller.updateClass);
routes.delete("/:id", classesContrroller.deleteClass);

module.exports = routes;