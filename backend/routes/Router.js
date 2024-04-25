const express = require("express");
const router = new express.Router();
const teacherdb = require("../models/TeacherSchema");
const studentdb = require("../models/StudentSchema");
const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const authentificateStudent = require("../middleware/AuthentificateStudent");
const authentificateTeacher = require("../middleware/AuthetificateTeacher");
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
const teacherModel = require("../models/TeacherModel");
const studentModel = require("../models/StudentModel");


//Teacher Registration
router.post("/registerTeacher", async (req, res) => {
  const { username, email, password, confirmedPassword } = req.body;
  if (!username || !email || !password || !confirmedPassword) {
    return res.status(422).json({ error: "Fill all the details" });
  }

  try {
    const preTeacher = await teacherdb.findOne({ email: email });
    if (preTeacher) {
      return res.status(422).json({ error: "This Email is Already Exist" });
    } else if (password !== confirmedPassword) {
      return res
        .status(422)
        .json({ error: "Password and Confirm password do not match" });
    } else {
      const finalTeacher = new teacherdb({
        username,
        email,
        password,
        confirmedPassword,
      });
      // Password hashing
      const storeData = await finalTeacher.save();
      return res.status(201).json({ status: 201, storeData });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(422).json(error);
  }
});


//Student Registration
router.post("/registerStudent", async (req, res) => {
  const { username, email, password, confirmedPassword } = req.body;
  if (!username || !email || !password || !confirmedPassword) {
    return res.status(422).json({ error: "Fill all the details" });
  }

  try {
    const preStudent = await teacherdb.findOne({ email: email });
    if (preStudent) {
      return res.status(422).json({ error: "This Email is Already Exist" });
    } else if (password !== confirmedPassword) {
      return res
        .status(422)
        .json({ error: "Password and Confirm password do not match" });
    } else {
      const finalstudent = new studentdb({
        username,
        email,
        password,
        confirmedPassword,
      });
      // Password hashing
      const storeData = await finalstudent.save();
      res.status(201).json({ status: 201, storeData });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(422).json(error);
  }
});

//teacher Login

router.post("/login", async (req, res) => {
  // console.log(req.body)
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ error: "fill all the details" });
  }
  try {
    const teacherValid = await teacherdb.findOne({ email: email });
    if (teacherValid) {
      const isMatch = await bcrypt.compare(password, teacherValid.password);

      if (!isMatch) {
        res.status(422).json({ error: "invalid details" });
      } else {
        //token generate
        const token = await teacherValid.generateAuthtoken();

        //cookiegenerate
        res.cookie("teachercookie", token, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true,
        });

        const result = {
          teacherValid,
          token,
        };
        res.status(201).json({ status: 201, result });
      }
    }
  } catch (error) {
    res.status(401).json(error);
    console.log("catch block");
  }
});

//student login 

router.post("/login", async (req, res) => {
  // console.log(req.body)
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ error: "fill all the details" });
  }
  try {
    const studentValid = await studentdb.findOne({ email: email });
    if (studentValid) {
      const isMatch = await bcrypt.compare(password, studentValid.password);

      if (!isMatch) {
        res.status(422).json({ error: "invalid details" });
      } else {
        //token generate
        const token = await studentValid.generateAuthtoken();

        //cookiegenerate
        res.cookie("studentcookie", token, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true,
        });

        const result = {
          studentValid,
          token,
        };
        res.status(201).json({ status: 201, result });
      }
    }
  } catch (error) {
    res.status(401).json(error);
    console.log("catch block");
  }
});


