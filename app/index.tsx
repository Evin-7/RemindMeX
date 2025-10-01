import "../global.css";
import { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { useTimers } from "@/hooks/useTimers";
import TimerCard from "@/components/TimerCard";
import AddTimerModal from "@/components/AddTimerModal";
import Header from "@/components/Header";
import * as Notifications from "expo-notifications";

export default function Index() {
  const { timers, tick, loadTimers } = useTimers();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadTimers();
    const interval = setInterval(() => tick(), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  return (
    <View className="flex-1 bg-gray-100">
      <Header />
      <FlatList
        data={timers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TimerCard timer={item} />}
        contentContainerStyle={{ padding: 16 }}
      />

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="bg-brand p-4 rounded-full m-6"
      >
        <Text className="text-white text-center font-poppins-semibold text-lg">
          + Add Timer
        </Text>
      </TouchableOpacity>

      <AddTimerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}
