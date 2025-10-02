import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Play, Pause, RefreshCw } from "lucide-react-native";

export default function TimerActions({
  timer,
  onStart,
  onPause,
  onResume,
  onReset,
}: any) {
  const iconColor = "#fff";

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
    switch (timer.status) {
      case "running":
        return <Pause size={18} color={iconColor} fill={iconColor} />;
      case "paused":
        return <Play size={18} color={iconColor} fill={iconColor} />;
      case "completed":
        return <RefreshCw size={18} color={iconColor} />;
      default:
        return <Play size={18} color={iconColor} fill={iconColor} />;
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePrimaryAction}
        className="py-2.5 rounded-lg shadow-sm flex-row items-center justify-center"
        style={{
          backgroundColor: timer.status === "running" ? "#F59E0B" : "#2E6F40",
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
    </>
  );
}
