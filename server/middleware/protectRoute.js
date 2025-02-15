import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { oauth2Client } from "../lib/authClient.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt || req.headers.authorization;
    if (!token) return res.status(401).json({ error: "Token required" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ error: "Invalid token" });

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.accessToken || !user.refreshToken) {
      return res
        .status(401)
        .json({ error: "Session expired, please log in again" });
    }

    oauth2Client.setCredentials({
      access_token: user.accessToken,
      refresh_token: user.refreshToken,
    });

    oauth2Client.on("tokens", async (tokens) => {
      if (tokens.access_token) {
        user.accessToken = tokens.access_token;
        await user.save();
      }
    });

    req.user = user;
    req.auth = oauth2Client;
    next();
  } catch (error) {
    console.error("Error in middleware:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
};
