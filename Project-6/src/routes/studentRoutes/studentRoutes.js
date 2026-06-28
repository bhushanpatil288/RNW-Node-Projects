const express = require("express");
const router = express.Router();

const upload = require("../../middlewares/upload");
const requireAuth = require("../../middlewares/auth");

const {
    studentsPage,
    addStudentPage,
    studentsList,
    addStudent,
    deleteStudent,
    editStudentPage,
    updateStudentData
} = require("../../controllers/studentController");

router.use(requireAuth);

router.get("/", studentsPage);
router.get("/add", addStudentPage);
router.post("/add-student", upload.single("profilePicture"), addStudent);
router.get("/all", studentsList);
router.delete("/delete/:id", deleteStudent);
router.get("/edit/:id", editStudentPage);
router.post("/update/:id", upload.single("profilePicture"), updateStudentData);

module.exports = router;