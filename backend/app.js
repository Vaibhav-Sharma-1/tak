const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes.js");
const userRoutes = require("./routes/userRoutes");
const imageRoutes = require("./routes/imageRoutes");
const { errorHandler } = require("./middlewares/errorMiddleware");
const path = require("path");
const fs = require("fs");

const app = express();

// Create 'uploads' directory if it doesn't exist
const uploadDir = path.join(__dirname, "/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Middleware
app.use(express.json());
app.use(cors());

// Static folder for serving uploaded images (if needed)
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/images", imageRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;
