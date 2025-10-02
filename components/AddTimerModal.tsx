import React from "react";
import {
  View,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import MessageModal from "@/components/MessageModal";
import { useTheme } from "@/contexts/ThemeContext";
import { TimerFormData } from "@/hooks/useTimers";
import ModalHeader from "@/components/modal/ModalHeader";
import LabelInput from "@/components/modal/LabelInput";
import DurationPicker from "@/components/modal/DurationPicker";
import RecurringToggle from "@/components/modal/RecurringToggle";
import RecurringIntervalPicker from "@/components/modal/RecurringIntervalPicker";
import QuickPresets from "@/components/modal/QuickPresets";
import SubmitButton from "@/components/modal/SubmitButton";
import { useTimerForm } from "@/hooks/useTimerForm";
import { useModalMessage } from "@/hooks/useModalMessage";

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

  const { message, showMessage, hideMessage } = useModalMessage();

  const { formData, updateField, updateDuration, handleSubmit } = useTimerForm({
    onAddTimer,
    onClose,
    showMessage,
  });

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
              className={`rounded-t-3xl p-6 ${isDark ? "bg-gray-900" : "bg-white"}`}
              style={{ maxHeight: "90%" }}
            >
              <ScrollView showsVerticalScrollIndicator={false}>
                <ModalHeader
                  title="Create Timer"
                  isDark={isDark}
                  onClose={onClose}
                />

                <LabelInput
                  value={formData.label || ""}
                  onChange={(text) => updateField("label", text)}
                  isDark={isDark}
                />

                <DurationPicker
                  hours={formData.hours}
                  minutes={formData.minutes}
                  seconds={formData.seconds}
                  onHoursChange={(value) => updateField("hours", value)}
                  onMinutesChange={(value) => updateField("minutes", value)}
                  onSecondsChange={(value) => updateField("seconds", value)}
                  isDark={isDark}
                />

                <RecurringToggle
                  value={formData.recurring}
                  onChange={(value) => updateField("recurring", value)}
                  isDark={isDark}
                />

                {formData.recurring && (
                  <RecurringIntervalPicker
                    value={formData.recurringInterval}
                    onChange={(value) =>
                      updateField("recurringInterval", value)
                    }
                    isDark={isDark}
                  />
                )}

                <QuickPresets onSelect={updateDuration} isDark={isDark} />

                <SubmitButton onPress={handleSubmit} />
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <MessageModal
        visible={message.visible}
        onClose={hideMessage}
        title={message.title}
        message={message.message}
        type={message.type}
      />
    </>
  );
}
