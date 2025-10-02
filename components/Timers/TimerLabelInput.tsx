import React from "react";
import { Text, TextInput, View } from "react-native";

interface TimerLabelInputProps {
  value: any;
  onChange: (text: string) => void;
}

export default function TimerLabelInput({
  value,
  onChange,
}: TimerLabelInputProps) {
  return (
    <View>
      <Text className="text-sm font-poppins-medium mb-2 text-gray-700 dark:text-gray-300">
        Label
      </Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="e.g., Meditation, Workout, Cooking"
        placeholderTextColor="#9CA3AF"
        className="p-4 rounded-xl mb-4 font-poppins bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
      />
    </View>
  );
}
