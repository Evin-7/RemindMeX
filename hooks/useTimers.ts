import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

export interface Timer {
  id: string;
  label: string;
  duration: number;
  remaining: number;
  isRunning: boolean;
  endTime?: number;
}

interface TimerStore {
  timers: Timer[];
  addTimer: (label: string, duration: number) => void;
  startTimer: (id: string) => void;
  pauseTimer: (id: string) => void;
  deleteTimer: (id: string) => void;
  tick: () => void;
  loadTimers: () => Promise<void>;
  saveTimers: () => Promise<void>;
}

export const useTimers = create<TimerStore>((set, get) => ({
  timers: [],

  addTimer: (label, duration) => {
    const newTimer: Timer = {
      id: Date.now().toString(),
      label,
      duration,
      remaining: duration,
      isRunning: false,
    };
    set((state) => ({ timers: [...state.timers, newTimer] }));
    get().saveTimers();
  },

  startTimer: (id) => {
    set((state) => ({
      timers: state.timers.map((t) =>
        t.id === id
          ? {
              ...t,
              isRunning: true,
              endTime: Date.now() + t.remaining * 1000,
            }
          : t,
      ),
    }));
    get().saveTimers();
  },

  pauseTimer: (id) => {
    set((state) => ({
      timers: state.timers.map((t) =>
        t.id === id ? { ...t, isRunning: false, endTime: undefined } : t,
      ),
    }));
    get().saveTimers();
  },

  deleteTimer: (id) => {
    set((state) => ({ timers: state.timers.filter((t) => t.id !== id) }));
    get().saveTimers();
  },

  tick: () => {
    const now = Date.now();
    set((state) => ({
      timers: state.timers.map((t) => {
        if (!t.isRunning || !t.endTime) return t;
        const remaining = Math.max(0, Math.floor((t.endTime - now) / 1000));
        if (remaining === 0 && t.remaining !== 0) {
          Notifications.scheduleNotificationAsync({
            content: {
              title: "Timer Ended",
              body: `${t.label} finished!`,
            },
            trigger: null,
          });
        }
        return { ...t, remaining, isRunning: remaining > 0 };
      }),
    }));
  },

  loadTimers: async () => {
    const json = await AsyncStorage.getItem("timers");
    if (json) set({ timers: JSON.parse(json) });
  },

  saveTimers: async () => {
    const timers = get().timers;
    await AsyncStorage.setItem("timers", JSON.stringify(timers));
  },
}));
