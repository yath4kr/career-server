const express = require("express");
const { UserModel } = require("../Models/Users");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("Yo");
    res.json("Hello World");
  } catch (err) {
    console.log(err);
  }
});

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

module.exports = router;
