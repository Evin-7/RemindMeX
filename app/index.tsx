import "../global.css";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import Header from "@/components/Header";

export default function Index() {
  const { theme, effectiveTheme, setTheme } = useTheme();
  const isDark = effectiveTheme === "dark";

  return (
    <View className={`flex-1 ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
      <Header />

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View className="items-center justify-center mt-10">
          <Text
            className={`text-xl font-poppins-semibold mb-8 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Choose Theme
          </Text>

          <View className="w-full max-w-xs space-y-3">
            <TouchableOpacity
              onPress={() => setTheme("light")}
              className={`p-4 rounded-lg border-2 ${
                theme === "light"
                  ? "bg-blue-500 border-blue-500"
                  : isDark
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-300"
              }`}
            >
              <Text
                className={`text-center font-poppins-semibold text-lg ${
                  theme === "light"
                    ? "text-white"
                    : isDark
                      ? "text-gray-200"
                      : "text-gray-900"
                }`}
              >
                ☀️ Light Mode
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setTheme("dark")}
              className={`p-4 rounded-lg border-2 mt-3 ${
                theme === "dark"
                  ? "bg-blue-500 border-blue-500"
                  : isDark
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-300"
              }`}
            >
              <Text
                className={`text-center font-poppins-semibold text-lg ${
                  theme === "dark"
                    ? "text-white"
                    : isDark
                      ? "text-gray-200"
                      : "text-gray-900"
                }`}
              >
                🌙 Dark Mode
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setTheme("system")}
              className={`p-4 rounded-lg border-2 mt-3 ${
                theme === "system"
                  ? "bg-blue-500 border-blue-500"
                  : isDark
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-300"
              }`}
            >
              <Text
                className={`text-center font-poppins-semibold text-lg ${
                  theme === "system"
                    ? "text-white"
                    : isDark
                      ? "text-gray-200"
                      : "text-gray-900"
                }`}
              >
                📱 System Default
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            className={`mt-8 font-poppins-medium ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Current: {effectiveTheme === "dark" ? "Dark" : "Light"}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
