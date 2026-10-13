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

const PASS_MARK = 7;

export default function LessonPanel({
  subject,
  lesson,
  onSelectLesson,
  progress,
  onRecordAttempt,
}: LessonPanelProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = lesson.questions;
  const question = questions[questionIndex];
  const isCorrect = selectedAnswer === question.correctAnswer;

  function resetQuiz() {
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  }

  function checkAnswer() {
    if (selectedAnswer === null || answered) return;
    setAnswered(true);
    if (isCorrect) setScore((current) => current + 1);
  }

  function nextQuestion() {
    if (!answered) return;
    if (questionIndex === questions.length - 1) {
      setFinished(true);
      onRecordAttempt(lesson.id, score >= PASS_MARK);
      return;
    }
    setQuestionIndex((current) => current + 1);
    setSelectedAnswer(null);
    setAnswered(false);
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
        <span>{lesson.duration} study</span>
        <span>{questions.length} questions</span>
      </div>

      <h2>{lesson.title}</h2>
      <p className="explanation">{lesson.introduction}</p>

      {progress?.completed && (
        <p className="lesson-complete" role="status">
          ✓ Topic completed — you have scored at least {PASS_MARK}/{questions.length} on a quiz attempt.
        </p>
      )}

      <section className="lesson-deep-dive" aria-labelledby="lesson-deep-dive-heading">
        <div className="lesson-content-heading">
          <span className="eyebrow">LEARN IT PROPERLY</span>
          <h3 id="lesson-deep-dive-heading">Let's unpack the topic</h3>
          <p>Go beyond a definition: read the explanation, connect each idea to an example, and explain it in your own words.</p>
        </div>
        {lesson.studySections.map((section, index) => (
          <article className="lesson-study-section" key={`${lesson.id}-section-${index}`}>
            <span className="lesson-study-number">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h4>{section.heading}</h4>
              <p>{section.body}</p>
            </div>
          </article>
        ))}
      </section>

      <h3>Key ideas at a glance</h3>
      <ul className="key-ideas">
        {lesson.keyIdeas.map((idea) => (
          <li key={idea}>{idea}</li>
        ))}
      </ul>

      <div className="example">
        <span className="eyebrow">WORKED EXAMPLE / ILLUSTRATION</span>
        <p className="explanation example-text">{lesson.example}</p>
      </div>

      <div className="quiz-section" aria-labelledby="lesson-quiz-heading">
        <div className="quiz-topline">
          <div>
            <span className="eyebrow">TOPIC QUIZ · 10 QUESTIONS</span>
            <h3 id="lesson-quiz-heading">{finished ? "Your quiz result" : `Question ${questionIndex + 1} of ${questions.length}`}</h3>
          </div>
          {!finished && <span className="quiz-score-live">{score} correct</span>}
        </div>

        <div className="quiz-progress-track" role="progressbar" aria-label="Quiz progress" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={finished ? questions.length : questionIndex + (answered ? 1 : 0)}>
          <span style={{ width: `${(finished ? 100 : ((questionIndex + (answered ? 1 : 0)) / questions.length) * 100)}%` }} />
        </div>

        {finished ? (
          <div className={`quiz-result ${score >= PASS_MARK ? "quiz-result-pass" : "quiz-result-retry"}`} role="status">
            <span className="quiz-result-icon" aria-hidden="true">{score >= PASS_MARK ? "🎉" : "🌱"}</span>
            <strong>{score}/{questions.length} correct</strong>
            <p>{score >= PASS_MARK
              ? "Topic completed. You reached the 70% pass mark. Try again later to strengthen recall."
              : `You need ${PASS_MARK} correct answers to mark this topic complete. Re-read the explanations and try the quiz again.`}</p>
            <button type="button" className="primary-button" onClick={resetQuiz}>Retake all 10 questions</button>
          </div>
        ) : (
          <>
            <h3 className="quiz-question-prompt">{question.prompt}</h3>
            <div className="options">
              {question.options.map((option, index) => (
                <button
                  type="button"
                  key={`${questionIndex}-${option}`}
                  className={`option ${selectedAnswer === index ? "chosen" : ""} ${answered && index === question.correctAnswer ? "correct" : ""} ${answered && selectedAnswer === index && !isCorrect ? "incorrect" : ""}`}
                  disabled={answered}
                  aria-pressed={selectedAnswer === index}
                  onClick={() => setSelectedAnswer(index)}
                >
                  <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                  {option}
                </button>
              ))}
            </div>

            {answered && (
              <div className={`feedback ${isCorrect ? "right" : "wrong"}`} role="status">
                <strong>{isCorrect ? "That's right! ✨" : "Not quite — learn from it."}</strong>
                <p>{question.explanation}</p>
              </div>
            )}

            <div className="actions">
              {!answered ? (
                <button type="button" className="primary-button" onClick={checkAnswer} disabled={selectedAnswer === null}>Check answer</button>
              ) : (
                <button type="button" className="primary-button" onClick={nextQuestion}>
                  {questionIndex === questions.length - 1 ? "See my result" : "Next question →"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
