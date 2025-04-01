const mongoose = require("mongoose");
const Student = require("../models/student");
const { findById } = require("../models/teacher");
const ObjectId = mongoose.Types.ObjectId;
const { validationResult} = require("express-validator");


const getAllStudents = async (req, res, next) =>{

    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({error: "Something went wrong with getting the students"})
    }
}


const getSingleStudent = async (req, res, next) =>{

    if(!ObjectId.isValid(req.params.id)){

        res.status(400).json({error: "must use a valid id to get a student"});
    }

    try {
        const studentId = req.params.id;

        const student = await Student.findById(studentId);

        res.status(200).json(student);
    } catch (error) {
       res.status(500).json({error: "Something went wrong with getting this student", error}) 
    }
}


const createStudent = async (req, res, next) =>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }


    const { id, name, classe, email, age, enrollmentDate, hasScholarship} = req.body;

try{
    const newStudent = new Student({
        id,
        name,
        classe,
        email,
        age,
        enrollmentDate,
        hasScholarship
    })

    await newStudent.save();

    res.status(200).json(newStudent);
} catch(error){
    res.status(500).json({error: "Something went wrong with creating this student", error})
}

}
module.exports = {
    getAllStudents,
    getSingleStudent,
    createStudent
}