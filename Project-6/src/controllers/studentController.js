const asyncHandler = require("../utils/asyncHandler");
const {
    addStudentService,
    goToStudentsListService,
    deleteStudentService,
    editPageService,
    updateStudentDataService
} = require("../services/studentServices");

const studentsPage = asyncHandler(async (req, res) => {
    return res.render("students/homePage", { title: "Home Page" });
});

const addStudentPage = asyncHandler(async (req, res) => {
    return res.render("students/addStudentPage", { title: "Add New Student" });
});

const studentsList = asyncHandler(async (req, res) => {
    await goToStudentsListService(req, res);
});

const addStudent = asyncHandler(async (req, res) => {
    await addStudentService(req);
    await goToStudentsListService(req, res);
});

const deleteStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await deleteStudentService(id);
    return res.status(200).json({ success: true });
});

const editStudentPage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = await editPageService(id);

    if (!data) return res.redirect("/students");
    return res.render("students/editStudentPage", data);
});

const updateStudentData = asyncHandler(async (req, res) => {
    await updateStudentDataService(req, req.params.id);
    await goToStudentsListService(req, res);
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