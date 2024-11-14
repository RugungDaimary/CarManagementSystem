const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

// Import routes
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
// Add a route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Car Management API");
});
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
