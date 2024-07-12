const express = require("express");
const { UserModel } = require("../Models/Users");
const jwt = require("jsonwebtoken");
const { postUserHandler } = require("../controllers/users");
const { verifyToken, routeLogger } = require("../middlewares/");
require("dotenv").config();

const router = express.Router();

router.use(routeLogger);

router.post("/register", postUserHandler);

router.post("/login", async (req, res) => {
  try {
    const { id, password } = req.body;

    if (!id || !password) {
      return res.status(200).json({ message: "All The fields are required" });
    }

    let user = await UserModel.findOne({ username: id });
    if (!user) {
      user = await UserModel.findOne({ email: id });
    }

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

    const secret = process.env.JWT_SECRET;
    const token = await jwt.sign(payload, secret);

    return res
      .status(200)
      .json({ message: "Signed In", token, userId: user._id });
  } catch (err) {
    console.log("Inside catch block");
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:userId", verifyToken, async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);
    return res.status(201).json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
