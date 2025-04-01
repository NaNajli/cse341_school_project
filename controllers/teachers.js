const Teacher = require("../models/teacher");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId
const { validationResult } = require("express-validator");




const getAllteachers = async (req, res, next) =>{
    //#swagger-tags['Teachers']
    try {

        const teachers = await Teacher.find()
        res.status(200).json(teachers);
        
    } catch (error) {
        next(error)
    }
};


const getSingleTeacher = async (req, res, next) =>{
    //#swagger-tags['Teachers']
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).json({error: "Must use a valid id to find a teacher"});

    }

    try {
        const teacherId = req.params.id;

        const teacher = await Teacher.findById(teacherId);

        if(!teacher){
            return res.status(400).json({error: "Teacher not found"})
        }

        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({error: "Something went wrong getting this teacher", error})
    }
}


const createTeacher = async (req, res, next) =>{
    //#swagger-tags['Teachers']
    const errors = validationResult(req);
        
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

        const {id, name, subject, email, phone, yearsOfExperience, address, isFullTime} = req.body;

    try{
        const newTeacher = new Teacher ({
            id,
            name,
            subject,
            email,
            phone,
            yearsOfExperience,
            address,
            isFullTime
        });


    await newTeacher.save();

    res.status(200).json(newTeacher);
}

 catch(error){
    
    res.status(500).json({error: "Something went wrong with creating this teacher", error})
 }


}

module.exports = {
    getAllteachers,
    getSingleTeacher,
    createTeacher
}