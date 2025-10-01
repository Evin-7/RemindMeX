import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, effectiveTheme, setTheme } = useTheme();
  const isDark = effectiveTheme === "dark";

  return (
    <View className="flex-row items-center space-x-2">
      <TouchableOpacity
        onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={`p-2 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-200"}`}
      >
        <Text className="text-lg">{isDark ? "🌙" : "☀️"}</Text>
      </TouchableOpacity>
    </View>
  );
}
