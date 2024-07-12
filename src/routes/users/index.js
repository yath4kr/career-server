const express = require("express");
const { UserModel } = require("../../models/users");
const { postUserHandler, getUserHandler } = require("../../controllers/users");
const { verifyToken, routeLogger } = require("../../middlewares");
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

    const token = await user.generateAuthToken();

    return res
      .status(200)
      .json({ message: "Signed In", token, userId: user._id });
  } catch (err) {
    console.log("Inside catch block");
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:userId", verifyToken, getUserHandler);

module.exports = router;
