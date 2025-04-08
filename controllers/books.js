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

const updateBook = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id, title, author, publishedYear, availableCopies, category, totalCopies, isDigitalAvailable } = req.body;
    const bookId = req.params.id;

    try {
        const updatedBook = await Book.findOneAndUpdate(
            { _id: bookId },
            {
                id,
                title,
                author,
                publishedYear,
                availableCopies,
                category,
                totalCopies,
                isDigitalAvailable
            },
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ 
            error: 'Something went wrong with updating this book', 
            details: error.message 
        });
    }
};

const deleteBook = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const bookId = req.params.id;

    try {
        const result = await Book.findOneAndDelete({ _id: bookId });

        if (!result) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ 
            error: 'Something went wrong with deleting this book', 
            details: error.message 
        });
    }
};

module.exports = {
    getAllBooks,
    getSingleBook,
    createBook,
    updateBook,
    deleteBook
}