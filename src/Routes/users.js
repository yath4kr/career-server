const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("Yo");
    res.json("Hello World");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
