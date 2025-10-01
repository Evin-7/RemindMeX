import { View, Text, Image } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";

  return (
    <View
      className={`w-full pt-[55px] px-5 py-4 ${
        isDark ? "bg-darkGrey" : "bg-darkGreen"
      }`}
    >
      <View className="flex-row items-center justify-between ">
        <View className="flex-row items-center">
          <Image
            source={require("@/assets/icons/MainLogo.png")}
            className="w-10 h-10 mr-2"
            resizeMode="contain"
          />
          <Text className="text-white text-xl font-poppins-bold">
            RemindMeX
          </Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-white text-sm mr-2 font-poppins">
            Change Theme
          </Text>
          <ThemeToggle />
        </View>
      </View>
    </View>
  );
}
