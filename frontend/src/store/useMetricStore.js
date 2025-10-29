import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js";

export const useMetricsStore = create((set, get) => ({
  metrics: null,
  isLoading: false,
  error: null,

  fetchMetrics: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/metrics");
      set({
        metrics: response.data.data,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching metrics:", error);
      set({
        error: error.response?.data?.message || "Failed to fetch metrics",
        isLoading: false,
      });
    }
  },

  clearMetrics: () => {
    set({ metrics: null, error: null });
  },
}));

