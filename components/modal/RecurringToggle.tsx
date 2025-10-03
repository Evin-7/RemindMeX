import { View, Text, Switch } from "react-native";

interface RecurringToggleProps {
  value: any;
  onChange: (value: boolean) => void;
  isDark: boolean;
}

export default function RecurringToggle({
  value,
  onChange,
  isDark,
}: RecurringToggleProps) {
  return (
    <View
      className={`flex-row items-center justify-between p-4 rounded-xl mb-4 ${
        isDark ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <View>
        <Text
          className={`font-poppins-semibold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Recurring Timer
        </Text>
        <Text
          className={`text-xs font-poppins ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Automatically restart when complete
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: "#767577", true: "#2E6F40" }}
        thumbColor={value ? "#fff" : "#f4f3f4"}
      />
    </View>
  );
}
