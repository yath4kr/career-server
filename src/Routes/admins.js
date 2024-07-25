const express = require("express");
const { AdminModel } = require("../Models/Admins");
const { UserModel } = require("../Models/Users");
const { InstructorModel } = require("../Models/Instructors");
const jwt = require("jsonwebtoken");
const { CategoryModel } = require("../Models/Categories");
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

    const user = await AdminModel.findOne({ email });

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

router.get("/fetchInfluencers", verifyToken, async (req, res) => {
  try {
    const influencers = await InstructorModel.find({});
    return res.status(201).json({ influencers });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/addInfluencer", verifyToken, async (req, res) => {
  try {
    const data = req.body;
    const newInstructor = new InstructorModel(data);
    await newInstructor.save();
    return res.status(200).json({ message: "Added" });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/deleteInfluencer", verifyToken, async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Id required" });
    }
    const result = await InstructorModel.findByIdAndDelete({ _id: id });
    console.log(result);
    return res.status(200).json({ message: "Deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/updateInfluencer", verifyToken, async (req, res) => {
  try {
    const {
      _id,
      name,
      title,
      description,
      books,
      courses,
      imageUrl,
      categories,
    } = req.body;

    if (!_id) {
      return res.status(400).json({ message: "Id required" });
    }

    const updatedInfluencer = await InstructorModel.findByIdAndUpdate(
      _id,
      { name, title, description, books, courses, imageUrl, categories },
      { new: true }
    );

    if (!updatedInfluencer) {
      return res.status(404).json({ message: "Influencer not found" });
    }

    return res.status(200).json({
      message: "Influencer updated successfully",
      influencer: updatedInfluencer,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/addCategory", verifyToken, async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCategory = new CategoryModel({ name, description });
    await newCategory.save();
    return res.status(200).json({ message: "Added" });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/deleteCategory", verifyToken, async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Id required" });
    }
    const result = await CategoryModel.findByIdAndDelete({ _id: id });
    return res.status(200).json({ message: "Deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
