// models/TeacherModel.js
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keysecret = "aniskarimaniskarim";

const TeacherSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: [true, "password is require"],
    minlength: 8,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isTeacher: {
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

TeacherSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Token generation method
TeacherSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, keysecret, { expiresIn: "1d" });
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (error) {
    throw new Error("Token generation failed");
  }
};

const TeacherModel = mongoose.model("Teachers", TeacherSchema);

module.exports = TeacherModel;
