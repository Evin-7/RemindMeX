import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";

interface ShowMessageFn {
  (title: string, message: string, type: "success" | "error"): void;
}

export function useNotificationPermissions(showMessage: ShowMessageFn) {
  const [permissionStatus, setPermissionStatus] = useState<string | null>(null);

  const requestNotificationPermissions = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      setPermissionStatus(status);

      if (status !== "granted") {
        showMessage(
          "Notifications Disabled",
          "Please enable notifications in settings to receive timer alerts.",
          "error",
        );
      }
    } catch (error) {
      console.error("Failed to request notification permissions:", error);
      showMessage(
        "Error",
        "Failed to request notification permissions",
        "error",
      );
    }
  };

  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  return { permissionStatus, requestNotificationPermissions };
}
