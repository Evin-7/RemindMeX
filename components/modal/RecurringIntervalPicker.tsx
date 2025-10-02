import { View, Text, TouchableOpacity } from "react-native";

interface RecurringIntervalPickerProps {
  value: "daily" | "weekly" | any;
  onChange: (value: "daily" | "weekly") => void;
  isDark: boolean;
}

export default function RecurringIntervalPicker({
  value,
  onChange,
  isDark,
}: RecurringIntervalPickerProps) {
  return (
    <View className="mb-4">
      <Text
        className={`text-sm font-poppins-medium mb-2 ${
          isDark ? "text-gray-300" : "text-gray-700"
        }`}
      >
        Repeat
      </Text>
      <View className="flex-row space-x-2">
        <TouchableOpacity
          onPress={() => onChange("daily")}
          className={`flex-1 p-3 rounded-xl ${
            value === "daily"
              ? "bg-blue-500"
              : isDark
                ? "bg-gray-800"
                : "bg-gray-100"
          }`}
        >
          <Text
            className={`text-center font-poppins-semibold ${
              value === "daily"
                ? "text-white"
                : isDark
                  ? "text-gray-300"
                  : "text-gray-700"
            }`}
          >
            Daily
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onChange("weekly")}
          className={`flex-1 p-3 rounded-xl ${
            value === "weekly"
              ? "bg-blue-500"
              : isDark
                ? "bg-gray-800"
                : "bg-gray-100"
          }`}
        >
          <Text
            className={`text-center font-poppins-semibold ${
              value === "weekly"
                ? "text-white"
                : isDark
                  ? "text-gray-300"
                  : "text-gray-700"
            }`}
          >
            Weekly
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
