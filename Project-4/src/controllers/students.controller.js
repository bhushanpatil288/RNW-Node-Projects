const { Logger } = require("winston");
const { addStudentService } = require("../services/students.services");
const asyncHandler = require("../utils/asyncHandler");

const homePage = asyncHandler(async (req, res) => {
    const data = {
        title: "Home Page"
    }
    res.render("homePage", data);
});

const studentsList = asyncHandler(async (req, res) => {
    const data = {
        title: "Students List"
    }
    res.render("studentsListPage", data);
})

const addStudent = asyncHandler(async (req, res) => {
    const student = await addStudentService(req);
    Logger.info("user created");
    res.render("studentsListPage");
})

const addStudentPage = asyncHandler(async (req, res) => {
    data = {
        title: "Add New Student"
    }
    res.render("addStudentPage", data)
})

module.exports = {
    homePage,
    addStudent,
    studentsList,
    addStudentPage
}