
import type { Subject } from "../types/learning";

type SubjectCardProps = {
  subject: Subject;
  selected: boolean;
  onSelect: () => void;
};

export default function SubjectCard({
  subject,
  selected,
  onSelect,
}: SubjectCardProps) {
  return (
    <button
      type="button"
      className={`subject-card ${selected ? "selected" : ""}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span className="subject-icon" aria-hidden="true">
        {subject.icon}
      </span>

      <strong>{subject.name}</strong>
      <span className="level">{subject.level}</span>
      <span className="description">{subject.description}</span>
      <span className="card-link">Open learning module →</span>
      <span className="lesson-count">
        {subject.lessons.length} sample lessons
      </span>
    </button>
  );
}
