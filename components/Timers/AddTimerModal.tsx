import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import MessageModal from "@/components/MessageModal";
import { useTheme } from "@/contexts/ThemeContext";
import { TimerFormData } from "@/hooks/useTimers";
import TimerLabelInput from "./TimerLabelInput";
import TimerDurationInputs from "./TimerDurationInputs";
import RecurringTimerToggle from "./RecurringTimerToggle";
import TimerPresets from "./TimerPresets";

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

  const [message, setMessage] = useState<{
    visible: boolean;
    title: string;
    message: string;
    type?: "success" | "error";
  }>({
    visible: false,
    title: "",
    message: "",
    type: "success",
  });

  const updateField = (field: keyof TimerFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const showMessage = (
    title: string,
    msg: string,
    type: "success" | "error",
  ) => {
    setMessage({ visible: true, title, message: msg, type });
  };

  const handleSubmit = async () => {
    const totalSeconds =
      formData.hours * 3600 + formData.minutes * 60 + formData.seconds;

    if (totalSeconds <= 0) {
      showMessage(
        "Invalid Duration",
        "Please set a duration greater than 0",
        "error",
      );
      return;
    }
    if (formData.label!.trim() === "") {
      showMessage(
        "Missing Label",
        "Please enter a label for your timer",
        "error",
      );
      return;
    }

    try {
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
    } catch (error) {
      console.error("Failed to add timer:", error);
      showMessage(
        "Error",
        "Failed to create timer. Please try again.",
        "error",
      );
    }
  };

  return (
    <>
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
              className={`rounded-t-3xl p-6 max-h-[90%] ${isDark ? "bg-gray-900" : "bg-white"}`}
            >
              <ScrollView showsVerticalScrollIndicator={false}>
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
                <TimerLabelInput
                  value={formData.label}
                  onChange={(text) => updateField("label", text)}
                />
                <TimerDurationInputs
                  hours={formData.hours}
                  minutes={formData.minutes}
                  seconds={formData.seconds}
                  isDark={isDark}
                  onChange={updateField}
                />
                <RecurringTimerToggle
                  recurring={formData.recurring}
                  interval={formData.recurringInterval}
                  isDark={isDark}
                  onChange={updateField}
                />
                <TimerPresets
                  isDark={isDark}
                  onSelect={(preset) => {
                    updateField("hours", preset.hours || 0);
                    updateField("minutes", preset.minutes || 0);
                    updateField("seconds", 0);
                  }}
                />
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="bg-darkGreen p-4 rounded-xl mb-4"
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

      {/* Message Modal */}
      <MessageModal
        visible={message.visible}
        onClose={() => setMessage({ ...message, visible: false })}
        title={message.title}
        message={message.message}
        type={message.type}
      />
    </>
  );
}
