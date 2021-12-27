const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

const Post = require("../models/Post");
const postController = require("../controller/postController");
const { authorization } = require("../controller/authController");

const router = express.Router();

//RETRIEVE
router.get("/", postController.getAllPost);
router.get("/:id", postController.getSinglePost);
router.get("/all/user-post/:id", postController.getAllUsersPost);

router.use(authorization);
router.post("/new/post", postController.creatPosts);
router.put("/:id", postController.updatePost);

module.exports = router;
