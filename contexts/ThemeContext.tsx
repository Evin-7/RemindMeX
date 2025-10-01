import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";
import { saveTheme, loadTheme } from "@/utils/storage";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  effectiveTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useSystemColorScheme();
  const [theme, setThemeState] = useState<Theme>("system");

  useEffect(() => {
    initializeTheme();
  }, []);

  const initializeTheme = async () => {
    const savedTheme = await loadTheme();
    if (savedTheme) {
      setThemeState(savedTheme as Theme);
    }
  };

  const setTheme = async (newTheme: Theme) => {
    await saveTheme(newTheme);
    setThemeState(newTheme);
  };

  const effectiveTheme =
    theme === "system" ? systemColorScheme || "light" : theme;

  return (
    <ThemeContext.Provider value={{ theme, effectiveTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
