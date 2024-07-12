const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: Number, required: false },
});

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

const getByEmail = (email) => {
  return UserModel.findOne({ email });
};

const getByUsername = (username) => {
  return UserModel.findOne({ username });
};

module.exports = { UserModel, create, getByEmail, getByUsername };
