
export type LessonProgress = {
  completed: boolean;
  attempts: number;
  correct: boolean | null;
};

export type ProgressRecord = Record<string, LessonProgress>;
