import { create } from "zustand";
import axios from "../lib/api";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  fetchingUser: true,

  signup: async () => {
    set({ loading: true });

    try {
      window.location.href = import.meta.env.VITE_AUTH_URL;
    } catch (error) {
      console.log("Error in signin/signup :", error);
    }
  },

  fetchUser: async () => {
    set({ fetchingUser: true });
    try {
      const response = await axios.get("/auth/profile");

      set({ user: response.data.user, fetchingUser: false });
    } catch (error) {
      console.error("Failed to fetch user:", error);
      set({ user: null, fetchingUser: false });
    }
  },
}));
