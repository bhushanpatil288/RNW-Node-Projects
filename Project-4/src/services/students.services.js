const Students = require("../models/students.model");

const addStudentService = async () => {
    return await Students.create({
        name: req.body.name,
        email: req.body.email,
        phoen: req.body.phone,
        profilePicture: req.file ? req.file.path : null
    });
}

module.exports = { 
    addStudentService
};