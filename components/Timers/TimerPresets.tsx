import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface TimerPresetsProps {
  isDark: boolean;
  onSelect: (preset: {
    label: string;
    hours?: number;
    minutes?: number;
  }) => void;
}

const presets = [
  { label: "1 min", minutes: 1 },
  { label: "5 min", minutes: 5 },
  { label: "10 min", minutes: 10 },
  { label: "15 min", minutes: 15 },
  { label: "30 min", minutes: 30 },
  { label: "1 hour", hours: 1 },
];

export default function TimerPresets({ isDark, onSelect }: TimerPresetsProps) {
  return (
    <View>
      <Text
        className={`text-sm font-poppins-medium mb-3 ${isDark ? "text-white" : "text-gray-700"}`}
      >
        Quick Presets
      </Text>
      <View className="flex-row flex-wrap mb-6">
        {presets.map((preset) => (
          <TouchableOpacity
            key={preset.label}
            onPress={() => onSelect(preset)}
            className={`px-4 py-2 rounded-full mr-2 mb-2 ${
              isDark ? "bg-white" : "bg-lightGray"
            }`}
          >
            <Text
              className={`font-poppins-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
            >
              {preset.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
