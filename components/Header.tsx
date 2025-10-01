import { View, Text, TouchableOpacity, Image } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";

  return (
    <View
      className={`w-full py-4 px-4 ${isDark ? "bg-darkGrey" : "bg-lightGreen"}`}
    >
      <View className="flex-row items-center justify-between pt-[30px] ">
        <Image
          source={require("@/assets/icons/MainLogo.png")}
          className="w-[120px] h-[80px] pt-[10px] -mb-[20px]"
          resizeMode="contain"
        />
        <ThemeToggle />
      </View>
    </View>
  );
}
