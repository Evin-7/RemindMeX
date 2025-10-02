import React from "react";
import { Text, TextInput, View } from "react-native";

interface TimerLabelInputProps {
  value: any;
  onChange: (text: string) => void;
  isDark: boolean;
}

export default function TimerLabelInput({
  value,
  onChange,
  isDark,
}: TimerLabelInputProps) {
  return (
    <View className="">
      <Text className="text-sm text-darkGray isDark:text-white  font-poppins-medium mb-2 text-gray-700 dark:text-gray-300">
        Label
      </Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="e.g., Meditation, Workout, Cooking h"
        placeholderTextColor="#9CA3AF"
        className="p-4 rounded-xl mb-4 font-poppins bg-lightGray isDark:bg-white text-gray-900 text-darkGray isDark:text-white"
      />
    </View>
  );
}
