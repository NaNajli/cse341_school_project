const mongoose = require("mongoose");


const classesSchema = new mongoose.Schema({

    id: {type: String, required: true},

    name: {type: String, required: true},

    teacher: {type: String, required: true},

    students: {type: [String], required: true},

    room: {type: String, required: true},

    subject: {type: String, required: true},

    year: {type: Number, required: true}
});


const Class = mongoose.model("Classes", classesSchema, "Classes");

module.exports = Class;