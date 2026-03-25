const express = require("express");
const router = express.Router();
const {
  addHall,
  getAllHalls,
  getHallById,
  updateHall,
  deleteHall,
} = require("../controllers/hallController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", protect, admin, addHall);
router.get("/", getAllHalls);
router.get("/:id", getHallById);
router.put("/:id", protect, admin, updateHall);
router.delete("/:id", protect, admin, deleteHall);

module.exports = router;