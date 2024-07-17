const express = require("express");
const { AdminModel } = require("../Models/Admins");
require("dotenv").config();

const router = express.Router();
const secret = process.env.ADMIN_SECRET;

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
    // const payload = {
    //   id: user._id,
    //   name: user.name,
    //   username: user.username,
    // };

    // const token = await jwt.sign(payload, secret);

    // return res
    //   .status(200)
    //   .json({ message: "Signed In", token, userId: user._id });
    return res.status(200).json({ message: `Hello ${user.name}` });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
