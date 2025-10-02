import React from "react";
import { Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Play, Pause } from "lucide-react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Timer } from "@/hooks/useTimers";

interface Props {
  timer: Timer;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  swipeableRef: React.RefObject<Swipeable | null>;
}

export const LeftActions: React.FC<Props> = ({
  timer,
  onPause,
  onResume,
  swipeableRef,
}) => {
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
