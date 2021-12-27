const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

// cloudinary configuration
cloudinary.config({
  cloud_name: "dp3caqqpi",
  api_key: "957914515492586",
  api_secret: "B4POC0dp9NncVGYwU1An2iYCzvY",
});

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    return callback(null, "uploads/pictures");
  },

  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    return callback(null, file.fieldname + "-" + uniqueSuffix + extname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, callback) => {
    let fileType = ["image/jpeg", "image/png"];
    if (!fileType.includes(file.mimetype)) {
      return callback(
        new Error("file type not supported upload png, jpeg or jpg"),
        false
      );
    }

    return callback(null, true);
  },
});

module.exports = upload;
