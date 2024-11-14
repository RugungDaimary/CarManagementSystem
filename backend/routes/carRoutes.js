const express = require("express");
const {
  createCar,
  getCars,
  getCar,
  updateCar,
  deleteCar,
  searchCars,
} = require("../controllers/carController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const fs = require("fs");
const router = express.Router();

// Ensure the uploads directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/", authMiddleware, upload.array("images", 10), createCar); // Create a car
router.get("/", authMiddleware, getCars); // Get all cars
router.get("/search", authMiddleware, searchCars); // Search cars
router.get("/:id", authMiddleware, getCar); // Get a car using id
router.put("/:id", authMiddleware, upload.array("images", 10), updateCar); // Update a car
router.delete("/:id", authMiddleware, deleteCar); // Delete a car

module.exports = router;
