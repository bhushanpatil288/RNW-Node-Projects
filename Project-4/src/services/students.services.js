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

const goToStudentsListService = async (res) => {
    const allStudents = await getAllStudentsService();
    data = {
        title: "Students List",
        students: allStudents
    }
    res.render("studentsListPage", data);
}

const deleteStudentService = async (id) => {
    await Students.findByIdAndDelete(id);
}

module.exports = {
    addStudentService,
    getAllStudentsService,
    goToStudentsListService,
    deleteStudentService
};