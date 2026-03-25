const Booking = require("../models/booking");
const User = require("../models/user");
const Hall = require("../models/hall");
const { sendAdminApprovalEmail, sendUserStatusEmail } = require("../utils/emailService");

const createBooking = async (req, res) => {
  try {
    const { hall, date, startTime, endTime } = req.body;

    if (!hall || !date || !startTime || !endTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (startTime >= endTime) {
      return res.status(400).json({ message: "End time must be greater than start time" });
    }

    const existingBooking = await Booking.findOne({
      hall,
      date,
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "This hall is already booked for the selected time slot",
      });
    }

    const booking = await Booking.create({
      user: req.user.id,
      hall,
      date,
      startTime,
      endTime,
    });

    const userDetails = await User.findById(req.user.id);
    const hallDetails = await Hall.findById(hall);
    await sendAdminApprovalEmail(booking, userDetails, hallDetails);

    res.status(201).json({
      message: "Hall booked successfully. Pending admin approval.",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate("hall");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email role")
      .populate("hall", "name location capacity price");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const acceptBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("user").populate("hall");
    if (!booking) {
      return res.status(404).send("<h2>Booking not found</h2>");
    }

    booking.status = "accepted";
    await booking.save();

    await sendUserStatusEmail(booking.user.email, booking.user.name, booking.hall.name, "accepted", booking.date, booking.startTime, booking.endTime);

    res.status(200).send("<h2>Booking Accepted successfully. User has been notified.</h2>");
  } catch (error) {
    res.status(500).send("<h2>Something went wrong</h2>");
  }
};

const declineBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("user").populate("hall");
    if (!booking) {
      return res.status(404).send("<h2>Booking not found</h2>");
    }

    booking.status = "declined";
    await booking.save();

    await sendUserStatusEmail(booking.user.email, booking.user.name, booking.hall.name, "declined", booking.date, booking.startTime, booking.endTime);

    res.status(200).send("<h2>Booking Declined successfully. User has been notified.</h2>");
  } catch (error) {
    res.status(500).send("<h2>Something went wrong</h2>");
  }
};

module.exports = { createBooking, getMyBookings, getAllBookings, cancelBooking, acceptBooking, declineBooking };