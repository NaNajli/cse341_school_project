const mongoose = require("mongoose");


const studentSchema = new mongoose.Schema({

    id: {type: String, required:true},

    name: {type: String, required: true},

    classe: {type: String, required: true},

    email:{type: String, required:true},

    age: {type: Number, required: true},

    enrollmentDate: {type: String, required: true},

    hasScholarship: {type: Boolean, required: true}
})


const Student = mongoose.model("Students", studentSchema, "Students");

module. exports = Student;