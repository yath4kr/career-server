const { create, getByEmail, getByUsername } = require("../../Models/Users");
const { validateInputFields } = require("../../validators/index");
const { postUserSchema } = require("../../validators/users");

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

module.exports = { postUserHandler };
