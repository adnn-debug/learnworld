
import type { ProgressRecord } from "../types/progress";
import type { Subject } from "../types/learning";

type ProgressPanelProps = {
  subjects: Subject[];
  progress: ProgressRecord;
  onReset: () => void;
};

export default function ProgressPanel({
  subjects,
  progress,
  onReset,
}: ProgressPanelProps) {
  const allLessons = subjects.flatMap((subject) =>
    subject.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      subject: subject.name,
    })),
  );

  const completed = allLessons.filter(
    (lesson) => progress[lesson.id]?.completed,
  ).length;

  const attempted = allLessons.filter(
    (lesson) => (progress[lesson.id]?.attempts ?? 0) > 0,
  );

  const correctAttempts = attempted.filter(
    (lesson) => progress[lesson.id]?.correct === true,
  ).length;

  const accuracy =
    attempted.length === 0
      ? 0
      : Math.round((correctAttempts / attempted.length) * 100);

  const percentage =
    allLessons.length === 0
      ? 0
      : Math.round((completed / allLessons.length) * 100);

  return (
    <section className="progress-panel" aria-labelledby="progress-heading">
      <div className="progress-heading-row">
        <div>
          <span className="eyebrow">YOUR JOURNEY</span>
          <h2 id="progress-heading">Learning progress</h2>
        </div>
        <span className="progress-percent">{percentage}%</span>
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-label="Completed lessons"
        aria-valuemin={0}
        aria-valuemax={allLessons.length}
        aria-valuenow={completed}
      >
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="progress-stats">
        <div>
          <strong>{completed}/{allLessons.length}</strong>
          <span>Lessons completed</span>
        </div>
        <div>
          <strong>{attempted.length}</strong>
          <span>Lessons attempted</span>
        </div>
        <div>
          <strong>{accuracy}%</strong>
          <span>Latest-result accuracy</span>
        </div>
      </div>

      <div className="progress-list">
        {allLessons.map((lesson) => {
          const item = progress[lesson.id];

          return (
            <div className="progress-item" key={lesson.id}>
              <span className="progress-status" aria-hidden="true">
                {item?.completed ? "✓" : item?.attempts ? "↻" : "○"}
              </span>
              <div>
                <strong>{lesson.title}</strong>
                <span>{lesson.subject}</span>
              </div>
              <span className="progress-label">
                {item?.completed
                  ? "Completed"
                  : item?.attempts
                    ? "In progress"
                    : "Not started"}
              </span>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="reset-progress-button"
        onClick={() => {
          if (window.confirm("Reset all your LearnWorld progress?")) {
            onReset();
          }
        }}
      >
        Reset progress
      </button>
    </section>
  );
}
