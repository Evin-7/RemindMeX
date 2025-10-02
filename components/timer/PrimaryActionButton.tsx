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
  onReset,
}) => {
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

  return (
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
  );
};
