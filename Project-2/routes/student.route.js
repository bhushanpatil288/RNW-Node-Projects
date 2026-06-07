const express = require("express");
const router = express.Router();
const { 
    home, 
    addStudentPage,
    saveStudent, 
    studentPage,
    studentInfo,
    deleteStudent,
    editPage,
    updateStudentData
} = require("../controllers/student.controller");

router.get("/", home);

// add
router.get("/add", addStudentPage);
router.post("/save-student", saveStudent);

// view
router.get("/students-list", studentPage)
router.get("/view/:id", studentInfo);

// delete
router.get("/delete/:id", deleteStudent);

// edit
router.get("/edit/:id", editPage);
router.post("/edit/:id", updateStudentData);

module.exports = router;