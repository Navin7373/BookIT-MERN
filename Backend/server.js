const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const hallRoutes = require("./routes/hallRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
// Allow base64 images in JSON payloads (admin hall images)
app.use(express.json({ limit: "10mb" }));

app.use("/api/users", userRoutes);
app.use("/api/halls", hallRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.send("BookIT API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});