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

  useEffect(() => {
    initializeTimers();
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

  const debouncedSave = useCallback((timersToSave: Timer[]) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      saveTimers(timersToSave);
    }, 500);
  }, []);

  const tick = useCallback(() => {
    setTimers((prevTimers) => {
      const updatedTimers = prevTimers.map((timer) => {
        if (timer.status !== "running") return timer;

        const newRemainingTime = Math.max(0, timer.remainingTime - 1);

        if (newRemainingTime === 0) {
          triggerHapticFeedback("heavy");
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
    console.log("🔵 addTimer called with:", formData);

    const totalSeconds =
      formData.hours * 3600 + formData.minutes * 60 + formData.seconds;

    console.log("⏱️ Total seconds:", totalSeconds);

    if (totalSeconds === 0) {
      throw new Error("Timer duration must be greater than 0");
    }

    const newTimer: Timer = {
      id: generateTimerId(),
      label: formData.label || "Untitled Timer",
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

    console.log("✅ New timer created:", newTimer);

    setTimers((prev) => {
      console.log("📝 Previous timers:", prev.length);
      const updated = [newTimer, ...prev];
      console.log("📝 Updated timers:", updated.length);
      return updated;
    });

    setTimeout(() => {
      setTimers((current) => {
        console.log("💾 Saving timers, count:", current.length);
        saveTimers(current);
        return current;
      });
    }, 100);

    triggerHapticFeedback("light");
    return newTimer;
  }, []);

  const startTimer = useCallback(async (timerId: string) => {
    setTimers((prev) =>
      prev.map((timer) => {
        if (timer.id !== timerId) return timer;
        const handleStart = async (t: Timer) => {
          if (t.notificationId) {
            await cancelNotification(t.notificationId);
          }

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
        saveTimers(current);
        return current;
      });
    }, 100);
  }, []);

  const pauseTimer = useCallback(async (timerId: string) => {
    setTimers((prev) =>
      prev.map((timer) => {
        if (timer.id !== timerId || timer.status !== "running") return timer;

        if (timer.notificationId) {
          cancelNotification(timer.notificationId);
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
        saveTimers(current);
        return current;
      });
    }, 100);
  }, []);

  const resumeTimer = useCallback(
    async (timerId: string) => {
      await startTimer(timerId);
    },
    [startTimer],
  );

  const resetTimer = useCallback(async (timerId: string) => {
    setTimers((prev) =>
      prev.map((timer) => {
        if (timer.id !== timerId) return timer;

        if (timer.notificationId) {
          cancelNotification(timer.notificationId);
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
        saveTimers(current);
        return current;
      });
    }, 100);
  }, []);

  const deleteTimer = useCallback(
    async (timerId: string) => {
      const timer = timers.find((t) => t.id === timerId);
      if (timer?.notificationId) {
        await cancelNotification(timer.notificationId);
      }

      setTimers((prev) => {
        const updated = prev.filter((t) => t.id !== timerId);
        saveTimers(updated);
        triggerHapticFeedback("medium");
        return updated;
      });
    },
    [timers],
  );

  const reorderTimers = useCallback((newOrder: Timer[]) => {
    setTimers(newOrder);
    saveTimers(newOrder);
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
