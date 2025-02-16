import { create } from "zustand";
import axios from "../lib/api";
import { toast } from "react-hot-toast";

export const useEventStore = create((set) => ({
  events: [],
  loading: false,

  createEvent: async ({ title, startTime, endTime, description }) => {
    set({ loading: true });

    try {
      const response = await axios.post("/event/create", {
        title,
        startTime,
        endTime,
        description,
      });

      await useEventStore.getState().fetchEvents();

      // set((state) => ({
      //   events: [...state.events, response.data],
      //   loading: false,
      // }));

      toast.success("Meet scheduled successfully!");
    } catch (error) {
      console.log("Error creating event: ", error.message);
      toast.error("Failed to create event: ", error.message);
    }
  },

  updateEvent: async ({ eventId, title, startTime, endTime, description }) => {
    set({ loading: true });

    try {
      const response = await axios.put(`/event/${eventId}`, {
        eventId,
        title,
        startTime,
        endTime,
        description,
      });

      set((state) => ({
        events: state.events.map((event) =>
          event.id === eventId ? { ...event, ...response.data.event } : event
        ),
        loading: false,
      }));

      toast.success("Event updated successfully!");
      await useEventStore.getState().fetchEvents();
    } catch (error) {
      console.log("Error updating event: ", error.message);
      toast.error("Failed to update event: ", error.message);
    }
  },

  deleteEvent: async (eventId) => {
    set({ loading: true });

    try {
      await axios.delete(`/event/${eventId}`);

      set((state) => ({
        events: state.events.filter((event) => event.googleEventId !== eventId),
        loading: false,
      }));

      toast.success("Event deleted successfully!");
    } catch (error) {
      console.log("Error deleting event: ", error.message);
      toast.error("Failed to delete event: ", error.message);
    }
  },

  fetchEvents: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/event");
      // console.log("Fetched events: ", response.data);

      set({ events: response.data, loading: false });
    } catch (error) {
      console.log("Error fetching events: ", error.message);
      toast.error("Failed to fetch events: ", error.message);
    }
  },
}));
