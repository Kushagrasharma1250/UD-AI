const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const User = require("../models/User");

const authMiddleware =
  require("../middleware/authMiddleware");

const router = express.Router();


// ================= REGISTER =================

router.post("/register", async(req, res) => {

  try {

    const { name, email, password } = req.body;

    // Check Existing User
    const existingUser = await User.findOne({
      email
    });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(password, salt);

    // Create User
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({
      message: "User Registered Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });
  }
});


// ================= LOGIN =================

router.post("/login", async(req, res) => {

  try {

    const { email, password } = req.body;

    // Check User
    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "Invalid Email or Password"
      });
    }

    // Compare Password
    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!validPassword) {

      return res.status(400).json({
        message: "Invalid Email or Password"
      });
    }

    // Create JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "1d"
      }
    );

    res.json({
      token,
      user
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });
  }
});


// ================= PROTECTED ROUTE =================

router.get(
  "/dashboard",
  authMiddleware,

  async(req, res) => {

    res.json({
      message: "Welcome to Dashboard",
      user: req.user
    });
  }
);


// ================= GOOGLE AUTH =================

// Google Login
router.get(
  "/google",

  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);


// Google Callback
router.get(
  "/google/callback",

  passport.authenticate("google", {
    failureRedirect: "/login"
  }),

  (req, res) => {

    res.json({
      message: "Google Login Successful",
      user: req.user
    });
  }
);

module.exports = router;