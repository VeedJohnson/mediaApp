const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: [true, "firstname is required"],
    },
    lastname: {
      type: String,
      trim: true,
      required: [true, "lastname is required"],
    },
    username: {
      type: String,
      trim: true,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      trim: true,
      unique: [true, "email has been taken"],
      required: [true, "email is required"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profile_img: String,
    password: {
      type: String,
      required: [true, "password is required"],
      min: 6,
      max: 12,
    },
    passwordChangedAt: Date,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: { virtuals: true },
  }
);

//pre save middleware
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

/**
 *
 * @param {string} inputPassword: req.body password
 * @param {string} userPassword: user instance password
 * @returns {boolean} true if password is correct, false if not
 */
userSchema.methods.comparePassword = async function (
  inputPassword,
  userPassword
) {
  return bcrypt.compare(inputPassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
