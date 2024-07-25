const express = require("express");
const { InstructorModel } = require("../Models/Instructors");
const { CategoryModel } = require("../Models/Categories");

const router = express.Router();

router.get("/fetchInfluencers", async (req, res) => {
  try {
    const influencers = await InstructorModel.find({});
    return res.status(201).json({ influencers });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get(`/fetchInfluencer/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const influencer = await InstructorModel.findById(id);
    if (!influencer) {
      return res.status(404).json({ message: "Influencer not found" });
    }
    return res.status(200).json({ influencer });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/fetchCategories", async (req, res) => {
  try {
    const categories = await CategoryModel.find({});
    return res.status(201).json({ categories });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/fetchCategory", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(201).json({ category: {} });
    }
    const category = await CategoryModel.findOne({ name });
    if (category) {
      return res.status(200).json({ category });
    } else {
      return res.status(202).json({ category: {} });
    }
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/fetchSpecialInstructors", async (req, res) => {
  try {
    const { category } = req.body;
    const influencers = await InstructorModel.find({
      categories: { $in: [category] },
    });
    return res.status(200).json({ influencers });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
