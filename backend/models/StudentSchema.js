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
  password: {
    type: String,
    required: [true, "password is require"],
    minlength: 8,
  },
  confirmedPassword: {
    type: String,
    required: true,
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

//hash password
StudentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmedPassword = await bcrypt.hash(this.confirmedPassword, 12);
  }

  next();
});

//token generate
StudentSchema.methods.generateAuthtoken = async function () {
  try {
    let token23 = jwt.sign({ _id: this._id }, keysecret, {
      expiresIn: "1d",
    });

    this.tokens = this.tokens.concat({ token: token23 });
    await this.save();
    return token23;
  } catch (error) {
    res.status(422).json(error);
  }
};

//creating model

const Studentdb = new mongoose.model("Students", StudentSchema);

module.exports = Studentdb;
