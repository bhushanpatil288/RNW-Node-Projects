const Students = require("../models/studentsModel");
const fs = require("fs/promises");
const path = require("path");
const User = require("../models/userModel")

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

const goToStudentsListService = async (req, res) => {
    const allStudents = await getAllStudentsService();
    const { id } = req.cookies;

    if (!id) {
        console.log("No cookies");
        return res.redirect("/auth/signin");
    }

    const user = await User.findById(id);

    if (!user) {
        return res.redirect("/auth/signin");
    }

    const data = {
        title: "Students List",
        username: user.username,
        email: user.email,
        students: allStudents
    };

    res.render("students/studentsListPage", data);
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

    const { id } = req.cookies;

    if (!id) {
        console.log("No cookies");
        return res.redirect("/auth/signin");
    }

    const user = await User.findById(id);

    if (!user) {
        return res.redirect("/auth/signin");
    }

    const data = {
        title: "Edit student data",
        username: user.username,
        id: studentData._id,
        name: studentData.name,
        email: studentData.email,
        phone: studentData.phone,
        profilePicture: studentData.profilePicture
    };
    

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