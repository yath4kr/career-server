require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 5000;

const mongo_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(cors());

mongoose
  .connect(mongo_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
