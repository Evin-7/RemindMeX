import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Timer } from "@/hooks/useTimers";
import { useTheme } from "@/contexts/ThemeContext";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { CircularTimer } from "./timer/CircularTimer";
import { LeftActions } from "./timer/LeftActions";
import { PrimaryActionButton } from "./timer/PrimaryActionButton";
import { RightActions } from "./timer/RightActions";
import { getStatusColor } from "./timer/StatusPill";
import { TimerHeader } from "./timer/TimerHeader";

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
  const swipeableRef = React.useRef<Swipeable | null>(null);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(isActive ? 1.05 : 1, {
          damping: 15,
          stiffness: 150,
        }),
      },
    ],
    opacity: withSpring(isActive ? 0.9 : 1),
  }));

  return (
    <Animated.View style={[{ marginBottom: 10 }, animatedStyle]}>
      <Swipeable
        ref={swipeableRef}
        renderLeftActions={() => (
          <LeftActions
            timer={timer}
            onPause={onPause}
            onResume={onResume}
            swipeableRef={swipeableRef}
          />
        )}
        renderRightActions={() => (
          <RightActions
            timer={timer}
            onReset={onReset}
            onDelete={onDelete}
            isDark={isDark}
            swipeableRef={swipeableRef}
          />
        )}
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
              borderLeftColor: getStatusColor(timer.status, isDark),
            }}
          >
            <View className="p-3">
              <TimerHeader timer={timer} isDark={isDark} onDelete={onDelete} />
              <CircularTimer timer={timer} isDark={isDark} />
              <PrimaryActionButton
                timer={timer}
                onStart={onStart}
                onPause={onPause}
                onResume={onResume}
                onReset={onReset}
              />
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
