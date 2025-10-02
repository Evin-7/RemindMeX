import { useEffect } from "react";
import * as Notifications from "expo-notifications";

export function useNotificationListener() {
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received:", notification);
      },
    );

    return () => subscription.remove();
  }, []);
}
