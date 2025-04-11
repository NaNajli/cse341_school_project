const mongoose = require("mongoose");
const Class = require("../models/classes");
const ObjectId = mongoose.Types.ObjectId;
const { validationResult } = require("express-validator");


const getAllClasses =  async (req, res) =>{
    try {
        const classes = await Class.find();
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({error: "Something went wrong with getting the classes", error})
    }
}


const getSingleClass = async (req, res) =>{
    
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json({error: "must use a valid id to get a class"})
    }
    
    try {
        const classId = req.params.id;

        const classe = await Class.findById(classId);

        res.status(200).json(classe);

    } catch (error) {
        return res.status(500).json({error: "Something went wrong with getting this class", error});

    }
}


const createClass = async (req, res) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    const { id, name, teacher, students, schedule, room, subject, year} = req.body;

    try {
        const newClass = new Class({
            id,
            name,
            teacher,
            students,
            schedule,
            room,
            subject,
            year
        })


        await newClass.save();

        res.status(200).json(newClass);
    } catch (error) {
        res.status(500).json({error: "Something went wrong with creating this class", error})
    }
}

const updateClass = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id, name, teacher, students, schedule, room, subject, year } = req.body;
    const classId = req.params.id;

    try {
        const updatedClass = await Class.findOneAndUpdate(
            { _id: classId },
            {
                id,
                name,
                teacher,
                students,
                schedule,
                room,
                subject,
                year
            },
            { new: true, runValidators: true }
        );

        if (!updatedClass) {
            return res.status(404).json({ error: 'Class not found' });
        }

        res.status(200).json(updatedClass);
    } catch (error) {
        res.status(500).json({ 
            error: 'Something went wrong with updating this class', 
            details: error.message 
        });
    }
};

const deleteClass = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const classId = req.params.id;

    try {
        const result = await Class.findOneAndDelete({ _id: classId });

        if (!result) {
            return res.status(404).json({ error: 'Class not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ 
            error: 'Something went wrong with deleting this class', 
            details: error.message 
        });
    }
};

module.exports = {
    getAllClasses,
    getSingleClass,
    createClass,
    updateClass,
    deleteClass
}