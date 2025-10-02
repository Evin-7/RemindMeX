import { useState } from "react";

interface ShowMessageFn {
  (title: string, message: string, type: "success" | "error"): void;
}

interface DeleteTimerFn {
  (id: string): void;
}

export function useTimerDeletion(
  deleteTimer: DeleteTimerFn,
  showMessage: ShowMessageFn,
) {
  const [timerIdToDelete, setTimerIdToDelete] = useState<string | null>(null);

  const handleDeleteTimer = (id: string, label: string) => {
    setTimerIdToDelete(id);
    return {
      title: "Confirm Deletion",
      message: `Are you sure you want to delete "${label}"?`,
      type: "error" as const,
    };
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
  };

  return {
    timerIdToDelete,
    handleDeleteTimer,
    confirmDelete,
    cancelDelete,
  };
}
