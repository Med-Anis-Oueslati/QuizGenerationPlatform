const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

const StudentModel = mongoose.model("Studentmoreexper", StudentSchema);
module.exports = StudentModel;
