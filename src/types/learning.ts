
export type QuizQuestion = {
  prompt: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export type Lesson = {
  id: string;
  title: string;
  duration: string;
  introduction: string;
  keyIdeas: string[];
  example: string;
  studySections: { heading: string; body: string }[];
  questions: QuizQuestion[];
};

export type Subject = {
  id: string;
  name: string;
  icon: string;
  level: string;
  description: string;
  lessons: Lesson[];
};
