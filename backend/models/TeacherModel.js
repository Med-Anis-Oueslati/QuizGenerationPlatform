const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
    },
    phone: {
      type: String,
      required: [true, "phone no is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    establishment: {
      type: String,
      required: [true, "establishment is required"],
    },
    specialization: {
      type: String,
      required: [true, "specialization is require"],
    },
  },
  { timestamps: true }
);

const TeacherModel = mongoose.model("teachermoreexper", TeacherSchema);
module.exports = TeacherModel;
