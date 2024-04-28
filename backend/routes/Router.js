const express = require("express");
const jwt = require("jsonwebtoken"); // Add this line to import the jwt module

const router = new express.Router();
const teacherdb = require("../models/TeacherModel");
const studentdb = require("../models/StudentSchema");
const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const {
  registerControllerForTeacher,
  registerControllerForStudent,
  authControllerForStudent,
  authControllerForTeacher,
  applyStudentController,
  applyTeacherController,
  loginControllerForStudent,
  loginControllerForTeacher,
} = require("../controllers/UserControl");
const TeacherModel = require("../models/TeacherModel");
const studentModel = require("../models/StudentModel");
const AuthentificationMiddleware = require("../middleware/AuthentificationMiddleware");
const AuthentificateTeacher = require("../middleware/AuthetificateTeacher");
const AuthentificateStudent = require("../middleware/AuthentificateStudent");

// Register a new teacher
router.post(
  "/registerTeacher",
  [
    check("username", "Username is required").notEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 8 }),
  ],
  async (req, res) => {
    try {
      // Validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, email, password } = req.body;

      // Check if teacher already exists
      let existingTeacher = await TeacherModel.findOne({ email });
      if (existingTeacher) {
        return res.status(400).json({ message: "Teacher already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new teacher
      const newTeacher = new TeacherModel({
        username,
        email,
        password: hashedPassword,
      });

      // Save the new teacher to the database
      await newTeacher.save();

      res.status(201).json({ message: "Teacher registered successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
// Route to list all teachers
router.get("/allTeacher", async (req, res) => {
  try {
    // Fetch all teachers from the database
    const teachers = await teacherdb.find();

    // Send the list of teachers as JSON response
    res.status(200).json(teachers);
  } catch (error) {
    // If there's an error, send an error response
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//register students
router.post(
  "/registerStudent",
  [
    check("username", "Username is required").notEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 8 }),
  ],
  async (req, res) => {
    try {
      // Validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, email, password } = req.body;

      // Check if student already exists
      let existingStudent = await studentModel.findOne({ email });
      if (existingStudent) {
        return res.status(400).json({ message: "Student already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new student
      const newStudent = new studentModel({
        username,
        email,
        password: hashedPassword,
      });

      // Save the new student to the database
      await newStudent.save();

      res.status(201).json({ message: "Student registered successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post("/loginTeacher", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the teacher by email
    const teacher = await TeacherModel.findOne({ email });

    // If no teacher found, send error response
    if (!teacher) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // // Compare passwords
    // const isMatch = await bcrypt.compare(password, teacher.password);

    // // If passwords don't match, send error response
    // if (!isMatch) {
    //   return res.status(400).json({ message: "Invalid credentials" });
    // }

    // Generate JWT token
    const token = jwt.sign({ id: teacher._id }, "ANISKARIM", {
      expiresIn: "1d",
    });

    // Send success response with token
    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login student
router.post("/loginStudent", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the student by email
    const student = await studentModel.findOne({ email });

    // If no student found, send error response
    if (!student) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // // Compare passwords
    // const isMatch = await bcrypt.compare(password, student.password);

    // // If passwords don't match, send error response
    // if (!isMatch) {
    //   return res.status(400).json({ message: "Invalid credentials" });
    // }

    // Generate JWT token
    const token = jwt.sign({ id: student._id }, "YOUR_SECRET_KEY", {
      expiresIn: "1d",
    });

    // Send success response with token
    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Teacher Valid

router.get("/teacherValid", AuthentificateTeacher, async (req, res) => {
  try {
    const ValidTeacherOne = await teacherdb.findOne({ _id: req.teacherId });
    if (ValidTeacherOne) {
      res.status(201).json({ status: 201, ValidTeacherOne });
    } else {
      return res.status(404).json({ error: "Teacher not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ status: 401, error });
  }
});

// Validate student
router.get("/studentValid", AuthentificateStudent, async (req, res) => {
  try {
    const validStudent = await studentModel.findOne({ _id: req.studentId });
    if (validStudent) {
      res.status(201).json({ status: 201, validStudent });
    } else {
      return res.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ status: 401, error });
  }
});

//teacher lougout

router.get("/logoutTeacher", AuthentificateTeacher, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
      return curelem.token !== req.token;
    });

    res.clearCookie("teachercookie", { path: "/" });

    req.rootUser.save();
    res.status(201).json({ status: 201 });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

//logoutStudent
router.get("/logoutStudent", AuthentificateStudent, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
      return curelem.token !== req.token;
    });

    res.clearCookie("studentcookie", { path: "/" });

    req.rootUser.save();
    res.status(201).json({ status: 201 });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

//all student

// Get all students
router.get("/allStudents", async (req, res) => {
  try {
    // Fetch all students from the database
    const students = await studentModel.find();

    // Send the list of students as JSON response
    res.status(200).json(students);
  } catch (error) {
    // If there's an error, send an error response
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/allStudents/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const student = await studentdb.findOne({ _id });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//update student
router.put("/allStudents/:id", async (req, res) => {
  const { username, email } = req.body;
  try {
    const updatedStudent = await studentdb.findOneAndUpdate(
      { _id: req.params.id },
      { username, email },
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json({ success: "Student updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//delete patient
router.delete("/allStudents/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const student = await studentdb.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//teacher
//login teacher || POST
router.post("/teacherLogin", loginControllerForTeacher);
//register teacher || POST
router.post(
  "/getTeacherData",
  AuthentificationMiddleware,
  authControllerForTeacher
);

router.get("/allTeachers", async (req, res) => {
  try {
    const teachers = await teacherModel.find();
    res.status(200).send({ success: true, teachers: teachers });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in fetching teachers ${error.message}`,
    });
  }
});

//home ||POST
router.post(
  "/apply-teachers",
  AuthentificationMiddleware,
  applyTeacherController
);

module.exports = router;
