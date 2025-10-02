import React, { useState } from "react";
import { RefreshControl } from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import TimerCard from "./TimerCard/TimerCard";

interface Timer {
  id: string;
  label: string;
  [key: string]: any;
}

interface TimerListProps {
  timers: Timer[];
  startTimer: (id: string) => void;
  pauseTimer: (id: string) => void;
  resumeTimer: (id: string) => void;
  resetTimer: (id: string) => void;
  deleteTimer: (id: string, label: string) => void;
  reorderTimers: (timers: Timer[]) => void;
  isDark?: boolean;
}

export default function TimerList({
  timers,
  startTimer,
  pauseTimer,
  resumeTimer,
  resetTimer,
  deleteTimer,
  reorderTimers,
  isDark = false,
}: TimerListProps) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <DraggableFlatList
      data={timers}
      className="mb-[100px] p-4"
      keyExtractor={(item) => item.id}
      onDragEnd={({ data }) => reorderTimers(data)}
      renderItem={({ item, drag, isActive }) => (
        <ScaleDecorator>
          <TimerCard
            timer={item}
            onStart={startTimer}
            onPause={pauseTimer}
            onResume={resumeTimer}
            onReset={resetTimer}
            onDelete={() => deleteTimer(item.id, item.label)}
            onLongPress={drag}
            isActive={isActive}
          />
        </ScaleDecorator>
      )}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={isDark ? "#fff" : "#000"}
        />
      }
    />
  );
}
