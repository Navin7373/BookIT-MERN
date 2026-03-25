const express = require("express");
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking,
  acceptBooking,
  declineBooking,
} = require("../controllers/bookingController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", protect, createBooking);
router.get("/my-bookings", protect, getMyBookings);
router.get("/", protect, admin, getAllBookings);
router.delete("/:id", protect, cancelBooking);

router.get("/accept/:id", acceptBooking);
router.get("/decline/:id", declineBooking);

module.exports = router;