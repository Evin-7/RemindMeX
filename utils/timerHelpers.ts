import { Timer } from "@/hooks/useTimers";

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

export function calculateProgress(timer: Timer): number {
  if (timer.duration === 0) return 0;
  return ((timer.duration - timer.remainingTime) / timer.duration) * 100;
}

export function generateTimerId(): string {
  return `timer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function recalculateRemainingTime(timer: Timer): number {
  if (timer.status !== "running" || !timer.startedAt) {
    return timer.remainingTime;
  }

  const now = Date.now();
  const elapsed = Math.floor((now - timer.startedAt) / 1000);
  const remaining = Math.max(0, timer.duration - elapsed);

  return remaining;
}

export function shouldTimerComplete(timer: Timer): boolean {
  return timer.status === "running" && timer.remainingTime <= 0;
}
