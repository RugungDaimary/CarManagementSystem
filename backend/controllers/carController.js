const Car = require("../models/Car");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

exports.createCar = async (req, res) => {
  const { title, description, tags } = req.body;

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "At least one image is required" });
  }

  if (req.files.length > 10) {
    return res.status(400).json({ error: "You can upload a maximum of 10 images" });
  }

  try {
    const imageUrls = [];
    for (const file of req.files) {
      try {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "car_images",
        });
        imageUrls.push(result.secure_url);
        fs.unlinkSync(file.path);
      } catch (uploadError) {
        console.error("Error uploading to Cloudinary:", uploadError);
        return res.status(500).json({ error: "Error uploading images" });
      }
    }

    const car = new Car({
      user: req.user.id,
      title,
      description,
      images: imageUrls,
      tags: tags.split(",").map((tag) => tag.trim()),
    });

    await car.save();
    res.status(201).json(car);
  } catch (err) {
    console.error("Error creating car:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateCar = async (req, res) => {
  const { title, description, tags } = req.body;
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    if (car.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const imageUrls = car.images;
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "car_images",
          });
          imageUrls.push(result.secure_url);
          fs.unlinkSync(file.path);
        } catch (uploadError) {
          console.error("Error uploading to Cloudinary:", uploadError);
          return res.status(500).json({ error: "Error uploading images" });
        }
      }
    }

    car.title = title || car.title;
    car.description = description || car.description;
    car.images = imageUrls;
    car.tags = tags ? tags.split(",").map((tag) => tag.trim()) : car.tags;
    await car.save();
    res.status(200).json(car);
  } catch (err) {
    console.error("Error updating car:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    if (car.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    await Car.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Car removed" });
  } catch (err) {
    console.error("Error deleting car:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find({ user: req.user.id });
    res.status(200).json(cars);
    
  } catch (err) {
    console.error("Error fetching cars:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json(car);
  } catch (err) {
    console.error("Error fetching car:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.searchCars = async (req, res) => {
  const { keyword } = req.query;
  try {
    const cars = await Car.find({
      user: req.user.id,
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { tags: { $regex: keyword, $options: "i" } },
      ],
    });
    res.status(200).json(cars);

  } catch (err) {
    console.error("Error searching cars:", err);
    res.status(500).json({ error: err.message });
  }
};