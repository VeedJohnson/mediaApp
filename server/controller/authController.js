const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
const ApiError = require("../utils/errorHandler");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = async (req, res, next) => {
  try {
    const { body } = req;
    const userExist = await User.findOne({ email: body.email });
    if (userExist) {
      return next(body.email + " is taken");
    }

    const user = new User({
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      username: body.username,
      password: body.password,
      role: body?.role,
    });

    await user.save();
    user.password = undefined;
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

//authentication
exports.login = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return next(new ApiError("user does not exist", 404));
    }

    const comparePassword = await user.comparePassword(
      body.password,
      user.password
    );

    if (!comparePassword) {
      return next(new Error("incorrect credentials"));
    }
    user.password = undefined;
    let token = signToken(user._id);
    res.status(200).json({
      status: "success",
      data: user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.authorization = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new Error("please login to view this resource"));
    }

    let decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById({ _id: decoded.id });

    if (!currentUser) {
      return next(new Error("user does not exist"));
    }

    req.user = currentUser;
    return next();
  } catch (error) {
    return next(error);
  }
};



/**
 *
 * @param  {...string} roles a collection of restricted roles
 * @returns express response
 */
// exports.roles = (...roles) => {
//   return (req, res, next) => {
//     if (roles.includes(req.user.roles)) {
//       return next(new ApiError("forbidden", 403));
//     }
//     return next();
//   };
// };
