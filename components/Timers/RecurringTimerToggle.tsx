import React from "react";
import { Text, View, Switch, TouchableOpacity } from "react-native";

interface RecurringTimerToggleProps {
  recurring: any;
  interval: "daily" | "weekly" | any;
  isDark: boolean;
  onChange: (field: "recurring" | "recurringInterval", value: any) => void;
}

export default function RecurringTimerToggle({
  recurring,
  interval,
  isDark,
  onChange,
}: RecurringTimerToggleProps) {
  return (
    <View>
      <View
        className={`flex-row items-center justify-between p-4 rounded-xl mb-4 ${
          isDark ? "bg-darkGray" : "bg-lightGray"
        }`}
      >
        <View>
          <Text
            className={`font-poppins-semibold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Recurring Timer
          </Text>
          <Text
            className={`text-xs font-poppins ${isDark ? "text-white" : "text-gray-600"}`}
          >
            Automatically restart when complete
          </Text>
        </View>
        <Switch
          value={recurring}
          onValueChange={(value) => onChange("recurring", value)}
          trackColor={{ false: "#767577", true: "#2E6F40" }}
          thumbColor={recurring ? "#fff" : "#f4f3f4"}
        />
      </View>

      {recurring && (
        <View className="mb-4">
          <Text
            className={`text-sm font-poppins-medium mb-2 ${isDark ? "text-lightGray" : "text-gray-700"}`}
          >
            Repeat
          </Text>
          <View className="flex-row space-x-4 gap-4">
            {["daily", "weekly"].map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => onChange("recurringInterval", option)}
                className={`flex-1 p-3 rounded-xl ${
                  interval === option
                    ? "bg-darkGreen"
                    : isDark
                      ? "bg-gray"
                      : "bg-lightGray"
                }`}
              >
                <Text
                  className={`text-center font-poppins-semibold ${
                    interval === option
                      ? "text-white"
                      : isDark
                        ? "text-mediumGray"
                        : "text-gray"
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
