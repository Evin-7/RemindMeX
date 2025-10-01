import { useTimers } from "@/hooks/useTimers";
import { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";

export default function AddTimerModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const { addTimer } = useTimers();
  const [label, setLabel] = useState("");
  const [minutes, setMinutes] = useState("1");

  const handleAdd = () => {
    const duration = parseInt(minutes) * 60;
    if (label && duration > 0) {
      addTimer(label, duration);
      setLabel("");
      setMinutes("1");
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white w-80 rounded-xl p-6">
          <Text className="text-lg font-poppins-semibold mb-3">
            Add New Timer
          </Text>
          <TextInput
            placeholder="Label"
            value={label}
            onChangeText={setLabel}
            className="border border-gray-300 rounded-lg px-3 py-2 mb-3"
          />
          <TextInput
            placeholder="Minutes"
            value={minutes}
            keyboardType="numeric"
            onChangeText={setMinutes}
            className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
          />
          <View className="flex-row justify-end space-x-3">
            <TouchableOpacity onPress={onClose}>
              <Text className="text-gray-600 font-poppins-medium">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAdd}>
              <Text className="text-brand font-poppins-bold">Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
