import { TouchableOpacity, Text } from "react-native";

interface SubmitButtonProps {
  onPress: () => void;
}

export default function SubmitButton({ onPress }: SubmitButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-darkGreen p-4 rounded-xl mb-4"
    >
      <Text className="text-white text-center font-poppins-semibold text-lg">
        Create Timer
      </Text>
    </TouchableOpacity>
  );
}
