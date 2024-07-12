require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./src/routes");
const { DEFAULT_PORT } = require("./src/constants");

const app = express();

const PORT = process.env.PORT || DEFAULT_PORT;
const mongo_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(cors());
app.use("/", routes);

mongoose
  .connect(mongo_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
