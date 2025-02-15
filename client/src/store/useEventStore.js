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

      set((state) => ({
        events: [...state.events, response.data],
        loading: false,
      }));

      toast.success("Meet scheduled successfully!");
    } catch (error) {
      console.log("Error creating event: ", error.message);
      toast.error("Failed to create event: ", error.message);
    }
  },

  fetchEvents: async () => {
    set({ loading: true });

    try {
      const response = await axios.get("/event");
      console.log("Fetched events: ", response.data);

      set({ events: response.data, loading: false });
    } catch (error) {
      console.log("Error fetching events: ", error.message);
      toast.error("Failed to fetch events: ", error.message);
    }
  },
}));
