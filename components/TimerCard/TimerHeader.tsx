import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { RefreshCw, Trash2 } from "lucide-react-native";

export default function TimerHeader({ timer, isDark, onDelete }: any) {
  const getStatusColor = () => {
    switch (timer.status) {
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

  return (
    <View className="flex-row justify-between items-start mb-2">
      <View className="flex-1 pr-2">
        <Text
          className={`text-base font-poppins-semibold ${isDark ? "text-white" : "text-gray-900"}`}
          numberOfLines={2}
        >
          {timer.label}
        </Text>
        {timer.recurring?.enabled && (
          <View className="flex-row items-center mt-1">
            <RefreshCw size={10} color={isDark ? "#9CA3AF" : "#6B7280"} />
            <Text
              className={`text-xs font-poppins-medium ml-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              {timer.recurring.interval}
            </Text>
          </View>
        )}
      </View>
      <View className="flex-row items-center gap-2">
        <View
          className="px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${getStatusColor()}20` }}
        >
          <Text
            className="text-xs font-poppins-bold"
            style={{ color: getStatusColor() }}
          >
            {timer.status.toUpperCase()}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => onDelete(timer.id)}
          className={`p-1.5 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"}`}
        >
          <Trash2 size={14} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
