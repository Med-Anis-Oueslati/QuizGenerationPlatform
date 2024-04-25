const mongoose = require("mongoose");

const DB =
  "mongodb+srv://mohamedanisoueslati:ChAidlzqhFQEsfzT@cluster0.dsgdpat.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Data Base Connected"))
  .catch((err) => {
    console.log(err);
  });
