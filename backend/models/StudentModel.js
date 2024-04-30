// models/StudentrModel.js
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keysecret = "aniskarimaniskarim";

const StudentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is require"],
  },
  email: {
    type: String,
    required: [true, "email is require"],
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not valid email");
      }
    },
  },
  establishment: {
    type: String,
    required: [true, "establishment is require"],
  },
  password: {
    type: String,
    required: [true, "password is require"],
    minlength: 8,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isStudent: {
    type: Boolean,
    default: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

StudentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Token generation method
StudentSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, keysecret, { expiresIn: "1d" });
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (error) {
    throw new Error("Token generation failed");
  }
};

const StudentModel = mongoose.model("Students", StudentSchema);

module.exports = StudentModel;
