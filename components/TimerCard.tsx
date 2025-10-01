import React, { useMemo } from "react";
import { Timer } from "@/hooks/useTimers";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { calculateProgress, formatTime } from "@/utils/timerHelpers";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { Play, Pause, RotateCcw, Trash2, RefreshCw } from "lucide-react-native";

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
        return "Pause";
      case "paused":
        return "Resume";
      case "completed":
        return "Restart";
      default:
        return "Start";
    }
  };

  const getButtonIcon = () => {
    const iconColor = "#FFFFFF";
    const iconSize = 18;

    switch (timer.status) {
      case "running":
        return <Pause size={iconSize} color={iconColor} fill={iconColor} />;
      case "paused":
        return <Play size={iconSize} color={iconColor} fill={iconColor} />;
      case "completed":
        return <RefreshCw size={iconSize} color={iconColor} />;
      default:
        return <Play size={iconSize} color={iconColor} fill={iconColor} />;
    }
  };

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
            width: 70,
            marginLeft: 6,
          }}
        >
          <RotateCcw size={20} color={isDark ? "#D1D5DB" : "#374151"} />
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
          width: 70,
          marginLeft: 6,
          borderTopRightRadius: 12,
          borderBottomRightRadius: 12,
        }}
      >
        <Trash2 size={20} color="#FFFFFF" />
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
            width: 70,
            marginRight: 6,
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
          }}
        >
          <Pause size={20} color="#FFFFFF" />
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
            backgroundColor: "#2E6F40",
            justifyContent: "center",
            alignItems: "center",
            width: 70,
            marginRight: 6,
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
          }}
        >
          <Play size={20} color="#FFFFFF" fill="#FFFFFF" />
          <Text className="text-xs font-poppins-medium mt-1 text-white">
            Resume
          </Text>
        </RectButton>
      );
    }
    return null;
  };

  const size = 110;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progressOffset = circumference - (progress / 100) * circumference;

  return (
    <Animated.View style={[{ marginBottom: 10 }, animatedStyle]}>
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
            className={`rounded-xl shadow-md overflow-hidden ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
            style={{
              borderLeftWidth: 3,
              borderLeftColor: getStatusColor(),
            }}
          >
            <View className="p-3">
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
                      <RefreshCw
                        size={10}
                        color={isDark ? "#9CA3AF" : "#6B7280"}
                      />
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
                  <View
                    className="px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${getStatusColor()}20`,
                    }}
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
                    className={`p-1.5 rounded-lg ${
                      isDark ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <Trash2 size={14} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
              <View className="items-center my-3">
                <View className="relative items-center justify-center">
                  <Svg
                    width={size}
                    height={size}
                    style={{ position: "absolute" }}
                  >
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
                      stroke={getStatusColor()}
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
                    style={{
                      width: size,
                      height: size,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      className={`text-2xl font-poppins-bold ${
                        timer.status === "completed"
                          ? "text-darkGreen"
                          : isDark
                            ? "text-white"
                            : "text-gray-900"
                      }`}
                    >
                      {formatTime(timer.remainingTime)}
                    </Text>
                    <View
                      className={`h-0.5 w-8 my-1 ${
                        isDark ? "bg-gray-600" : "bg-gray-300"
                      }`}
                    />
                    <Text
                      className={`text-xs font-poppins-medium ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {formatTime(timer.duration)}
                    </Text>
                  </View>
                </View>
                <Text
                  className={`text-xs font-poppins-semibold mt-2 ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {progress.toFixed(0)}% Complete
                </Text>
              </View>
              <TouchableOpacity
                onPress={handlePrimaryAction}
                className="py-2.5 rounded-lg shadow-sm flex-row items-center justify-center"
                style={{
                  backgroundColor:
                    timer.status === "running"
                      ? "#F59E0B"
                      : timer.status === "paused"
                        ? "#2E6F40"
                        : "#2E6F40",
                }}
              >
                {getButtonIcon()}
                <Text className="text-white text-center font-poppins-bold text-sm ml-2">
                  {getButtonText()}
                </Text>
              </TouchableOpacity>
              <Text className="text-xs font-poppins-bold text-darkGreen text-center mt-2">
                Swipe for actions • Hold to reorder
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </Animated.View>
  );
}
