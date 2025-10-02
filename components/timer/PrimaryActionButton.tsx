import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Timer } from "@/hooks/useTimers";
import { Play, Pause, RefreshCw } from "lucide-react-native";

interface Props {
  timer: Timer;
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  onReset: (id: string) => void;
}

export const PrimaryActionButton: React.FC<Props> = ({
  timer,
  onStart,
  onPause,
  onResume,
}) => {
  const isCompleted =
    timer.status === "completed" ||
    (timer.status === "running" && timer.remainingTime === 0);

  const handlePrimaryAction = () => {
    if (isCompleted) {
      onResume(timer.id);
    } else if (timer.status === "idle") {
      onStart(timer.id);
    } else if (timer.status === "running") {
      onPause(timer.id);
    } else if (timer.status === "paused") {
      onResume(timer.id);
    }
  };

  const getButtonText = () => {
    if (isCompleted) return "Restart";
    if (timer.status === "running") return "Pause";
    if (timer.status === "paused") return "Resume";
    return "Start";
  };

  const getButtonIcon = () => {
    const iconColor = "#FFFFFF";
    const iconSize = 18;

    if (isCompleted) {
      return <RefreshCw size={iconSize} color={iconColor} />;
    }
    if (timer.status === "running") {
      return <Pause size={iconSize} color={iconColor} fill={iconColor} />;
    }
    if (timer.status === "paused") {
      return <Play size={iconSize} color={iconColor} fill={iconColor} />;
    }
    return <Play size={iconSize} color={iconColor} fill={iconColor} />;
  };

  return (
    <TouchableOpacity
      onPress={handlePrimaryAction}
      className="py-2.5 rounded-lg shadow-sm flex-row items-center justify-center"
      style={{
        backgroundColor:
          timer.status === "running" && !isCompleted ? "#F59E0B" : "#2E6F40",
      }}
    >
      {getButtonIcon()}
      <Text className="text-white text-center font-poppins-bold text-sm ml-2">
        {getButtonText()}
      </Text>
    </TouchableOpacity>
  );
};
