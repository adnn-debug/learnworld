
import { useEffect, useState } from "react";
import type { ProgressRecord } from "../types/progress";

const STORAGE_KEY = "learnworld-progress-v1";

function loadProgress(): ProgressRecord {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as ProgressRecord) : {};
  } catch {
    return {};
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressRecord>(loadProgress);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // The app remains usable if browser storage is unavailable.
    }
  }, [progress]);

  function recordAttempt(
    lessonId: string,
    correct: boolean,
  ) {
    setProgress((current) => {
      const previous = current[lessonId];

      return {
        ...current,
        [lessonId]: {
          completed: correct || previous?.completed === true,
          attempts: (previous?.attempts ?? 0) + 1,
          correct,
        },
      };
    });
  }

  function resetProgress() {
    setProgress({});
  }

  return { progress, recordAttempt, resetProgress };
}
