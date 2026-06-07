let students =  [];

const home = (req, res) => {
    res.render("home");
}

// add students
const addStudentPage = (req, res) => {
    res.render("addStudent");
}

const saveStudent = (req, res) => {
    const student = {
        id: Date.now(),
        ...req.body
    }

    students.push(student);

    res.redirect("/students/students-list");
}

// view all students
const studentPage = (req, res) => {
    res.render("students", { students });
}
// view single student
const studentInfo = (req, res) => {
    const student = students.find(st => st.id === Number(req.params.id));
    return res.render("student", { student });
}

// delete students
const deleteStudent = (req, res) => {
    students = students.filter(student => student.id !== Number(req.params.id));
    res.redirect("/students/students-list");
}

// edit student data
const editPage = (req, res) => {
    const student = students.find(st => st.id === Number(req.params.id))
    res.render("editPage", { student });
}

const updateStudentData = (req, res) => {
    const updateIdx = students.findIndex(st=> st.id === Number(req.params.id));
    students[updateIdx] = req.body;
    res.redirect("/students/students-list");
}

module.exports = { 
    home,
    addStudentPage,
    saveStudent,
    studentPage,
    studentInfo,
    deleteStudent,
    editPage,
    updateStudentData
};