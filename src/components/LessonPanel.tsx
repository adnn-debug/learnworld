
import { useState } from "react";
import type { Lesson, Subject } from "../types/learning";
import type { LessonProgress } from "../types/progress";

type LessonPanelProps = {
  subject: Subject;
  lesson: Lesson;
  onSelectLesson: (lessonId: string) => void;
  progress?: LessonProgress;
  onRecordAttempt: (lessonId: string, correct: boolean) => void;
};

export default function LessonPanel({
  subject,
  lesson,
  onSelectLesson,
  progress,
  onRecordAttempt,
}: LessonPanelProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const correct = selectedAnswer === lesson.question.correctAnswer;

  function resetQuiz() {
    setSelectedAnswer(null);
    setSubmitted(false);
  }

  function submitAnswer() {
    if (selectedAnswer === null || submitted) return;

    setSubmitted(true);
    onRecordAttempt(lesson.id, correct);
  }

  return (
    <section className="lesson" id="lesson">
      <div className="lesson-selector">
        <label htmlFor="lesson-select">Choose a lesson</label>
        <select
          id="lesson-select"
          value={lesson.id}
          onChange={(event) => {
            resetQuiz();
            onSelectLesson(event.target.value);
          }}
        >
          {subject.lessons.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      </div>

      <div className="lesson-meta">
        <span>{subject.name}</span>
        <span>{lesson.duration} read</span>
      </div>

      <h2>{lesson.title}</h2>
      <p className="explanation">{lesson.introduction}</p>

      {progress?.completed && (
        <p className="lesson-complete" role="status">
          ✓ Lesson completed
        </p>
      )}

      <h3>Key ideas</h3>
      <ul className="key-ideas">
        {lesson.keyIdeas.map((idea) => (
          <li key={idea}>{idea}</li>
        ))}
      </ul>

      <div className="example">
        <span className="eyebrow">EXAMPLE</span>
        <p className="explanation example-text">{lesson.example}</p>
      </div>

      <div className="quiz-section">
        <span className="eyebrow">KNOWLEDGE CHECK</span>
        <h3>{lesson.question.prompt}</h3>

        <div className="options">
          {lesson.question.options.map((option, index) => (
            <button
              type="button"
              key={option}
              className={`option ${
                selectedAnswer === index ? "chosen" : ""
              } ${
                submitted && index === lesson.question.correctAnswer
                  ? "correct"
                  : ""
              } ${
                submitted && selectedAnswer === index && !correct
                  ? "incorrect"
                  : ""
              }`}
              disabled={submitted}
              aria-pressed={selectedAnswer === index}
              onClick={() => setSelectedAnswer(index)}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </button>
          ))}
        </div>

        {submitted && (
          <div
            className={`feedback ${correct ? "right" : "wrong"}`}
            role="status"
          >
            <strong>{correct ? "Correct! 🎉" : "Not quite yet."}</strong>
            <p>{lesson.question.explanation}</p>
          </div>
        )}

        <div className="actions">
          {!submitted ? (
            <button
              type="button"
              className="primary-button"
              onClick={submitAnswer}
              disabled={selectedAnswer === null}
            >
              Check answer
            </button>
          ) : (
            <button
              type="button"
              className="primary-button"
              onClick={resetQuiz}
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
