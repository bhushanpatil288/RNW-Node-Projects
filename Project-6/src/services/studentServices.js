const Students = require("../models/studentsModel");
const fs = require("fs/promises");
const path = require("path");
const User = require("../models/userModel");

const addStudentService = async (req) => {
    return Students.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        profilePicture: req.file ? req.file.filename : null
    });
};

const getAllStudentsService = async () => Students.find();

const goToStudentsListService = async (req, res) => {
    const { id } = req.cookies || {};
    if (!id) return res.redirect("/auth/signin");

    const user = await User.findById(id);
    if (!user) return res.redirect("/auth/signin");

    const students = await getAllStudentsService();
    return res.render("students/studentsListPage", {
        title: "Students List",
        students
    });
};

const deleteStudentService = async (id) => {
    const studentData = await Students.findById(id);
    if (studentData?.profilePicture) {
        await fs.unlink(path.join(__dirname, "../uploads", studentData.profilePicture));
    }
    await Students.findByIdAndDelete(id);
};

const editPageService = async (id) => {
    const studentData = await Students.findById(id);
    if (!studentData) return null;

    return {
        title: "Edit student data",
        id: studentData._id,
        name: studentData.name,
        email: studentData.email,
        phone: studentData.phone,
        profilePicture: studentData.profilePicture
    };
};

const updateStudentDataService = async (req, id) => {
    let updatedData = { ...req.body };

    if (req.file) {
        const student = await Students.findById(id);
        const oldProfilePicture = student?.profilePicture;

        if (oldProfilePicture) {
            await fs.unlink(path.join(__dirname, "../uploads", oldProfilePicture));
        }

        updatedData = { ...updatedData, profilePicture: req.file.filename };
    }

    await Students.findByIdAndUpdate(id, updatedData);
};

module.exports = {
    addStudentService,
    getAllStudentsService,
    goToStudentsListService,
    deleteStudentService,
    editPageService,
    updateStudentDataService
};