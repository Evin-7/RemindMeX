import React from "react";
import { TouchableOpacity, Text, ViewStyle } from "react-native";

interface FloatingAddButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

export default function FloatingAddButton({
  onPress,
  style,
}: FloatingAddButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute bottom-6 right-6 left-6 bg-darkGreen p-5 rounded-2xl flex-row items-center justify-center shadow-lg shadow-blue-500/60"
      style={style}
    >
      <Text className="text-white text-center font-poppins-bold text-lg">
        + Add Timer
      </Text>
    </TouchableOpacity>
  );
}
