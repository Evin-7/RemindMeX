import { RefreshControl } from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import TimerCard from "@/components/TimerCard";

interface TimerListProps {
  timers: any[];
  isDark: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  onReorder: (data: any[]) => void;
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  onReset: (id: string) => void;
  onDelete: (id: string, label: string) => void;
}

export default function TimerList({
  timers,
  isDark,
  refreshing,
  onRefresh,
  onReorder,
  onStart,
  onPause,
  onResume,
  onReset,
  onDelete,
}: TimerListProps) {
  return (
    <DraggableFlatList
      data={timers}
      style={{ marginBottom: 100 }}
      keyExtractor={(item) => item.id}
      onDragEnd={({ data }) => onReorder(data)}
      renderItem={({ item, drag, isActive }) => (
        <ScaleDecorator>
          <TimerCard
            timer={item}
            onStart={onStart}
            onPause={onPause}
            onResume={onResume}
            onReset={onReset}
            onDelete={() => onDelete(item.id, item.label)}
            onLongPress={drag}
            isActive={isActive}
          />
        </ScaleDecorator>
      )}
      contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
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
