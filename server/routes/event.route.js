import express from "express";
import {
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent,
} from "../controllers/event.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getEvents);
router.post("/create", protectRoute, createEvent);
router.put("/:eventId", protectRoute, updateEvent);
router.delete("/delete/:eventId", protectRoute, deleteEvent);

export default router;
