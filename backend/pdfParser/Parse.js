const mongoose = require("mongoose");
const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();

require("./pdfDetails");
const PdfSchema = mongoose.model("PdfDetails");
// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Serve static files
app.use("/files", express.static("files"));

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

// Create multer upload instance
const upload = multer({ storage: storage });

// Middleware function to handle file uploads
const uploadMiddleware = upload.single("file");

// Route to handle file uploads
app.post("/upload-files", uploadMiddleware, async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename;
  try {
    await PdfSchema.create({ title: title, pdf: fileName });
    res.send({ status: "ok" });
    console.log("uploading");
  } catch (error) {
    res.json({ status: error });
    console.log("upload failed");
  }
});

// Route to get files
app.get("/get-files", async (req, res) => {
  try {
    const data = await PdfSchema.find({});
    res.send({ status: "ok", data: data });
  } catch (error) {
    res.json({ status: error });
  }
});

// Route to test server
app.get("/", async (req, res) => {
  res.send("Success!!!!!!");
});
app.listen(27017, () => {
  console.log("Server Started");
});
module.exports = uploadMiddleware;
