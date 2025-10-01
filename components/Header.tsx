import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";

  return (
    <View
      className={`w-full py-4 px-4 ${isDark ? "bg-gray-800" : "bg-blue-500"}`}
    >
      <View className="flex-row items-center justify-between pt-10">
        <Text className="text-white text-2xl font-poppins-bold">
          ⏰ RemindMeX
        </Text>
        <ThemeToggle />
      </View>
    </View>
  );
}
