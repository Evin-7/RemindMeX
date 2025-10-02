import { View, Text, TextInput } from "react-native";

interface LabelInputProps {
  value: string;
  onChange: (text: string) => void;
  isDark: boolean;
}

export default function LabelInput({
  value,
  onChange,
  isDark,
}: LabelInputProps) {
  return (
    <>
      <Text
        className={`text-sm font-poppins-medium mb-2 ${
          isDark ? "text-gray-300" : "text-gray-700"
        }`}
      >
        Label
      </Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="e.g., Meditation, Workout, Cooking"
        placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
        className={`p-4 rounded-xl mb-4 font-poppins ${
          isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
        }`}
      />
    </>
  );
}
