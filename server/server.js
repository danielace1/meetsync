import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import eventRoutes from "./routes/event.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [process.env.LOCAL_CLIENT_URL, process.env.PRODUCTION_CLIENT_URL],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to MeetSync!");
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Failed to connect to the database.");
  }
};

startServer();
