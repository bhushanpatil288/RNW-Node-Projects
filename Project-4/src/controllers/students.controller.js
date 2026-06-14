const logger = require("../utils/logger");
const {
    addStudentService,
    getAllStudentsService
} = require("../services/students.services");
const asyncHandler = require("../utils/asyncHandler");

const homePage = asyncHandler(async (req, res) => {
    const data = {
        title: "Home Page"
    }
    res.render("homePage", data);
});

const studentsList = asyncHandler(async (req, res) => {
    const allStudents = await getAllStudentsService();
    const data = {
        title: "Students List",
        students: allStudents
    }
    res.render("studentsListPage", data);
})

const addStudent = asyncHandler(async (req, res) => {
    const student = await addStudentService(req);
    logger.info("user created");

    const allStudents = await getAllStudentsService();
    data = {
        title: "Students List",
        students: allStudents
    }
    res.render("studentsListPage", data);
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