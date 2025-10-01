import { useState, useEffect, useCallback, useRef } from "react";
import { saveTimers, loadTimers } from "@/utils/storage";
import {
  scheduleTimerNotification,
  cancelNotification,
  triggerHapticFeedback,
} from "@/utils/notifications";
import {
  generateTimerId,
  recalculateRemainingTime,
} from "@/utils/timerHelpers";
import { AppState } from "react-native";

type TimerStatus = "idle" | "running" | "paused" | "completed";
type RecurringInterval = "daily" | "weekly" | "monthly";

export interface Timer {
  id: string;
  label: string;
  duration: number;
  remainingTime: number;
  status: TimerStatus;
  createdAt: number;
  startedAt?: number;
  pausedAt?: number;
  completedAt?: number;
  notificationId?: string;
  recurring?: {
    enabled: boolean;
    interval: RecurringInterval;
  };
}

export interface TimerFormData {
  hours: number;
  minutes: number;
  seconds: number;
  label?: string;
  recurring?: boolean;
  recurringInterval?: RecurringInterval;
}

export function useTimers() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    initializeTimers();

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        recalculateAllTimers();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const initializeTimers = async () => {
    try {
      const loadedTimers: Timer[] = await loadTimers();
      const updatedTimers = loadedTimers.map((timer) => ({
        ...timer,
        remainingTime: recalculateRemainingTime(timer),
      }));
      setTimers(updatedTimers);
    } catch (error) {
      console.error("Failed to load timers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const recalculateAllTimers = useCallback(() => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => ({
        ...timer,
        remainingTime: recalculateRemainingTime(timer),
      })),
    );
  }, []);

  const debouncedSave = useCallback((timersToSave: Timer[]) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      saveTimers(timersToSave).catch((error) => {
        console.error("Failed to save timers:", error);
      });
    }, 500);
  }, []);

  const tick = useCallback(() => {
    setTimers((prevTimers) => {
      const updatedTimers = prevTimers.map((timer) => {
        if (timer.status !== "running") return timer;

        // Recalculate based on timestamp for accuracy
        const actualRemaining = recalculateRemainingTime(timer);
        const newRemainingTime = Math.max(0, actualRemaining);

        if (newRemainingTime === 0 && timer.remainingTime > 0) {
          triggerHapticFeedback("heavy");

          // Handle recurring timers
          if (timer.recurring?.enabled) {
            return {
              ...timer,
              remainingTime: timer.duration,
              startedAt: Date.now(),
              completedAt: undefined,
            };
          }

          return {
            ...timer,
            remainingTime: 0,
            status: "completed" as const,
            completedAt: Date.now(),
          };
        }

        return {
          ...timer,
          remainingTime: newRemainingTime,
        };
      });

      debouncedSave(updatedTimers);
      return updatedTimers;
    });
  }, [debouncedSave]);

  const addTimer = useCallback(async (formData: TimerFormData) => {
    try {
      const totalSeconds =
        formData.hours * 3600 + formData.minutes * 60 + formData.seconds;

      if (totalSeconds === 0) {
        throw new Error("Timer duration must be greater than 0");
      }

      if (totalSeconds > 86400) {
        // 24 hours
        throw new Error("Timer duration cannot exceed 24 hours");
      }

      const newTimer: Timer = {
        id: generateTimerId(),
        label: formData.label?.trim() || "Untitled Timer",
        duration: totalSeconds,
        remainingTime: totalSeconds,
        status: "idle",
        createdAt: Date.now(),
        recurring: formData.recurring
          ? {
              enabled: true,
              interval: formData.recurringInterval || "daily",
            }
          : undefined,
      };

      setTimers((prev) => {
        const updated = [newTimer, ...prev];
        saveTimers(updated).catch((error) => {
          console.error("Failed to save new timer:", error);
        });
        return updated;
      });

      triggerHapticFeedback("light");
      return newTimer;
    } catch (error) {
      console.error("Error adding timer:", error);
      throw error;
    }
  }, []);

  const startTimer = useCallback(async (timerId: string) => {
    try {
      setTimers((prev) =>
        prev.map((timer) => {
          if (timer.id !== timerId) return timer;

          const handleStart = async (t: Timer) => {
            if (t.notificationId) {
              await cancelNotification(t.notificationId);
            }

            try {
              const notificationId = await scheduleTimerNotification(
                t.id,
                t.label,
                t.remainingTime,
              );

              setTimers((current) =>
                current.map((ct) =>
                  ct.id === t.id
                    ? {
                        ...ct,
                        status: "running" as const,
                        startedAt: Date.now(),
                        notificationId,
                      }
                    : ct,
                ),
              );
            } catch (error) {
              console.error("Failed to schedule notification:", error);
            }
          };

          handleStart(timer);
          triggerHapticFeedback("medium");

          return {
            ...timer,
            status: "running" as const,
            startedAt: Date.now(),
          };
        }),
      );

      setTimeout(() => {
        setTimers((current) => {
          saveTimers(current).catch((error) => {
            console.error("Failed to save timer state:", error);
          });
          return current;
        });
      }, 100);
    } catch (error) {
      console.error("Error starting timer:", error);
      throw error;
    }
  }, []);

  const pauseTimer = useCallback(async (timerId: string) => {
    try {
      setTimers((prev) =>
        prev.map((timer) => {
          if (timer.id !== timerId || timer.status !== "running") return timer;

          if (timer.notificationId) {
            cancelNotification(timer.notificationId).catch((error) => {
              console.error("Failed to cancel notification:", error);
            });
          }

          const updatedTimer: Timer = {
            ...timer,
            status: "paused" as const,
            pausedAt: Date.now(),
            notificationId: undefined,
          };

          triggerHapticFeedback("light");
          return updatedTimer;
        }),
      );

      setTimeout(() => {
        setTimers((current) => {
          saveTimers(current).catch((error) => {
            console.error("Failed to save timer state:", error);
          });
          return current;
        });
      }, 100);
    } catch (error) {
      console.error("Error pausing timer:", error);
      throw error;
    }
  }, []);

  const resumeTimer = useCallback(
    async (timerId: string) => {
      await startTimer(timerId);
    },
    [startTimer],
  );

  const resetTimer = useCallback(async (timerId: string) => {
    try {
      setTimers((prev) =>
        prev.map((timer) => {
          if (timer.id !== timerId) return timer;

          if (timer.notificationId) {
            cancelNotification(timer.notificationId).catch((error) => {
              console.error("Failed to cancel notification:", error);
            });
          }

          const updatedTimer: Timer = {
            ...timer,
            remainingTime: timer.duration,
            status: "idle" as const,
            startedAt: undefined,
            pausedAt: undefined,
            completedAt: undefined,
            notificationId: undefined,
          };

          triggerHapticFeedback("light");
          return updatedTimer;
        }),
      );

      setTimeout(() => {
        setTimers((current) => {
          saveTimers(current).catch((error) => {
            console.error("Failed to save timer state:", error);
          });
          return current;
        });
      }, 100);
    } catch (error) {
      console.error("Error resetting timer:", error);
      throw error;
    }
  }, []);

  const deleteTimer = useCallback(
    async (timerId: string) => {
      try {
        const timer = timers.find((t) => t.id === timerId);
        if (timer?.notificationId) {
          await cancelNotification(timer.notificationId).catch((error) => {
            console.error("Failed to cancel notification:", error);
          });
        }

        setTimers((prev) => {
          const updated = prev.filter((t) => t.id !== timerId);
          saveTimers(updated).catch((error) => {
            console.error("Failed to save after deletion:", error);
          });
          triggerHapticFeedback("medium");
          return updated;
        });
      } catch (error) {
        console.error("Error deleting timer:", error);
        throw error;
      }
    },
    [timers],
  );

  const reorderTimers = useCallback((newOrder: Timer[]) => {
    setTimers(newOrder);
    saveTimers(newOrder).catch((error) => {
      console.error("Failed to save reordered timers:", error);
    });
    triggerHapticFeedback("light");
  }, []);

  return {
    timers,
    isLoading,
    tick,
    addTimer,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    deleteTimer,
    reorderTimers,
  };
}
