const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: ture },
});

export const UserModel = mongoose.model(users, UserSchema);
