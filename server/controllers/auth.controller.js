import jwt from "jsonwebtoken";
import "dotenv/config";
import { google } from "googleapis";
import { oauth2Client } from "../lib/authClient.js";
import User from "../models/user.model.js";
import Event from "../models/event.model.js";

export const authUrl = (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    // prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/calendar.events",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  });

  // console.log("Auth URL:", authUrl);

  res.redirect(authUrl);
};

export const register = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);

    // console.log("Tokens:", tokens);

    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });

    const { data: userInfo } = await oauth2.userinfo.get();

    // console.log("User Info:", userInfo);

    let user = await User.findOne({ email: userInfo.email });

    if (!user) {
      user = new User({
        name: userInfo.name,
        email: userInfo.email,
        profilePic: userInfo.picture,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      });
    } else {
      user.accessToken = tokens.access_token;

      if (tokens.refresh_token) user.refreshToken = tokens.refresh_token;
    }

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      // sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // res.redirect(`${process.env.LOCAL_CLIENT_URL}/home`);

    res.redirect(`${process.env.PRODUCTION_CLIENT_URL}/home`);

    // res.json({ message: "Google Auth Successful!", user, tokens, jwt: token });
  } catch (error) {
    console.error("Error during OAuth:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ message: "User not found" });
    const events = await Event.find({ user: user._id });

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.log("Error fetching profile: ", error);
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      // sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      sameSite: "None",
    });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error logging out: ", error);
    res.status(500).json({ message: error.message });
  }
};
