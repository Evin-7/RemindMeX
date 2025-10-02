import { View, Text, TouchableOpacity } from "react-native";

interface ModalHeaderProps {
  title: string;
  isDark: boolean;
  onClose: () => void;
}

export default function ModalHeader({
  title,
  isDark,
  onClose,
}: ModalHeaderProps) {
  return (
    <View className="flex-row justify-between items-center mb-6">
      <Text
        className={`text-2xl font-poppins-bold ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </Text>
      <TouchableOpacity onPress={onClose}>
        <Text className="text-2xl text-[#FF0000]">✕</Text>
      </TouchableOpacity>
    </View>
  );
}
