import { View, Text } from "react-native";

interface LoadingScreenProps {
  isDark: boolean;
}

export default function LoadingScreen({ isDark }: LoadingScreenProps) {
  return (
    <View
      className={`flex-1 items-center justify-center ${
        isDark ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <Text
        className={`text-lg font-poppins-medium ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Loading timers...
      </Text>
    </View>
  );
}
