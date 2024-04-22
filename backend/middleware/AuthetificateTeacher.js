const jwt = require("jsonwebtoken");
const teacherdb = require("../models/TeacherSchema");
const keysecret = "aniskarimaniskarim";
const AuthentificateTeacher = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // console.log(token);
    const verifytoken = jwt.verify(token, keysecret);
    // console.log(verifytoken);
    const rootUser = await teacherdb.findOne({ _id: verifytoken._id });
    // console.log(rootUser);
    if (!rootUser) {
      throw new Error("user not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.recepId = rootUser._id;

    next();
  } catch (error) {
    res
      .status(401)
      .json({ status: 401, message: "Unauthorized no token provide" });
  }
};
module.exports = AuthentificateTeacher;
