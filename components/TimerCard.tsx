import React, { useMemo } from "react";
import { Timer } from "@/hooks/useTimers";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { calculateProgress, formatTime } from "@/utils/timerHelpers";

interface TimerCardProps {
  timer: Timer;
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  onReset: (id: string) => void;
  onDelete: (id: string) => void;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 32;

export default function TimerCard({
  timer,
  onStart,
  onPause,
  onResume,
  onReset,
  onDelete,
}: TimerCardProps) {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";

  const progress = useMemo(() => calculateProgress(timer), [timer]);
  const progressWidth = useMemo(
    () => `${Math.min(100, Math.max(0, progress))}%`,
    [progress],
  );

  const handlePrimaryAction = () => {
    if (timer.status === "idle" || timer.status === "completed") {
      if (timer.status === "completed") {
        onReset(timer.id);
        setTimeout(() => onStart(timer.id), 100);
      } else {
        onStart(timer.id);
      }
    } else if (timer.status === "running") {
      onPause(timer.id);
    } else if (timer.status === "paused") {
      onResume(timer.id);
    }
  };

  const getStatusColor = () => {
    switch (timer.status) {
      case "running":
        return "bg-green-500";
      case "paused":
        return "bg-yellow-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-gray-400";
    }
  };

  const getButtonText = () => {
    switch (timer.status) {
      case "running":
        return "⏸ Pause";
      case "paused":
        return "▶ Resume";
      case "completed":
        return "🔄 Restart";
      default:
        return "▶ Start";
    }
  };

  return (
    <View
      className={`mb-4 rounded-2xl overflow-hidden ${
        isDark ? "bg-gray-800" : "bg-white"
      }`}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }}
    >
      <View className={`h-2 ${isDark ? "bg-gray-700" : "bg-gray-200"}`}>
        <View
          className="bg-green-500"
          style={{ width: `${progress}%`, height: "100%" }}
        />
      </View>

      <View className="p-4">
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-1">
            <Text
              className={`text-xl font-poppins-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
              numberOfLines={2}
            >
              {timer.label}
            </Text>
            {timer.recurring?.enabled && (
              <Text
                className={`text-sm font-poppins-regular mt-1 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                🔁 {timer.recurring.interval}
              </Text>
            )}
          </View>
          <View
            className={`px-3 py-1 rounded-full ${
              isDark ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <Text
              className={`text-xs font-poppins-medium ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {timer.status.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Time Display */}
        <View className="items-center my-6">
          <Text
            className={`text-5xl font-poppins-bold ${
              timer.status === "completed"
                ? "text-blue-500"
                : isDark
                  ? "text-white"
                  : "text-gray-900"
            }`}
          >
            {formatTime(timer.remainingTime)}
          </Text>
          <Text
            className={`text-sm font-poppins-regular mt-2 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            of {formatTime(timer.duration)}
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row space-x-2">
          <TouchableOpacity
            onPress={handlePrimaryAction}
            className="flex-1 bg-blue-500 py-3 rounded-xl"
          >
            <Text className="text-white text-center font-poppins-semibold text-base">
              {getButtonText()}
            </Text>
          </TouchableOpacity>

          {timer.status !== "idle" && (
            <TouchableOpacity
              onPress={() => onReset(timer.id)}
              className={`px-4 py-3 rounded-xl ${
                isDark ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              <Text
                className={`font-poppins-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                ↺
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => onDelete(timer.id)}
            className="px-4 py-3 rounded-xl bg-red-500"
          >
            <Text className="text-white font-poppins-semibold">🗑</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
