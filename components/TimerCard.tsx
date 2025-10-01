import { View, Text, TouchableOpacity } from "react-native";
import formatTime from "@/utils/formatTime";
import { Timer, useTimers } from "@/hooks/useTimers";

export default function TimerCard({ timer }: { timer: Timer }) {
  const { startTimer, pauseTimer, deleteTimer } = useTimers();

  return (
    <View className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200">
      <Text className="text-lg font-poppins-semibold text-gray-800 mb-2">
        {timer.label}
      </Text>
      <Text className="text-2xl font-poppins-bold text-brand mb-4">
        {formatTime(timer.remaining)}
      </Text>

      <View className="flex-row space-x-3">
        {timer.isRunning ? (
          <TouchableOpacity
            onPress={() => pauseTimer(timer.id)}
            className="bg-yellow-500 px-4 py-2 rounded-lg"
          >
            <Text className="text-white font-poppins-medium">Pause</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => startTimer(timer.id)}
            className="bg-green-600 px-4 py-2 rounded-lg"
          >
            <Text className="text-white font-poppins-medium">Start</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => deleteTimer(timer.id)}
          className="bg-red-600 px-4 py-2 rounded-lg"
        >
          <Text className="text-white font-poppins-medium">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
