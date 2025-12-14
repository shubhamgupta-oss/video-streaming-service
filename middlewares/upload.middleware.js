import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("Cloudinary Configured:", {
  cloud_name: process?.env?.CLOUDINARY_CLOUD_NAME,
  api_key: process?.env?.CLOUDINARY_API_KEY,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "videos",
    resource_type: "video",
  },
});

export default multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 500 }, 
});
