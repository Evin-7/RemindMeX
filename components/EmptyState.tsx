import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Clock } from "lucide-react-native";

interface EmptyStateProps {
  permissionStatus: string | null;
  onEnableNotifications?: () => void;
  isDark?: boolean;
}

export default function EmptyState({
  permissionStatus,
  onEnableNotifications,
  isDark = false,
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <Clock
        size={60}
        color={isDark ? "#D1D5DB" : "#4B5563"}
        className="mb-4"
      />
      <Text
        className={`text-2xl font-poppins-bold text-center mb-2 ${
          isDark ? "text-white" : "text-darkGray"
        }`}
      >
        No Timers Yet
      </Text>
      <Text
        className={`text-center font-poppins ${
          isDark ? "text-gray-300" : "text-darkGray"
        }`}
      >
        Create your first timer to get started
      </Text>

      {permissionStatus !== "granted" && onEnableNotifications && (
        <TouchableOpacity
          onPress={onEnableNotifications}
          className="mt-4 px-4 py-2 bg-yellow-500 rounded-lg"
        >
          <Text className="text-white font-poppins-medium">
            Enable Notifications
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
