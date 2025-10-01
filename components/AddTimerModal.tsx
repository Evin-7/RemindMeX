import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { TimerFormData } from "@/hooks/useTimers";

interface AddTimerModalProps {
  visible: boolean;
  onClose: () => void;
  onAddTimer: (formData: TimerFormData) => Promise<any>;
}

export default function AddTimerModal({
  visible,
  onClose,
  onAddTimer,
}: AddTimerModalProps) {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";

  const [formData, setFormData] = useState<TimerFormData>({
    label: "",
    hours: 0,
    minutes: 5,
    seconds: 0,
    recurring: false,
    recurringInterval: "daily",
  });

  const handleSubmit = async () => {
    const totalSeconds =
      formData.hours * 3600 + formData.minutes * 60 + formData.seconds;

    if (totalSeconds <= 0) {
      alert("Please set a duration greater than 0");
      return;
    }

    if (formData.label!.trim() === "") {
      alert("Please enter a label for your timer");
      return;
    }

    try {
      console.log("🚀 Submitting timer:", formData);
      await onAddTimer(formData);
      setFormData({
        label: "",
        hours: 0,
        minutes: 5,
        seconds: 0,
        recurring: false,
        recurringInterval: "daily",
      });
      onClose();
      alert("Timer created successfully!");
    } catch (error) {
      console.error("Failed to add timer:", error);
      alert("Failed to create timer. Please try again.");
    }
  };

  const updateField = (field: keyof TimerFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-end bg-black/50">
          <View
            className={`rounded-t-3xl p-6 ${
              isDark ? "bg-gray-900" : "bg-white"
            }`}
            style={{ maxHeight: "90%" }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Header */}
              <View className="flex-row justify-between items-center mb-6">
                <Text
                  className={`text-2xl font-poppins-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Create Timer
                </Text>
                <TouchableOpacity onPress={onClose}>
                  <Text className="text-2xl text-gray-500">✕</Text>
                </TouchableOpacity>
              </View>

              {/* Label Input */}
              <Text
                className={`text-sm font-poppins-medium mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Label
              </Text>
              <TextInput
                value={formData.label}
                onChangeText={(text) => updateField("label", text)}
                placeholder="e.g., Meditation, Workout, Cooking"
                placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
                className={`p-4 rounded-xl mb-4 font-poppins-regular ${
                  isDark
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              />

              {/* Duration */}
              <Text
                className={`text-sm font-poppins-medium mb-3 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Duration
              </Text>
              <View className="flex-row justify-between mb-6">
                <View className="flex-1 mr-2">
                  <Text
                    className={`text-xs mb-1 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Hours
                  </Text>
                  <TextInput
                    value={formData.hours.toString()}
                    onChangeText={(text) =>
                      updateField("hours", parseInt(text) || 0)
                    }
                    keyboardType="number-pad"
                    className={`p-3 rounded-xl text-center font-poppins-semibold text-lg ${
                      isDark
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  />
                </View>

                <View className="flex-1 mx-1">
                  <Text
                    className={`text-xs mb-1 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Minutes
                  </Text>
                  <TextInput
                    value={formData.minutes.toString()}
                    onChangeText={(text) =>
                      updateField("minutes", Math.min(59, parseInt(text) || 0))
                    }
                    keyboardType="number-pad"
                    className={`p-3 rounded-xl text-center font-poppins-semibold text-lg ${
                      isDark
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  />
                </View>

                <View className="flex-1 ml-2">
                  <Text
                    className={`text-xs mb-1 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Seconds
                  </Text>
                  <TextInput
                    value={formData.seconds.toString()}
                    onChangeText={(text) =>
                      updateField("seconds", Math.min(59, parseInt(text) || 0))
                    }
                    keyboardType="number-pad"
                    className={`p-3 rounded-xl text-center font-poppins-semibold text-lg ${
                      isDark
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  />
                </View>
              </View>

              {/* Recurring Option */}
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
                    className={`text-xs ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Automatically restart when complete
                  </Text>
                </View>
                <Switch
                  value={formData.recurring}
                  onValueChange={(value) => updateField("recurring", value)}
                  trackColor={{ false: "#767577", true: "#3B82F6" }}
                  thumbColor={formData.recurring ? "#fff" : "#f4f3f4"}
                />
              </View>

              {formData.recurring && (
                <View className="mb-4">
                  <Text
                    className={`text-sm font-poppins-medium mb-2 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Repeat
                  </Text>
                  <View className="flex-row space-x-2">
                    <TouchableOpacity
                      onPress={() => updateField("recurringInterval", "daily")}
                      className={`flex-1 p-3 rounded-xl ${
                        formData.recurringInterval === "daily"
                          ? "bg-blue-500"
                          : isDark
                            ? "bg-gray-800"
                            : "bg-gray-100"
                      }`}
                    >
                      <Text
                        className={`text-center font-poppins-semibold ${
                          formData.recurringInterval === "daily"
                            ? "text-white"
                            : isDark
                              ? "text-gray-300"
                              : "text-gray-700"
                        }`}
                      >
                        Daily
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => updateField("recurringInterval", "weekly")}
                      className={`flex-1 p-3 rounded-xl ${
                        formData.recurringInterval === "weekly"
                          ? "bg-blue-500"
                          : isDark
                            ? "bg-gray-800"
                            : "bg-gray-100"
                      }`}
                    >
                      <Text
                        className={`text-center font-poppins-semibold ${
                          formData.recurringInterval === "weekly"
                            ? "text-white"
                            : isDark
                              ? "text-gray-300"
                              : "text-gray-700"
                        }`}
                      >
                        Weekly
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* Quick Presets */}
              <Text
                className={`text-sm font-poppins-medium mb-3 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Quick Presets
              </Text>
              <View className="flex-row flex-wrap mb-6">
                {[
                  { label: "1 min", minutes: 1 },
                  { label: "5 min", minutes: 5 },
                  { label: "10 min", minutes: 10 },
                  { label: "15 min", minutes: 15 },
                  { label: "30 min", minutes: 30 },
                  { label: "1 hour", hours: 1 },
                ].map((preset) => (
                  <TouchableOpacity
                    key={preset.label}
                    onPress={() => {
                      updateField("hours", preset.hours || 0);
                      updateField("minutes", preset.minutes || 0);
                      updateField("seconds", 0);
                    }}
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

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                className="bg-blue-500 p-4 rounded-xl mb-4"
              >
                <Text className="text-white text-center font-poppins-semibold text-lg">
                  Create Timer
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
