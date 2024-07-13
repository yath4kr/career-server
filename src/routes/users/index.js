const express = require("express");

const {
  postUserHandler,
  getUserHandler,
  postAuthHandler,
} = require("../../controllers/users");
const { verifyToken, routeLogger } = require("../../middlewares");
const { AuthServices } = require("../../lib");
require("dotenv").config();

const router = express.Router();

router.use(routeLogger);

router.post("/register", postUserHandler);

router.post("/login", postAuthHandler);

router.get("/:userId", verifyToken, getUserHandler);

module.exports = router;
