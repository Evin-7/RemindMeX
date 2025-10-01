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
  // ✅ New props for confirmation
  isConfirmation?: boolean;
  onConfirm?: () => void;
}

export default function MessageModal({
  visible,
  onClose,
  title,
  message,
  type = "success",
  // ✅ Destructure new props
  isConfirmation = false,
  onConfirm = onClose, // Default to onClose for standard use
}: MessageModalProps) {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";

  const getIconColor = () => {
    if (type === "error") return "#EF4444";
    if (type === "success") return "#10B981";
    return isDark ? "#E5E7EB" : "#1F2937";
  };

  // Determine which function the main button should call
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
          {/* Header Row for Title and Close Button */}
          <View className="flex-row justify-between items-center mb-2">
            <Text
              className={`text-xl font-poppins-bold ${
                type === "success"
                  ? "text-green-500"
                  : type === "error"
                    ? "text-red-500"
                    : isDark
                      ? "text-white"
                      : "text-gray-900"
              }`}
            >
              {title}
            </Text>

            {/* Close Icon Button - ALWAYS calls onClose (cancelDelete in Index.js) */}
            <TouchableOpacity
              onPress={onClose} // This is the fix for the 'X' button
              className="p-1 rounded-full"
            >
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

          {/* Main Action Button */}
          <TouchableOpacity
            onPress={buttonAction} // Use the determined action (confirm or close)
            className={`p-3 rounded-xl ${
              type === "success"
                ? "bg-darkGreen"
                : type === "error"
                  ? "bg-red-600"
                  : "bg-blue-500"
            }`}
          >
            <Text className="text-white text-center font-poppins-semibold">
              {/* Change button text for confirmation */}
              {isConfirmation ? "DELETE" : "OK"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
