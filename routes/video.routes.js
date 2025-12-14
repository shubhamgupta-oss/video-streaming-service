import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { auth, role } from '../middlewares/auth.middleware.js';
import {
  uploadVideo,
  getVideos,
  getVideo,
} from "../controllers/video.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/",
  [body("title").notEmpty().trim()],
  auth,
  role("ADMIN"),
  upload.single("video"),
  uploadVideo,
);
router.get("/", auth, getVideos);
router.get("/:id", auth, getVideo);

export default router;
