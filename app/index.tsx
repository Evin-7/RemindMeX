import "../global.css";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useTimers } from "@/hooks/useTimers";
import AddTimerModal from "@/components/AddTimerModal";
import Header from "@/components/Header";
import { useTheme } from "@/contexts/ThemeContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MessageModal from "@/components/MessageModal";
import EmptyState from "@/components/EmptyState";
import LoadingScreen from "@/components/LoadingScreen";
import AddTimerButton from "@/components/AddTimerButton";
import TimerList from "@/components/TimerList";
import { useNotificationPermissions } from "@/hooks/useNotificationPermissions";
import { useTimerDeletion } from "@/hooks/useTimerDeletion";
import { useNotificationListener } from "@/hooks/useNotificationListener";

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

  const showMessage = (
    title: string,
    msg: string,
    type: "success" | "error",
  ) => {
    setMessage({ visible: true, title, message: msg, type });
  };

  const { permissionStatus, requestNotificationPermissions } =
    useNotificationPermissions(showMessage);

  const { timerIdToDelete, handleDeleteTimer, confirmDelete, cancelDelete } =
    useTimerDeletion(deleteTimer, showMessage);

  useNotificationListener();

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

  const onDeleteTimer = (id: string, label: string) => {
    const deleteMessage = handleDeleteTimer(id, label);
    setMessage({ visible: true, ...deleteMessage });
  };
  const hideMessage = () => {
    setMessage((prev) => ({ ...prev, visible: false }));
  };

  if (isLoading) {
    return <LoadingScreen isDark={isDark} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className={`flex-1 ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
        <Header />
        {timers.length === 0 ? (
          <EmptyState
            isDark={isDark}
            permissionStatus={permissionStatus}
            onRequestPermissions={requestNotificationPermissions}
          />
        ) : (
          <TimerList
            timers={timers}
            isDark={isDark}
            refreshing={refreshing}
            onRefresh={onRefresh}
            onReorder={reorderTimers}
            onStart={startTimer}
            onPause={pauseTimer}
            onResume={resumeTimer}
            onReset={resetTimer}
            onDelete={onDeleteTimer}
          />
        )}
        <AddTimerButton onPress={() => setModalVisible(true)} />
        <AddTimerModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAddTimer={handleAddTimer}
        />
        <MessageModal
          visible={message.visible}
          onClose={timerIdToDelete ? cancelDelete : hideMessage}
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
