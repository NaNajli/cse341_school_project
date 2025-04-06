const mongoose = require("mongoose");
const Book = require("../models/books");
const ObjectId = mongoose.Types.ObjectId;
const {validationResult} = require("express-validator");

const getAllBooks = async (req, res) =>{

    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({error: "Something went wrong with getting the books", error});

    }
}

const getSingleBook = async (req, res) =>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).json({error: "must use a valid id to get a book"})
    }

    try {
        const bookId = req.params.id;

        const book = await Book.findById(bookId);

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({error: "Something went wrong with getting this book", error});
    }
}

const createBook = async (req, res) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }


    const { id, title, author, publishedYear, availableCopies, category, totalCopies, isDigitalAvailable} = req.body;

    try {
        const newBook = new Book({
            id,
            title,
            author,
            publishedYear,
            availableCopies,
            category,
            totalCopies,
            isDigitalAvailable
        })

        await newBook.save();

        res.status(200).json(newBook);
    } catch (error) {
        res.status(500).json({error: "Something went wrong with creating this book", error});

    }
}

module.exports = {
    getAllBooks,
    getSingleBook,
    createBook
}