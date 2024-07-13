const _ = require("lodash");

const {
  create,
  getByEmail,
  getById,
  getByUsername,
} = require("../../models/users");
const { validateInputFields } = require("../../validators/index");
const { postAuthSchema, postUserSchema } = require("../../validators/users");

const postUserHandler = async (req, res) => {
  try {
    const error = validateInputFields(postUserSchema, req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const { name, username, password, mobile, email } = req.body;

    let user = await getByUsername(username);
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }

    user = await getByEmail(email);
    if (user) {
      return res.status(409).json({ message: "Email already exists" });
    }

    await create({
      name,
      username,
      password,
      email,
      mobile,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const postAuthHandler = async (req, res) => {
  try {
    const error = validateInputFields(postAuthSchema, req.body);

    if (error) {
      return res.status(200).json({ message: error });
    }

    const { id, password } = req.body;

    let user = await getByUsername(id);
    if (!user) {
      user = await getByEmail(id);
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
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserHandler = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await getById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ message: `No record found for user with id: ${userId}` });
    }

    //TODO: _.omit can be used, but for some strange reason it is not working for me
    const filteredResponse = _.pick(user, [
      "_id",
      "name",
      "email",
      "username",
      "mobile",
    ]);

    return res.status(201).json({ user: filteredResponse });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { getUserHandler, postAuthHandler, postUserHandler };
