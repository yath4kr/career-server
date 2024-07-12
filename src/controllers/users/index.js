const { UserModel } = require("../../Models/Users");
const { validateInputFields } = require("../../validators/index");
const { postUserSchema } = require("../../validators/users");

const postUserHandler = async (req, res) => {
  try {
    const error = validateInputFields(postUserSchema, req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const { name, username, password, mobile, email } = req.body;

    const userNameCheck = await UserModel.findOne({ username });
    if (userNameCheck) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const emailCheck = await UserModel.findOne({ email });
    if (emailCheck) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const newUser = new UserModel({
      name,
      username,
      password,
      email,
      mobile,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { postUserHandler };
