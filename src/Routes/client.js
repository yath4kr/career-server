const express = require("express");
const { InstructorModel } = require("../Models/Instructors");

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

module.exports = router;
