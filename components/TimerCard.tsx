import React, { useMemo } from "react";
import { Timer } from "@/hooks/useTimers";
import { View, Text, TouchableOpacity, Dimensions, Alert } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { calculateProgress, formatTime } from "@/utils/timerHelpers";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

interface TimerCardProps {
  timer: Timer;
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  onReset: (id: string) => void;
  onDelete: (id: string) => void;
  onLongPress?: () => void;
  isActive?: boolean;
}

const { width } = Dimensions.get("window");

export default function TimerCard({
  timer,
  onStart,
  onPause,
  onResume,
  onReset,
  onDelete,
  onLongPress,
  isActive = false,
}: TimerCardProps) {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";
  const swipeableRef = React.useRef<Swipeable>(null);

  const progress = useMemo(() => calculateProgress(timer), [timer]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(isActive ? 1.05 : 1, {
            damping: 15,
            stiffness: 150,
          }),
        },
      ],
      opacity: withSpring(isActive ? 0.9 : 1),
    };
  });

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

  const renderRightActions = () => (
    <View className="flex-row">
      {timer.status !== "idle" && (
        <RectButton
          onPress={() => {
            onReset(timer.id);
            swipeableRef.current?.close();
          }}
          style={{
            backgroundColor: isDark ? "#374151" : "#E5E7EB",
            justifyContent: "center",
            alignItems: "center",
            width: 80,
            marginLeft: 8,
          }}
        >
          <Text className="text-2xl">↺</Text>
          <Text
            className={`text-xs font-poppins-medium mt-1 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Reset
          </Text>
        </RectButton>
      )}
      <RectButton
        onPress={() => {
          onDelete(timer.id);
          swipeableRef.current?.close();
        }}
        style={{
          backgroundColor: "#EF4444",
          justifyContent: "center",
          alignItems: "center",
          width: 80,
          marginLeft: 8,
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
        }}
      >
        <Text className="text-2xl">🗑️</Text>
        <Text className="text-xs font-poppins-medium mt-1 text-white">
          Delete
        </Text>
      </RectButton>
    </View>
  );

  const renderLeftActions = () => {
    if (timer.status === "running") {
      return (
        <RectButton
          onPress={() => {
            onPause(timer.id);
            swipeableRef.current?.close();
          }}
          style={{
            backgroundColor: "#F59E0B",
            justifyContent: "center",
            alignItems: "center",
            width: 80,
            marginRight: 8,
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
          }}
        >
          <Text className="text-2xl">⏸</Text>
          <Text className="text-xs font-poppins-medium mt-1 text-white">
            Pause
          </Text>
        </RectButton>
      );
    } else if (timer.status === "paused") {
      return (
        <RectButton
          onPress={() => {
            onResume(timer.id);
            swipeableRef.current?.close();
          }}
          style={{
            backgroundColor: "#10B981",
            justifyContent: "center",
            alignItems: "center",
            width: 80,
            marginRight: 8,
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
          }}
        >
          <Text className="text-2xl">▶</Text>
          <Text className="text-xs font-poppins-medium mt-1 text-white">
            Resume
          </Text>
        </RectButton>
      );
    }
    return null;
  };

  return (
    <Animated.View style={[{ marginBottom: 16 }, animatedStyle]}>
      <Swipeable
        ref={swipeableRef}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        overshootLeft={false}
        overshootRight={false}
      >
        <TouchableOpacity
          onLongPress={onLongPress}
          delayLongPress={200}
          activeOpacity={0.9}
        >
          <View
            className={`rounded-2xl overflow-hidden ${
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
                className={`${
                  timer.status === "completed"
                    ? "bg-blue-500"
                    : timer.status === "running"
                    ? "bg-green-500"
                    : timer.status === "paused"
                    ? "bg-yellow-500"
                    : "bg-gray-400"
                }`}
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
                    timer.status === "running"
                      ? "bg-green-500/20"
                      : timer.status === "paused"
                      ? "bg-yellow-500/20"
                      : timer.status === "completed"
                      ? "bg-blue-500/20"
                      : isDark
                      ? "bg-gray-700"
                      : "bg-gray-100"
                  }`}
                >
                  <Text
                    className={`text-xs font-poppins-medium ${
                      timer.status === "running"
                        ? "text-green-500"
                        : timer.status === "paused"
                        ? "text-yellow-500"
                        : timer.status === "completed"
                        ? "text-blue-500"
                        : isDark
                        ? "text-gray-300"
                        : "text-gray-600"
                    }`}
                  >
                    {timer.status.toUpperCase()}
                  </Text>
                </View>
              </View>
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

              <View className="flex-row space-x-2">
                <TouchableOpacity
                  onPress={handlePrimaryAction}
                  className={`flex-1 py-3 rounded-xl ${
                    timer.status === "running"
                      ? "bg-yellow-500"
                      : timer.status === "paused"
                      ? "bg-green-500"
                      : "bg-blue-500"
                  }`}
                >
                  <Text className="text-white text-center font-poppins-semibold text-base">
                    {getButtonText()}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                className={`text-xs text-center mt-3 ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Swipe for actions • Hold to reorder
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </Animated.View>
  );
}