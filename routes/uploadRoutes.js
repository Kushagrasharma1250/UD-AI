const express = require("express");
const multer = require("multer");
const path = require("path");

const File = require("../models/File");

const router = express.Router();


// ================= MULTER STORAGE =================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {

    cb(
      null,

      Date.now() +
      path.extname(file.originalname)
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

  const ext =
    path.extname(file.originalname);

  if (allowedTypes.includes(ext)) {

    cb(null, true);

  } else {

    cb(
      new Error("File Type Not Allowed"),
      false
    );
  }
};


// ================= MULTER CONFIG =================

const upload = multer({
  storage,
  fileFilter
});


// ================= FILE UPLOAD API =================

router.post(
  "/upload",

  upload.single("file"),

  async (req, res) => {

    try {

      if (!req.file) {

        return res.status(400).json({
          message: "No File Uploaded"
        });
      }

      // Save File Info to DB
      const newFile = new File({

        filename: req.file.filename,

        filepath: req.file.path
      });

      await newFile.save();

      res.status(200).json({

        message: "File Uploaded Successfully",

        file: newFile
      });

    } catch (error) {

      res.status(500).json({
        message: "Server Error",
        error
      });
    }
  }
);


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
const axios = require("axios");


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

module.exports = router;