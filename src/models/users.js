const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: Number, required: false },
});

// We have used function signature because the arrow function does not have this
UserSchema.methods.generateAuthToken = async function () {
  const secret = process.env.JWT_SECRET;

  const payload = {
    id: this._id,
    name: this.name,
    username: this.username,
  };

  return await jwt.sign(payload, secret);
};

const UserModel = mongoose.model("users", UserSchema);

const create = async (user) => {
  const newUser = new UserModel({
    name: user.name,
    username: user.username,
    password: user.password,
    email: user.email,
    mobile: user.mobile,
  });

  await newUser.save();
};

const getById = async (userId) => {
  try {
    const userRecord = await UserModel.findById(userId);
    return userRecord;
  } catch (error) {
    // As when no record found then findById throws error so in that case we will return null
    return null;
  }
};

const getByEmail = (email) => {
  return UserModel.findOne({ email });
};

const getByUsername = (username) => {
  return UserModel.findOne({ username });
};

module.exports = { UserModel, create, getByEmail, getById, getByUsername };
