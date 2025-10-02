import React from "react";
import { Text, TextInput, View } from "react-native";

interface TimerDurationInputsProps {
  hours: number;
  minutes: number;
  seconds: number;
  isDark: boolean;
  onChange: (field: "hours" | "minutes" | "seconds", value: number) => void;
}

export default function TimerDurationInputs({
  hours,
  minutes,
  seconds,
  isDark,
  onChange,
}: TimerDurationInputsProps) {
  const inputClass = `p-3 rounded-xl text-center font-poppins-semibold text-lg ${
    isDark ? "bg-white text-darkGray" : "bg-lightGray text-gray-900"
  }`;

  return (
    <View>
      <Text
        className={`text-sm font-poppins-medium mb-3 ${
          isDark ? "text-white" : "text-gray-700"
        }`}
      >
        Duration
      </Text>
      <View className="flex-row justify-between mb-6">
        <View className="flex-1 mr-2">
          <Text
            className={`text-xs mb-1 ${isDark ? "text-white" : "text-gray-600"}`}
          >
            Hours
          </Text>
          <TextInput
            value={hours.toString()}
            onChangeText={(text) => onChange("hours", parseInt(text) || 0)}
            keyboardType="number-pad"
            className={inputClass}
          />
        </View>
        <View className="flex-1 mx-1">
          <Text
            className={`text-xs mb-1 ${isDark ? "text-white" : "text-gray-600"}`}
          >
            Minutes
          </Text>
          <TextInput
            value={minutes.toString()}
            onChangeText={(text) =>
              onChange("minutes", Math.min(59, parseInt(text) || 0))
            }
            keyboardType="number-pad"
            className={inputClass}
          />
        </View>
        <View className="flex-1 ml-2">
          <Text
            className={`text-xs mb-1 ${isDark ? "text-white" : "text-gray-600"}`}
          >
            Seconds
          </Text>
          <TextInput
            value={seconds.toString()}
            onChangeText={(text) =>
              onChange("seconds", Math.min(59, parseInt(text) || 0))
            }
            keyboardType="number-pad"
            className={inputClass}
          />
        </View>
      </View>
    </View>
  );
}
