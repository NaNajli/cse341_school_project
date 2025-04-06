const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({

    id: {type: String, required: true},

    title: {type: String, required: true},

    author: {type: String, required: true},

    publishedYear: {type: Number, required: true},

    availableCopies: {type: Number, required: true},

    category: {type: String,  required: true},

    totalCopies: {type: Number, required: true},

    isDigitalAvailable: {type: Boolean, required: true}
});

const Book = mongoose.model("Books", bookSchema, "Books");

module.exports = Book;