import express from "express";
import {
  authUrl,
  getProfile,
  logout,
  register,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// Google OAuth Login
router.get("/profile", protectRoute, getProfile);
router.get("/google", authUrl);
router.get("/google/callback", register);
router.post("/logout", logout);

export default router;
