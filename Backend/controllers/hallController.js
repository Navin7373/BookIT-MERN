const Hall = require("../models/hall");

const addHall = async (req, res) => {
  try {
    const { name, location, capacity, price, description, image } = req.body;

    if (!name || !location || !capacity || !price || !description) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const hall = await Hall.create({
      name,
      location,
      capacity,
      price,
      description,
      image,
    });

    res.status(201).json({
      message: "Hall added successfully",
      hall,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllHalls = async (req, res) => {
  try {
    const halls = await Hall.find();
    res.status(200).json(halls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHallById = async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.id);

    if (!hall) {
      return res.status(404).json({ message: "Hall not found" });
    }

    res.status(200).json(hall);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateHall = async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.id);

    if (!hall) {
      return res.status(404).json({ message: "Hall not found" });
    }

    const updatedHall = await Hall.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Hall updated successfully",
      hall: updatedHall,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteHall = async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.id);

    if (!hall) {
      return res.status(404).json({ message: "Hall not found" });
    }

    await Hall.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Hall deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addHall,
  getAllHalls,
  getHallById,
  updateHall,
  deleteHall,
};