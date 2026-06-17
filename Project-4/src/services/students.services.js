const Students = require("../models/students.model");
const fs = require("fs/promises");
const path = require("path");

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
    const studentData = await Students.findById(id);
    await fs.unlink(
        path.join(__dirname, "../uploads", studentData.profilePicture)
    )

    await Students.findByIdAndDelete(id);
}

const editPageService = async (id) => {
    const studentData = await Students.findById(id);
    const data = {
        id: studentData._id,
        title: "Edit student data",
        name: studentData.name,
        email: studentData.email,
        phone: studentData.phone,
        profilePicture: studentData.profilePicture
    }
    return data;
}

const updateStudentDataService = async (req, id) => {
    let updatedData = {
        ...req.body
    }
    if (req.file) {
        const student = await Students.findById(id);
        const oldProfilePicture = student.profilePicture;
        console.log(oldProfilePicture);

        await fs.unlink(
            path.join(__dirname, "../uploads", oldProfilePicture)
        )
        updatedData = {
            ...updatedData,
            profilePicture: req.file.filename 
        }
        await Students.findByIdAndUpdate(id, updatedData);
    } else {
        await Students.findByIdAndUpdate(id, updatedData);
    }
}

module.exports = {
    addStudentService,
    getAllStudentsService,
    goToStudentsListService,
    deleteStudentService,
    editPageService,
    updateStudentDataService
};