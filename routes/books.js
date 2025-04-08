const routes = require("express").Router();

const booksController = require("../controllers/books");

const {body} = require("express-validator");

const validateBooks = [
    body("publishedYear").isInt({min:0}).withMessage("Published year must be an integer number"),
    body("availableCopies").isInt({min:0}).withMessage("Available copies must be an integer number"),
    body("totalCopies").isInt({min:0}).withMessage("Total copies must be an integer number"),
    body("isDigitalAvailable").isBoolean().withMessage("isDigitalAvailable must be a boolean"),
]

routes.get("/", booksController.getAllBooks);

routes.get("/:id", booksController.getSingleBook);

routes.post("/", validateBooks, booksController.createBook);
routes.put("/:id", validateBooks, booksController.updateBook);
routes.delete("/:id", booksController.deleteBook);
module.exports = routes;