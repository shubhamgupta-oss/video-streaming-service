import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
    body("role").optional().isIn(["USER", "ADMIN"]),
  ],
  register,
);

router.post(
  "/login",
  [body("email").isEmail().normalizeEmail(), body("password").exists()],
  login,
);

export default router;
