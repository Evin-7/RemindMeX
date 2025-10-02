import { View, Text, TextInput } from "react-native";

interface DurationPickerProps {
  hours: number;
  minutes: number;
  seconds: number;
  onHoursChange: (value: number) => void;
  onMinutesChange: (value: number) => void;
  onSecondsChange: (value: number) => void;
  isDark: boolean;
}

export default function DurationPicker({
  hours,
  minutes,
  seconds,
  onHoursChange,
  onMinutesChange,
  onSecondsChange,
  isDark,
}: DurationPickerProps) {
  return (
    <>
      <Text
        className={`text-sm font-poppins-medium mb-3 ${
          isDark ? "text-gray-300" : "text-gray-700"
        }`}
      >
        Duration
      </Text>
      <View className="flex-row justify-between mb-6">
        <View className="flex-1 mr-2">
          <Text
            className={`text-xs mb-1 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Hours
          </Text>
          <TextInput
            value={hours.toString()}
            onChangeText={(text) => onHoursChange(parseInt(text) || 0)}
            keyboardType="number-pad"
            className={`p-3 rounded-xl text-center font-poppins-semibold text-lg ${
              isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
            }`}
          />
        </View>

        <View className="flex-1 mx-1">
          <Text
            className={`text-xs mb-1 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Minutes
          </Text>
          <TextInput
            value={minutes.toString()}
            onChangeText={(text) =>
              onMinutesChange(Math.min(59, parseInt(text) || 0))
            }
            keyboardType="number-pad"
            className={`p-3 rounded-xl text-center font-poppins-semibold text-lg ${
              isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
            }`}
          />
        </View>

        <View className="flex-1 ml-2">
          <Text
            className={`text-xs mb-1 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Seconds
          </Text>
          <TextInput
            value={seconds.toString()}
            onChangeText={(text) =>
              onSecondsChange(Math.min(59, parseInt(text) || 0))
            }
            keyboardType="number-pad"
            className={`p-3 rounded-xl text-center font-poppins-semibold text-lg ${
              isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
            }`}
          />
        </View>
      </View>
    </>
  );
}
