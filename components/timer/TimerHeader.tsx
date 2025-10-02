import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Timer } from "@/hooks/useTimers";
import { RefreshCw, Trash2 } from "lucide-react-native";
import { StatusPill } from "./StatusPill";

interface TimerHeaderProps {
  timer: Timer;
  isDark: boolean;
  onDelete: (id: string) => void;
}

export const TimerHeader: React.FC<TimerHeaderProps> = ({
  timer,
  isDark,
  onDelete,
}) => {
  return (
    <View className="flex-row justify-between items-start mb-2">
      <View className="flex-1 pr-2">
        <Text
          className={`text-base font-poppins-semibold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
          numberOfLines={2}
        >
          {timer.label}
        </Text>
        {timer.recurring?.enabled && (
          <View className="flex-row items-center mt-1">
            <RefreshCw size={10} color={isDark ? "#9CA3AF" : "#6B7280"} />
            <Text
              className={`text-xs font-poppins-medium ml-1 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {timer.recurring.interval}
            </Text>
          </View>
        )}
      </View>

      <View className="flex-row items-center gap-2">
        <StatusPill status={timer.status} isDark={isDark} />
        <TouchableOpacity
          onPress={() => onDelete(timer.id)}
          className={`p-1.5 rounded-lg ${
            isDark ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <Trash2 size={14} color="#FF0000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
