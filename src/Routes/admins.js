const express = require("express");
const { AdminModel } = require("../Models/Admins");
const { UserModel } = require("../Models/Users");
const { InstructorModel } = require("../Models/Instructors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();
const secret = process.env.ADMIN_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err) => {
      if (err) {
        return res.status(403).json({ message: "Token Not Valid" });
      }
      next();
    });
  } else {
    return res.status(402).json({ message: "No token Found" });
  }
};

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(200).json({ message: "All The fields are required" });
    }
    user = await AdminModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password !== user.password) {
      return res.status(404).json({ message: "Password didn't match" });
    }
    const payload = {
      id: user._id,
      name: user.name,
      username: user.username,
    };

    const token = await jwt.sign(payload, secret);

    return res
      .status(200)
      .json({ message: "Signed In", token, userId: user._id });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/fetchUsers", verifyToken, async (req, res) => {
  try {
    const users = await UserModel.find({});
    return res.status(201).json({ users });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/addInfluencer", verifyToken, async (req, res) => {
  try {
    const data = req.body;
    const newInstructor = new InstructorModel(data);
    await newInstructor.save();
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
