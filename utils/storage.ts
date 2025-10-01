import { Timer } from "@/hooks/useTimers";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TIMERS_KEY = "@timers";
const THEME_KEY = "@theme";

export async function saveTimers(timers: Timer[]): Promise<void> {
  try {
    await AsyncStorage.setItem(TIMERS_KEY, JSON.stringify(timers));
  } catch (error) {
    console.error("Error saving timers:", error);
    throw error;
  }
}

export async function loadTimers(): Promise<Timer[]> {
  try {
    const timersJson = await AsyncStorage.getItem(TIMERS_KEY);
    return timersJson ? JSON.parse(timersJson) : [];
  } catch (error) {
    console.error("Error loading timers:", error);
    return [];
  }
}

export async function clearAllTimers(): Promise<void> {
  try {
    await AsyncStorage.removeItem(TIMERS_KEY);
  } catch (error) {
    console.error("Error clearing timers:", error);
    throw error;
  }
}

export async function saveTheme(theme: string): Promise<void> {
  try {
    await AsyncStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error("Error saving theme:", error);
  }
}

export async function loadTheme(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(THEME_KEY);
  } catch (error) {
    console.error("Error loading theme:", error);
    return null;
  }
}
