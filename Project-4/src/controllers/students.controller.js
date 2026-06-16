const logger = require("../utils/logger");
const {
    addStudentService,
    goToStudentsListService,
    deleteStudentService
} = require("../services/students.services");
const asyncHandler = require("../utils/asyncHandler");

const homePage = asyncHandler(async (req, res) => {
    const data = {
        title: "Home Page"
    }
    res.render("homePage", data);
});

const addStudentPage = asyncHandler(async (req, res) => {
    data = {
        title: "Add New Student"
    }
    res.render("addStudentPage", data)
})

const studentsList = asyncHandler(async (req, res) => {
    await goToStudentsListService(res);
})

const addStudent = asyncHandler(async (req, res) => {
    const student = await addStudentService(req);
    logger.info("user created");

    await goToStudentsListService(res);
})

const deleteStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await deleteStudentService(id);
    res.status(200).json({ success: true });
})

module.exports = {
    homePage,
    addStudent,
    studentsList,
    addStudentPage,
    deleteStudent
}