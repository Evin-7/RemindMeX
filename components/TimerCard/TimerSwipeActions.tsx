import React from "react";
import { View, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Pause, Play, RotateCcw, Trash2 } from "lucide-react-native";

export default function TimerSwipeActions({
  side,
  timer,
  onPause,
  onResume,
  onReset,
  onDelete,
  swipeableRef,
}: any) {
  if (side === "left") {
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
          <Pause size={20} color="#FFF" />
          <Text className="text-xs font-poppins-medium mt-1 text-white">
            Pause
          </Text>
        </RectButton>
      );
    }
    if (timer.status === "paused") {
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
          <Play size={20} color="#FFF" fill="#FFF" />
          <Text className="text-xs font-poppins-medium mt-1 text-white">
            Resume
          </Text>
        </RectButton>
      );
    }
  }

  if (side === "right") {
    return (
      <View className="flex-row">
        {timer.status !== "idle" && (
          <RectButton
            onPress={() => {
              onReset(timer.id);
              swipeableRef.current?.close();
            }}
            style={{
              backgroundColor: "#E5E7EB",
              justifyContent: "center",
              alignItems: "center",
              width: 70,
              marginLeft: 6,
            }}
          >
            <RotateCcw size={20} color="#374151" />
            <Text className="text-xs font-poppins-medium mt-1 text-gray-700">
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
          <Trash2 size={20} color="#FFF" />
          <Text className="text-xs font-poppins-medium mt-1 text-white">
            Delete
          </Text>
        </RectButton>
      </View>
    );
  }

  return null;
}
