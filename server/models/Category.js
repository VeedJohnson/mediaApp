const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "a category must have a title 😡😡😒"],
      unique: [true, "category already exist"],
    },
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: { virtuals: true },
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
