import { View, TouchableOpacity, Text } from "react-native";

interface AddTimerButtonProps {
  onPress: () => void;
}

export default function AddTimerButton({ onPress }: AddTimerButtonProps) {
  return (
    <View className="absolute bottom-6 right-6 left-6">
      <TouchableOpacity
        onPress={onPress}
        className="bg-darkGreen p-5 rounded-2xl flex-row items-center justify-center"
        style={{
          shadowColor: "#3B82F6",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Text className="text-white text-center font-poppins-bold text-lg">
          + Add Timer
        </Text>
      </TouchableOpacity>
    </View>
  );
}
