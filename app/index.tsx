import "../global.css";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, RefreshControl } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { useTimers } from "@/hooks/useTimers";
import { useTheme } from "@/contexts/ThemeContext";
import { requestNotificationPermissions } from "@/utils/notifications";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import MessageModal from "@/components/MessageModal";
import AddTimerModal from "@/components/Timers/AddTimerModal";
import TimerCard from "@/components/TimerCard/TimerCard";

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

  const [timerIdToDelete, setTimerIdToDelete] = useState<string | null>(null);

  const showMessage = (
    title: string,
    msg: string,
    type: "success" | "error",
  ) => {
    setMessage({ visible: true, title, message: msg, type });
  };

  useEffect(() => {
    const askPermissions = async () => {
      const granted = await requestNotificationPermissions();
      setPermissionStatus(granted ? "granted" : "denied");

      if (!granted) {
        showMessage(
          "Notifications Disabled",
          "Please enable notifications in settings to receive timer alerts.",
          "error",
        );
      }
    };

    askPermissions();
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
      showMessage("Success", "Timer created successfully!", "success");
    } catch (error) {
      showMessage(
        "Error",
        "Failed to create timer. Please check your input and try again.",
        "error",
      );
    }
  };

  const handleDeleteTimer = (id: string, label: string) => {
    setTimerIdToDelete(id);
    setMessage({
      visible: true,
      title: "Confirm Deletion",
      message: `Are you sure you want to delete "${label}"?`,
      type: "error",
    });
  };

  const confirmDelete = () => {
    if (timerIdToDelete) {
      deleteTimer(timerIdToDelete);
      showMessage("Deleted", "Timer successfully removed.", "success");
    }
    cancelDelete();
  };

  const cancelDelete = () => {
    setTimerIdToDelete(null);
    setMessage({ ...message, visible: false });
  };

  if (isLoading) {
    return (
      <View
        className={`flex-1 items-center justify-center ${
          isDark ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <Text
          className={`text-lg font-poppins-medium ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Loading timers...
        </Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <View className={`flex-1 ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
        <Header />

        {timers.length === 0 ? (
          <EmptyState permissionStatus={permissionStatus} />
        ) : (
          <DraggableFlatList
            data={timers}
            className="mb-[100px] p-4"
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
            className="bg-darkGreen p-5 rounded-2xl flex-row items-center justify-center shadow-lg shadow-blue-500/60"
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

        <MessageModal
          visible={message.visible}
          onClose={cancelDelete}
          title={message.title}
          message={message.message}
          type={message.type}
          isConfirmation={timerIdToDelete !== null}
          onConfirm={confirmDelete}
        />
      </View>
    </GestureHandlerRootView>
  );
}
