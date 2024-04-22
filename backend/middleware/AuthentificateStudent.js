const jwt = require("jsonwebtoken");
const studentdb = require("../models/StudentSchema");
const keysecret = "aniskarimaniskarim";
const AuthentificateStudent = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // console.log(token);
    const verifytoken = jwt.verify(token, keysecret);
    // console.log(verifytoken);
    const rootUser = await studentdb.findOne({ _id: verifytoken._id });
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
module.exports = AuthentificateStudent;
