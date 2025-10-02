import React from "react";
import { View, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { RotateCcw, Trash2 } from "lucide-react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Timer } from "@/hooks/useTimers";

interface Props {
  timer: Timer;
  onReset: (id: string) => void;
  onDelete: (id: string) => void;
  isDark: boolean;
  swipeableRef: React.RefObject<Swipeable | null>;
}

export const RightActions: React.FC<Props> = ({
  timer,
  onReset,
  onDelete,
  isDark,
  swipeableRef,
}) => (
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
        backgroundColor: "#FF0000",
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
