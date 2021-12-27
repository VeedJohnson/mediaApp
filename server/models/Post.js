const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "make you put title na 😡😡"],
      trim: true,
    },

    image: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: [true, "please put description na abeg"],
      trim: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "a post must belong to a user"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "a post must belong to a category"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
