import { View, TouchableOpacity, Text } from "react-native";
import { Clock } from "lucide-react-native";

interface EmptyStateProps {
  isDark: boolean;
  permissionStatus: string | null;
  onRequestPermissions: () => void;
}

export default function EmptyState({
  isDark,
  permissionStatus,
  onRequestPermissions,
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <Clock
        size={60}
        color={isDark ? "#D1D5DB" : "#4B5563"}
        className="mb-4"
      />
      <Text
        className={`text-2xl font-poppins-bold text-center mb-2 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        No Timers Yet
      </Text>
      <Text
        className={`text-center font-poppins ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        Create your first timer to get started
      </Text>
      {permissionStatus !== "granted" && (
        <TouchableOpacity
          onPress={onRequestPermissions}
          className="mt-4 px-4 py-2 bg-yellow-500 rounded-lg"
        >
          <Text className="text-white font-poppins-medium">
            Enable Notifications
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
