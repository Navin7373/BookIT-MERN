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

// ✅ CORS CONFIG (IMPORTANT)
app.use(
  cors({
    origin: [
      "http://localhost:3000", // local frontend
      process.env.CLIENT_URL   // deployed frontend (Vercel)
    ],
    credentials: true
  })
);

// Allow large payload (images)
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/halls", hallRoutes);
app.use("/api/bookings", bookingRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("BookIT API Running 🚀");
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});