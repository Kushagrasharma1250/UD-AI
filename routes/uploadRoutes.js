const express = require("express");
const multer = require("multer");
const path = require("path");
const csv = require("csv-parser");
const fs = require("fs");
const axios = require("axios");

const processPipeline = require("../utils/processPipeline");
const File = require("../models/File");

const router = express.Router();

const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ================= MULTER STORAGE =================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  }
});


// ================= FILE FILTER =================

const fileFilter = (req, file, cb) => {

  const allowedTypes = [
    ".jpg",
    ".jpeg",
    ".png",
    ".pdf",
    ".csv"
  ];

  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("File Type Not Allowed"), false);
  }
};


// ================= MULTER CONFIG =================

const upload = multer({
  storage,
  fileFilter
});


// ================= FILE UPLOAD API =================

router.post("/upload", upload.single("file"), async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No File Uploaded"
      });
    }

    // Save File Info to DB
    const savedPath = path.resolve(req.file.path || path.join(uploadsDir, req.file.filename));

    const newFile = new File({
      filename: req.file.filename,
      filepath: savedPath
    });

    await newFile.save();

    res.status(200).json({
      message: "File Uploaded Successfully",
      file: newFile
    });

  } catch (error) {

    console.error("Upload Error:", error);

    res.status(500).json({
      message: "Server Error"
    });
  }
});


// ================= PROCESS CSV API =================

router.post("/process", async (req, res) => {

  try {
    const files = await File.find().sort({ createdAt: -1 });

    if (!files.length) {
      return res.status(404).json({
        message: "No CSV File Found"
      });
    }

    let latestFile = null;

    for (const file of files) {
      if (!file.filepath) continue;

      const candidatePath = path.resolve(file.filepath);
      if (path.extname(candidatePath).toLowerCase() !== ".csv") continue;
      if (fs.existsSync(candidatePath)) {
        latestFile = { filepath: candidatePath, filename: file.filename };
        break;
      }
    }

    if (!latestFile) {
      const csvFiles = fs.readdirSync(uploadsDir)
        .filter((name) => path.extname(name).toLowerCase() === ".csv")
        .map((name) => {
          const filePath = path.join(uploadsDir, name);
          return {
            name,
            filePath,
            mtime: fs.statSync(filePath).mtime.getTime()
          };
        })
        .sort((a, b) => b.mtime - a.mtime);

      if (csvFiles.length > 0) {
        latestFile = {
          filepath: csvFiles[0].filePath,
          filename: csvFiles[0].name
        };
      }
    }

    if (!latestFile) {
      return res.status(404).json({
        message: "Latest uploaded file not found"
      });
    }

    const results = [];

    fs.createReadStream(latestFile.filepath)
      .pipe(csv())

      .on("data", (data) => {
        results.push(data);
      })

      .on("end", () => {
        try {
          const processed = processPipeline(results);

          res.json({
            success: true,
            processed
          });
        } catch (error) {
          console.error("Processing pipeline error:", error);

          res.status(500).json({
            message: "CSV Processing Error"
          });
        }
      })

      .on("error", (error) => {
        console.error(error);

        res.status(500).json({
          message: "CSV Processing Error"
        });
      });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
});


// ================= GET ALL FILES =================

router.get("/files", async (req, res) => {

  try {

    const files = await File.find();

    res.json(files);

  } catch (error) {

    res.status(500).json({
      message: "Error Fetching Files"
    });
  }
});


// ================= EXTERNAL API =================

router.get("/users", async (req, res) => {

  try {

    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    res.json(response.data);

  } catch (error) {

    res.status(500).json({
      message: "API Error"
    });
  }
});


// ================= EXPORT ROUTER =================

module.exports = router;