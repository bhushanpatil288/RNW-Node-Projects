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
    const student = addStudentService(req.body);
    res.render("studentsListPage");
})

module.exports = {
    homePage,
    addStudent,
    studentsList
}