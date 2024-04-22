const jwt = require("jsonwebtoken");
const keysecret = "aniskarimaniskarim";

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    jwt.verify(token, keysecret, (err, decode) => {
      if (err) {
        return res.status(200).send({
          message: "Auth Failed",
          success: false,
        });
      } else {
        req.body.teacherId = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};
