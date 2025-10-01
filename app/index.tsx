import "../global.css";
import { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  RefreshControl,
  Alert,
} from "react-native";
import { useTimers } from "@/hooks/useTimers";
import TimerCard from "@/components/TimerCard";
import AddTimerModal from "@/components/AddTimerModal";
import Header from "@/components/Header";
import { useTheme } from "@/contexts/ThemeContext";
import * as Notifications from "expo-notifications";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
    reorderTimers,
  } = useTimers();
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<string | null>(null);

  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  const requestNotificationPermissions = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      setPermissionStatus(status);

      if (status !== "granted") {
        Alert.alert(
          "Notifications Disabled",
          "Please enable notifications in settings to receive timer alerts.",
          [{ text: "OK" }],
        );
      }
    } catch (error) {
      console.error("Failed to request notification permissions:", error);
    }
  };

  useEffect(() => {
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

  const handleAddTimer = async (formData: any) => {
    try {
      await addTimer(formData);
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to create timer. Please check your input and try again.",
        [{ text: "OK" }],
      );
      throw error;
    }
  };

  const handleDeleteTimer = (id: string, label: string) => {
    Alert.alert("Delete Timer", `Are you sure you want to delete "${label}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteTimer(id),
      },
    ]);
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className={`flex-1 ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
        <Header />
        {timers.length === 0 ? (
          <View className="flex-1 items-center justify-center px-6">
            <Text
              className={`text-2xl font-poppins-bold text-center mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              No Timers Yet
            </Text>
            <Text
              className={`text-center font-poppins ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Create your first timer to get started
            </Text>
            {permissionStatus !== "granted" && (
              <TouchableOpacity
                onPress={requestNotificationPermissions}
                className="mt-4 px-4 py-2 bg-yellow-500 rounded-lg"
              >
                <Text className="text-white font-poppins-medium">
                  Enable Notifications
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <DraggableFlatList
            data={timers}
            keyExtractor={(item) => item.id}
            onDragEnd={({ data }) => reorderTimers(data)}
            renderItem={({ item, drag, isActive }) => (
              <ScaleDecorator>
                <TimerCard
                  timer={item}
                  onStart={startTimer}
                  onPause={pauseTimer}
                  onResume={resumeTimer}
                  onReset={resetTimer}
                  onDelete={() => handleDeleteTimer(item.id, item.label)}
                  onLongPress={drag}
                  isActive={isActive}
                />
              </ScaleDecorator>
            )}
            contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
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
            className="bg-darkGreen p-5 rounded-2xl flex-row items-center justify-center"
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
          onAddTimer={handleAddTimer}
        />
      </View>
    </GestureHandlerRootView>
  );
}
