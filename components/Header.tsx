import { View, Text } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

export default function Header() {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";

  return (
    <View className={`w-full py-10 ${isDark ? "bg-gray-800" : "bg-brand"}`}>
      <Text className="text-white pt-[10px] text-2xl font-poppins-bold text-center">
        RemindMeX Timers
      </Text>
    </View>
  );
}
