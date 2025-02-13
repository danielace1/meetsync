import { google } from "googleapis";
import { oauth2Client } from "../lib/authClient.js";
import Event from "../models/event.model.js";

const calendar = google.calendar({ version: "v3", auth: oauth2Client });

export const createEvent = async (req, res) => {
  try {
    const user = req.user;
    const { summary, description, startTime, endTime, location } = req.body;

    if (!user) return res.status(404).json({ message: "User not found" });

    const event = {
      summary,
      description,
      start: { dateTime: startTime, timeZone: "Asia/Kolkata" },
      end: { dateTime: endTime, timeZone: "Asia/Kolkata" },
      location,
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    const googleEventId = response.data.id;

    // console.log("RESPONSE :", response.data);

    const newEvent = new Event({
      user: user._id,
      googleEventId,
      summary,
      description,
      startTime,
      endTime,
      location,
    });

    await newEvent.save();

    res.status(200).json({ message: "Event created", event: newEvent });
  } catch (error) {
    console.log("Error creating event: ", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const user = req.user;
    const { eventId } = req.params;
    const { summary, description, startTime, endTime } = req.body;

    if (!user) return res.status(404).json({ message: "User not found" });

    const event = await Event.findOne({ googleEventId: eventId });
    if (!event)
      return res.status(404).json({ message: "Event not found in DB" });

    const { googleEventId } = event;
    if (!googleEventId)
      return res
        .status(404)
        .json({ message: "Event ID missing in Google Calendar" });

    // update in Google Calendar
    await calendar.events.update({
      calendarId: "primary",
      eventId: googleEventId,
      resource: {
        summary,
        description,
        start: { dateTime: startTime, timeZone: "Asia/Kolkata" },
        end: { dateTime: endTime, timeZone: "Asia/Kolkata" },
      },
    });

    // update in DB
    const updatedEvent = await Event.findOneAndUpdate(
      { googleEventId: eventId },
      { summary, description, startTime, endTime },
      { new: true }
    );

    res.json({ message: "Event updated", updatedEvent });
  } catch (error) {
    console.error("Error updating event: ", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const user = req.user;

    if (!user) return res.status(404).json({ message: "User not found" });

    const event = await Event.findOne({ googleEventId: eventId });
    if (!event)
      return res.status(404).json({ message: "Event not found in DB" });

    // Delete from Google Calendar
    await calendar.events.delete({ calendarId: "primary", eventId });

    // Delete from DB
    await Event.findOneAndDelete({ googleEventId: eventId });

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event: ", error);
    res.status(500).json({ message: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const user = req.user;
    const calendarId = req.query.calendar ?? "primary";

    if (!user) return res.status(404).json({ message: "User not found" });

    const googleEventsResponse = await calendar.events.list({
      calendarId,
      timeMin: new Date().toISOString(),
      maxResults: 15,
      orderBy: "startTime",
      singleEvents: true,
    });

    // fetching from google calendar
    const googleEvents = googleEventsResponse.data.items || [];

    // fetching from DB
    const dbEvents = await Event.find({ user: user._id });

    // showing if both events are matching
    const matchEvents = googleEvents.filter((gEvent) =>
      dbEvents.some((dbEvent) => dbEvent.googleEventId === gEvent.id)
    );

    res.status(200).json(matchEvents);
  } catch (error) {
    console.error("Error fetching events: ", error);
    res.status(500).json({ message: error.message });
  }
};
