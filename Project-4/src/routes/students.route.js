const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");

const {
    homePage,
    addStudent,
    studentsList,
    addStudentPage,
    deleteStudent,
    editStudentPage
} = require("../controllers/students.controller");

router.get("/", homePage);

router.get("/add", addStudentPage);
router.post("/add-student", upload.single("profilePicture"), addStudent)
router.get("/students", studentsList)
router.delete("/delete/:id", deleteStudent);
router.get("/edit/:id", editStudentPage);

module.exports = router;