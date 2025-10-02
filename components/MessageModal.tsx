import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { X } from "lucide-react-native";

interface MessageModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: "success" | "error";
  isConfirmation?: boolean;
  onConfirm?: () => void;
}

export default function MessageModal({
  visible,
  onClose,
  title,
  message,
  type = "success",
  isConfirmation = false,
  onConfirm = onClose,
}: MessageModalProps) {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";

  const getIconColor = () => {
    if (type === "error") return "#EF4444";
    if (type === "success") return "#EF4444";
    return isDark ? "#E5E7EB" : "#1F2937";
  };

  const buttonAction = isConfirmation ? onConfirm : onClose;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View
          className={`w-11/12 p-6 rounded-2xl ${
            isDark ? "bg-gray-900" : "bg-white"
          }`}
        >
          <View className="flex-row justify-between items-center mb-2">
            <Text
              className={`text-xl font-poppins-bold ${
                type === "success"
                  ? "text-darkGreen"
                  : type === "error"
                    ? "text-red-500"
                    : isDark
                      ? "text-white"
                      : "text-gray-900"
              }`}
            >
              {title}
            </Text>
            <TouchableOpacity onPress={onClose} className="p-1 rounded-full">
              <X size={24} color={getIconColor()} />
            </TouchableOpacity>
          </View>

          <Text
            className={`mb-4 font-poppins ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {message}
          </Text>

          <TouchableOpacity
            onPress={buttonAction}
            className={`p-3 rounded-xl ${
              type === "success"
                ? "bg-darkGreen"
                : type === "error"
                  ? "bg-red-600"
                  : "bg-blue-500"
            }`}
          >
            <Text className="text-white text-center font-poppins-semibold">
              {isConfirmation ? "DELETE" : "OK"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
