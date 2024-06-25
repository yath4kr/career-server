const express = require("express");
const { UserModel } = require("../Models/Users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, username, password, mobile, email } = req.body;

    if (!name || !username || !password || !mobile || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const mobileNo = Number(mobile);
    if (isNaN(mobileNo)) {
      return res.status(400).json({ message: "Invalid mobile number" });
    }

    const userNameCheck = await UserModel.findOne({ username });
    if (userNameCheck) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const emailCheck = await UserModel.findOne({ email });
    if (emailCheck) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const newUser = new UserModel({
      name,
      username,
      password,
      email,
      mobile: mobileNo,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { id, password } = req.body;
    if (!id || !password) {
      res.status(200).json({ message: "All The fields are required" });
    }
    let user = await UserModel.findOne({ username: id });
    if (!user) {
      user = await UserModel.findOne({ email: id });
    }
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    if (password !== user.password) {
      res.status(404).json({ message: "Password didn't match" });
    }
    const payload = {
      id: user._id,
      name: user.name,
      username: user.username,
    };

    const secret = process.env.JWT_SECRET;
    const token = await jwt.sign(payload, secret);

    res.status(200).json({ message: "Signed In", token, userId: user._id });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
