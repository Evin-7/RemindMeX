import React, { useMemo, useRef } from "react";
import { View, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useTheme } from "@/contexts/ThemeContext";
import { calculateProgress } from "@/utils/timerHelpers";
import TimerHeader from "./TimerHeader";
import TimerProgress from "./TimerProgress";
import TimerActions from "./TimerActions";
import TimerSwipeActions from "./TimerSwipeActions";

interface TimerCardProps {
  timer: any;
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
  const swipeableRef = useRef<Swipeable>(null);

  const progress = useMemo(() => calculateProgress(timer), [timer]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(isActive ? 1.05 : 1, { damping: 15, stiffness: 150 }),
      },
    ],
    opacity: withSpring(isActive ? 0.9 : 1),
  }));

  return (
    <Animated.View style={[{ marginBottom: 10 }, animatedStyle]}>
      <Swipeable
        ref={swipeableRef}
        renderLeftActions={() => (
          <TimerSwipeActions
            side="left"
            timer={timer}
            onPause={onPause}
            onResume={onResume}
            swipeableRef={swipeableRef}
          />
        )}
        renderRightActions={() => (
          <TimerSwipeActions
            side="right"
            timer={timer}
            onReset={onReset}
            onDelete={onDelete}
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
              borderLeftColor:
                timer.status === "running" ? "#2E6F40" : "#9CA3AF",
            }}
          >
            <View className="p-3">
              <TimerHeader timer={timer} isDark={isDark} onDelete={onDelete} />
              <TimerProgress
                timer={timer}
                isDark={isDark}
                progress={progress}
              />
              <TimerActions
                timer={timer}
                onStart={onStart}
                onPause={onPause}
                onResume={onResume}
                onReset={onReset}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </Animated.View>
  );
}
