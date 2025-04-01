const mongoose = require("mongoose");


const teacherSchema = new mongoose.Schema({
    id: {type: String, required: true},

    name: {type: String, required: true},

    subject: {type: String, required: true},

    email: {type: String, required: true},

    phone: {type: String, required:true},

    yearsOfExperience: {type: Number, required: true},

    address: {type: String, required: true},

    isFullTime: {type: Boolean, required: true}
})



const Teacher = mongoose.model("Teacher", teacherSchema, "Teachers");

module.exports = Teacher;