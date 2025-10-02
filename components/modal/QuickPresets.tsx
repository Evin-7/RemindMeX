import { View, Text, TouchableOpacity } from "react-native";

interface Preset {
  label: string;
  hours?: number;
  minutes?: number;
}

interface QuickPresetsProps {
  onSelect: (hours: number, minutes: number, seconds: number) => void;
  isDark: boolean;
}

const PRESETS: Preset[] = [
  { label: "1 min", minutes: 1 },
  { label: "5 min", minutes: 5 },
  { label: "10 min", minutes: 10 },
  { label: "15 min", minutes: 15 },
  { label: "30 min", minutes: 30 },
  { label: "1 hour", hours: 1 },
];

export default function QuickPresets({ onSelect, isDark }: QuickPresetsProps) {
  return (
    <>
      <Text
        className={`text-sm font-poppins-medium mb-3 ${
          isDark ? "text-gray-300" : "text-gray-700"
        }`}
      >
        Quick Presets
      </Text>
      <View className="flex-row flex-wrap mb-6">
        {PRESETS.map((preset) => (
          <TouchableOpacity
            key={preset.label}
            onPress={() => onSelect(preset.hours || 0, preset.minutes || 0, 0)}
            className={`px-4 py-2 rounded-full mr-2 mb-2 ${
              isDark ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <Text
              className={`font-poppins-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {preset.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}
