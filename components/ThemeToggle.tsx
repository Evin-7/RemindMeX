import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react-native";

export default function ThemeToggle() {
  const { theme, effectiveTheme, setTheme } = useTheme();
  const isDark = effectiveTheme === "dark";

  return (
    <View className="flex-row items-center">
      <TouchableOpacity
        onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={`p-2 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-200"}`}
      >
        {isDark ? (
          <Moon size={22} color="white" strokeWidth={2} />
        ) : (
          <Sun size={22} color="black" strokeWidth={2} />
        )}
      </TouchableOpacity>
    </View>
  );
}
