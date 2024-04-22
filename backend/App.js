const express = require("express");
const app = express(); // Changed variable name to lowercase 'app'
require("./db/conn");
const morgan = require("morgan");
const dotenv = require("dotenv");
const router = require("./routes/Router");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = 8009;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies
app.use(cors()); // Enable CORS
// app.use(router); // Mount router

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
