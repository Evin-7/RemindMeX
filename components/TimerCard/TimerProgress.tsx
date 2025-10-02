import React from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { formatTime } from "@/utils/timerHelpers";

export default function TimerProgress({ timer, isDark, progress }: any) {
  const size = 110;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progressOffset = circumference - (progress / 100) * circumference;

  return (
    <View className="items-center my-3">
      <View className="relative items-center justify-center">
        <Svg width={size} height={size} style={{ position: "absolute" }}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={isDark ? "#374151" : "#E5E7EB"}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={
              timer.status === "running"
                ? "#2E6F40"
                : isDark
                  ? "#6B7280"
                  : "#9CA3AF"
            }
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>
        <View
          className="items-center"
          style={{ width: size, height: size, justifyContent: "center" }}
        >
          <Text
            className={`text-2xl font-poppins-bold ${timer.status === "completed" ? "text-darkGreen" : isDark ? "text-white" : "text-gray-900"}`}
          >
            {formatTime(timer.remainingTime)}
          </Text>
          <View
            className={`h-0.5 w-8 my-1 ${isDark ? "bg-gray-600" : "bg-gray-300"}`}
          />
          <Text
            className={`text-xs font-poppins-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            {formatTime(timer.duration)}
          </Text>
        </View>
      </View>
      <Text
        className={`text-xs font-poppins-semibold mt-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}
      >
        {progress.toFixed(0)}% Complete
      </Text>
    </View>
  );
}
