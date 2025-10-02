export interface Timer {
  id: string;
  label: string;
  duration: number;
  remainingTime: number;
  status: "idle" | "running" | "paused" | "completed";
  createdAt: number;
  startedAt?: number;
  pausedAt?: number;
  completedAt?: number;
  notificationId?: string;
  recurring?: {
    enabled: boolean;
    interval: "daily" | "weekly" | "custom";
    customDays?: number[];
  };
}

export interface TimerFormData {
  label: string;
  hours: number;
  minutes: number;
  seconds: number;
  recurring?: boolean;
  recurringInterval?: "daily" | "weekly";
}
