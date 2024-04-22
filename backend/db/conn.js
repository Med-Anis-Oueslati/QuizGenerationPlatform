const mongoose = require("mongoose");

const DB =
  "mongodb+srv://MedAnis:Oueslati@cluster0.hyiimux.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Data Base Connected"))
  .catch((err) => {
    console.log(err);
  });
