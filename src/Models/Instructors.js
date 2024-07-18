const mongoose = require("mongoose");

const courseBookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const InstructorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  title: { type: String, trim: true },
  description: { type: String, trim: true },
  courses: [courseBookSchema],
  books: [courseBookSchema],
  imageUrl: { type: String },
});

const InstructorModel = mongoose.model("instructors", InstructorSchema);
module.exports = { InstructorModel };
