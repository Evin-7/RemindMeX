import { useState } from "react";
import { TimerFormData } from "@/hooks/useTimers";

interface UseTimerFormProps {
  onAddTimer: (formData: TimerFormData) => Promise<any>;
  onClose: () => void;
  showMessage: (
    title: string,
    message: string,
    type: "success" | "error",
  ) => void;
}

export function useTimerForm({
  onAddTimer,
  onClose,
  showMessage,
}: UseTimerFormProps) {
  const [formData, setFormData] = useState<TimerFormData>({
    label: "",
    hours: 0,
    minutes: 5,
    seconds: 0,
    recurring: false,
    recurringInterval: "daily",
  });

  const resetForm = () => {
    setFormData({
      label: "",
      hours: 0,
      minutes: 5,
      seconds: 0,
      recurring: false,
      recurringInterval: "daily",
    });
  };

  const updateField = (field: keyof TimerFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateDuration = (hours: number, minutes: number, seconds: number) => {
    setFormData((prev) => ({ ...prev, hours, minutes, seconds }));
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
      resetForm();
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

  return {
    formData,
    updateField,
    updateDuration,
    handleSubmit,
  };
}
