const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());


// Static Folder
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)

.then(() => {
  console.log("✅ MongoDB Connected");
})

.catch((err) => {
  console.log("❌ DB Error");
  console.log(err);
});


// Routes
app.use(
  "/api",
  require("./routes/uploadRoutes")
);


// Home Route
app.get("/", (req, res) => {

  res.send("File Upload Server Running");
});
mongoose.connection.on(
  "connected",

  () => {
    console.log("Mongoose Connected");
  }
);

mongoose.connection.on(
  "error",

  (err) => {
    console.log("Mongoose Error:", err);
  }
);

// Error handling
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `🚀 Server Running on Port ${PORT}`
  );
});