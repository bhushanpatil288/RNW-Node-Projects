const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/userModel");
const {
    addStudentService,
    goToStudentsListService,
    deleteStudentService,
    editPageService,
    updateStudentDataService
} = require("../services/studentServices");

const studentsPage = asyncHandler(async (req, res) => {
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
        title: "Home Page",
        username: user.username,
        email: user.email
    };

    console.log(data);
    return res.render("students/homePage", data);
});

const addStudentPage = asyncHandler(async (req, res) => {
    data = {
        title: "Add New Student"
    }
    res.render("students/addStudentPage", data)
});

const studentsList = asyncHandler(async (req, res) => {
    await goToStudentsListService(req, res);
});

const addStudent = asyncHandler(async (req, res) => {
    const student = await addStudentService(req);
    // logger.info("user created");

    await goToStudentsListService(res);
});

const deleteStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await deleteStudentService(id);
    res.status(200).json({ success: true });
});

const editStudentPage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = await editPageService(id, req, res);
    
    res.render("students/editStudentPage", data);
});

const updateStudentData = asyncHandler(async (req, res) => {
    await updateStudentDataService(req, req.params.id);
    await goToStudentsListService(res);
});

module.exports = {
    studentsPage,
    addStudentPage,
    studentsList,
    addStudent,
    deleteStudent,
    editStudentPage,
    updateStudentData
}