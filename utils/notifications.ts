import * as Notifications from "expo-notifications";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermissions(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === "granted";
}

export async function scheduleTimerNotification(
  timerId: string,
  label: string,
  seconds: number,
): Promise<string> {
  const hasPermission = await requestNotificationPermissions();

  if (!hasPermission) {
    throw new Error("Notification permissions not granted");
  }

  const triggerDate = new Date(Date.now() + seconds * 1000);

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: `"${label}" completed!`,
      body: `That’s done! Ready for your next task?`,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
      vibrate: [0, 250, 250, 250],
      data: { timerId },
    },
    trigger: triggerDate as unknown as Notifications.NotificationTriggerInput,
  });

  return notificationId;
}

export async function cancelNotification(
  notificationId: string,
): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}

export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export function triggerHapticFeedback(
  type: "light" | "medium" | "heavy" = "medium",
) {
  if (Platform.OS === "ios") {
    switch (type) {
      case "light":
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case "heavy":
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      default:
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  } else {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }
}
