const Teacher = require("../models/teacher");
const mongoose = require("mongoose");
const Object_Id = mongoose.Types.ObjectId
const { validationResult } = require("express-validator");
const { ObjectId } = require('mongodb');
const mongodb = require("../data/database")

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
    if(!Object_Id.isValid(req.params.id)){
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

const updateTeacher = async (req, res, next) => {
    //#swagger-tags['Teachers']
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id, name, subject, email, phone, yearsOfExperience, address, isFullTime } = req.body;
    const teacherId = req.params.id;

    try {
        const updatedTeacher = await Teacher.findOneAndUpdate(
            { _id: teacherId },
            {
                id,
                name,
                subject,
                email,
                phone,
                yearsOfExperience,
                address,
                isFullTime
            },
            { new: true, runValidators: true }
        );

        if (!updatedTeacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        res.status(200).json(updatedTeacher);
    } catch (error) {
        res.status(500).json({ 
            error: 'Something went wrong with updating this teacher', 
            details: error.message 
        });
    }
};

const deleteTeacher = async (req, res, next) => {
    //#swagger-tags['Teachers']
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const teacherId = req.params.id;

    try {
        const result = await Teacher.findOneAndDelete({ _id: teacherId });

        if (!result) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ 
            error: 'Something went wrong with deleting this teacher', 
            details: error.message 
        });
    }
};

module.exports = {
    getAllteachers,
    getSingleTeacher,
    createTeacher,
    updateTeacher,
    deleteTeacher
}