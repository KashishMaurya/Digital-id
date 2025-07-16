//cloudinary upload schema

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "careconnect_profiles",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 600, crop: "limit" }],
  },
});

const upload = multer({ storage });

module.exports = upload;
