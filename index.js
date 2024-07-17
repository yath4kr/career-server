require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./src/Routes/users");
const adminRouter = require("./src/Routes/admins");

const app = express();
const port = 5000;

const mongo_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/admins", adminRouter);

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
