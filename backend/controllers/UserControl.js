const teacherModel = require("../models/TeacherModel");
const studentModel = require("../models/StudentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keysecret = "aniskarimaniskarim";
//register
const registerControllerForTeacher = async (req, res) => {
  try {
    const existingTeacher = await teacherModel.findOne({
      email: req.body.email,
    });
    if (existingTeacher) {
      return res
        .status(200)
        .send({ message: "Teacher Already Exists", success: false });
    }

    const { username, email, password } = req.body;

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new teacher instance
    const newTeacher = new teacherModel({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new teacher to the database
    await newTeacher.save();

    // Send success response
    res
      .status(201)
      .send({ message: "Teacher Registered Successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error registering teacher", success: false });
  }
};

const registerControllerForStudent = async (req, res) => {
  try {
    const existingStudent = await studentModel.findOne({
      email: req.body.email,
    });
    if (existingStudent) {
      return res
        .status(200)
        .send({ message: "Student Already Exist", success: false });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newStudent = new studentModel(req.body);
    await newStudent.save();
    res.status(201).send({ message: "Register Successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};
//Login

// Login a teacher
const loginControllerForTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the teacher by email
    const teacher = await teacherModel.findOne({ email });

    // If no teacher found, send error response
    if (!teacher) {
      return res
        .status(200)
        .send({ message: "Invalid Email or Password", success: false });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, teacher.password);

    // If passwords don't match, send error response
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Email or Password", success: false });
    }

    // Generate JWT token
    const token = jwt.sign({ id: teacher._id }, keysecret, { expiresIn: "1d" });

    // Send success response with token
    res.status(200).send({ message: "Login Successful", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error logging in", success: false });
  }
};

const loginControllerForStudent = async (req, res) => {
  try {
    const student = await studentModel.findOne({ email: req.body.email });
    if (!student) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, student.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Email or Password", success: false });
    }
    const token = jwt.sign({ id: student._id }, keysecret, { expiresIn: "1d" });
    res
      .status(200)
      .send({ message: "Login Success", success: true, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL${error.message}` });
  }
};

//authcontroller

const authControllerForTeacher = async (erq, res) => {
  try {
    const teacher = await teacherModel.findOne({ _id: req.body.email });
    if (!teacher) {
      return res.status(200).send({
        message: "Teacher not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: {
          username: teacher.username,
          email: teacher.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    req.status(500).send({
      message: "Authentification error",
      success: false,
      error,
    });
  }
};
const authControllerForStudent = async (erq, res) => {
  try {
    const student = await studentModel.findOne({ _id: req.body.email });
    if (!student) {
      return res.status(200).send({
        message: "Student not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: {
          username: student.username,
          email: student.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    req.status(500).send({
      message: "Authentification error",
      success: false,
      error,
    });
  }
};
//apply Controller

const applyTeacherController = async (req, res) => {
  try {
    const newTeacher = new teacherModel({ ...req.body, status: "pending" });
    await newTeacher.save();

    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;

    notification.push({
      type: "apply-teacher-request",
      message: `${newTeacher.firstName} ${newTeacher.lastName} has applied for a Teacher account.`,
      data: {
        teacherId: newTeacher._id,
        name: newTeacher.firstName + " " + newTeacher.lastName,
        onClickPath: "/teacherapp/teachers",
      },
    });

    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Teacher account applied successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error while applying for teacher.",
    });
  }
};

const applyStudentController = async (req, res) => {
  try {
    const newStudent = new studentModel({ ...req.body, status: "pending" });
    await newStudent.save();

    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;

    notification.push({
      type: "apply-student-request",
      message: `${newStudent.firstName} ${newStudent.lastName} has applied for a Student account.`,
      data: {
        sttudentId: newStudent._id,
        name: newStudent.firstName + " " + newTeacher.lastName,
        onClickPath: "/studentapp/students",
      },
    });

    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Student account applied successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error while applying for student.",
    });
  }
};

module.exports = {
  registerControllerForTeacher,
  registerControllerForStudent,
  authControllerForStudent,
  authControllerForTeacher,
  applyStudentController,
  applyTeacherController,
  loginControllerForStudent,
  loginControllerForTeacher,
};
