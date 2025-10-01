import "../global.css";
import { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  RefreshControl,
} from "react-native";
import { useTimers } from "@/hooks/useTimers";
import TimerCard from "@/components/TimerCard";
import AddTimerModal from "@/components/AddTimerModal";
import Header from "@/components/Header";
import { useTheme } from "@/contexts/ThemeContext";
import * as Notifications from "expo-notifications";

export default function Index() {
  const {
    timers,
    tick,
    isLoading,
    addTimer,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    deleteTimer,
  } = useTimers();
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    Notifications.requestPermissionsAsync();

    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received:", notification);
      },
    );

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => tick(), 1000);
    return () => clearInterval(interval);
  }, [tick]);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  if (isLoading) {
    return (
      <View
        className={`flex-1 items-center justify-center ${isDark ? "bg-gray-900" : "bg-gray-100"}`}
      >
        <Text
          className={`text-lg font-poppins-medium ${isDark ? "text-white" : "text-gray-900"}`}
        >
          Loading timers...
        </Text>
      </View>
    );
  }

  return (
    <View className={`flex-1 ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
      <Header />

      {timers.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className={`text-6xl mb-4`}>⏰</Text>
          <Text
            className={`text-2xl font-poppins-bold text-center mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            No Timers Yet
          </Text>
          <Text
            className={`text-center font-poppins-regular ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Create your first timer to get started
          </Text>
        </View>
      ) : (
        <FlatList
          data={timers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TimerCard
              timer={item}
              onStart={startTimer}
              onPause={pauseTimer}
              onResume={resumeTimer}
              onReset={resetTimer}
              onDelete={deleteTimer}
            />
          )}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={isDark ? "#fff" : "#000"}
            />
          }
        />
      )}

      <View className="absolute bottom-6 right-6 left-6">
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="bg-blue-500 p-5 rounded-2xl flex-row items-center justify-center"
          style={{
            shadowColor: "#3B82F6",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <Text className="text-white text-center font-poppins-bold text-lg">
            + Add Timer
          </Text>
        </TouchableOpacity>
      </View>

      <AddTimerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddTimer={addTimer}
      />
    </View>
  );
}
