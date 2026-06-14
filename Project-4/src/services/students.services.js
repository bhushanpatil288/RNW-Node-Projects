const Students = require("../models/students.model");

const addStudentService = async (req) => {
    return await Students.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        profilePicture: req.file ? req.file.filename : null
    });
}

const getAllStudentsService = async (req) => {
    return await Students.find();
}

module.exports = { 
    addStudentService,
    getAllStudentsService
};