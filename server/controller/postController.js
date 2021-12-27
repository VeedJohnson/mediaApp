const Post = require("../models/Post");
const upload = require("../utils/upload");
const ApiError = require("../utils/errorHandler");
const { request } = require("express");

//create post
exports.creatPosts = (req, res, next) => {
  const ImageFile = upload.single("image");
  ImageFile(req, res, async (err) => {
    try {
      const { file, body } = req;
      if (err) {
        return next(new ApiError(err, 400));
      }

      if (!file) {
        return next(new ApiError("upload an image", 400));
      }

      const data = { image: `uploads/${file.filename}`, ...req.body };
      const post = await Post.create(data);
      res.status(201).json({
        status: "success",
        message: post,
      });
    } catch (error) {
      return next(error);
    }
  });
  // const post = await Post.create({});
};

//read posts
exports.getAllPost = async (req, res, next) => {
  try {
    let posts = await Post.find()
      .populate({
        path: "user",
        select: "username _id",
      })
      .populate({ path: "category", select: "_id title" })
      .sort({ updatedAt: -1 });

    if (posts.length === 0) {
      return next(new ApiError("no data found", 404));
    }
    return res.status(200).json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    return next(error);
  }
};
exports.getAllUsersPost = async (req, res, next) => {
  try {
    let posts = await Post.find({ user: req.params.id });
    return res.status(200).json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSinglePost = async (req, res, next) => {
  try {
    let { id } = req.params;
    let post = await Post.findById({ _id: id })
      .populate({
        path: "user",
        select: "username _id",
      })
      .populate({ path: "category", select: "_id title" });

    return res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    return next(error);
  }
};

// //update posts
// exports.updatePost = async (req, res, next) => {
//   let { title, description } = req.body;
//   console.log(req.body);
//   let { id } = req.params;
//   try {
//     let post = await Post.findByIdAndUpdate(
//       { _id: id },
//       {
//         title: title,
//         description: description,
//       }
//     );
//     return res.status(200).json({
//       status: "success",
//       data: post,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

//update posts
exports.updatePost = async (req, res, next) => {
  let { id } = req.params;

  const { title, description } = req.body;
  try {
    let post = await Post.findByIdAndUpdate(
      { _id: id },
      {
        title: title,
        description: description,
      }
    );
    return res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(error);
  }
}; 

exports.logMethod = (req, res, next) => {
  // .. //
  console.log(req.method, "/", req.get("host") + "/" + req.url);
  next();
};
