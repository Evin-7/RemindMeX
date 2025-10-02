import React from "react";
import { View, Text } from "react-native";
import { Timer } from "@/hooks/useTimers";

const getStatusColor = (status: Timer["status"], isDark: boolean) => {
  switch (status) {
    case "running":
      return "#2E6F40";
    case "paused":
      return "#F59E0B";
    case "completed":
      return "#2E6F40";
    default:
      return isDark ? "#6B7280" : "#9CA3AF";
  }
};

interface StatusPillProps {
  status: Timer["status"];
  isDark: boolean;
}

export const StatusPill: React.FC<StatusPillProps> = ({ status, isDark }) => {
  const color = getStatusColor(status, isDark);
  return (
    <View
      className="px-2 py-0.5 rounded-full"
      style={{ backgroundColor: `${color}20` }}
    >
      <Text className="text-xs font-poppins-bold" style={{ color }}>
        {status.toUpperCase()}
      </Text>
    </View>
  );
};

export { getStatusColor };
