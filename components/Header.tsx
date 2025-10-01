import { View, Text } from "react-native";

export default function Header() {
  return (
    <View className="w-full bg-brand py-10 ">
      <Text className="text-white pt-[10px]  text-2xl font-poppins-bold text-center">
        RemindMeX Timers
      </Text>
    </View>
  );
}
