import { useState } from "react";
import { subjects } from "../data/curriculum";
import { useProgress } from "../hooks/useProgress";
import LessonPanel from "./LessonPanel";
import ProgressPanel from "./ProgressPanel";
import SubjectCard from "./SubjectCard";
import GameCorner from "./GameCorner";
import "./SecretBase.css";

type SecretBaseProps = {
  onBack: () => void;
};

const littleThings = [
  {
    icon: "🎀",
    title: "A little pink bow",
    text: "A tiny detail for a corner that feels personal, playful, and yours.",
  },
  {
    icon: "🍓",
    title: "Strawberry-sized joys",
    text: "A small nod to strawberries and Dairy Milk Silk with nuts.",
  },
  {
    icon: "🌷",
    title: "A reminder to keep going",
    text: "You do not need to learn everything in one day. Small, consistent steps count.",
  },
];

export default function SecretBase({ onBack }: SecretBaseProps) {
  const [selectedId, setSelectedId] = useState("physics");
  const [selectedLessonId, setSelectedLessonId] = useState("motion");
  const { progress, recordAttempt, resetProgress } = useProgress();

  const subject = subjects.find((item) => item.id === selectedId) ?? subjects[0];
  const lesson =
    subject.lessons.find((item) => item.id === selectedLessonId) ??
    subject.lessons[0];

  const totalLessons = subjects.reduce((total, item) => total + item.lessons.length, 0);
  const completedLessons = subjects.reduce(
    (total, item) =>
      total + item.lessons.filter((current) => Boolean(progress[current.id]?.completed)).length,
    0,
  );
  const attemptedLessons = subjects.reduce(
    (total, item) =>
      total + item.lessons.filter((current) => (progress[current.id]?.attempts ?? 0) > 0).length,
    0,
  );
  const completion = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;

  function chooseSubject(id: string) {
    const nextSubject = subjects.find((item) => item.id === id);
    if (!nextSubject) return;
    setSelectedId(id);
    setSelectedLessonId(nextSubject.lessons[0]?.id ?? "");
  }

  return (
    <section className="secret-base" aria-labelledby="secret-title">
      <div className="secret-glow secret-glow-one" aria-hidden="true" />
      <div className="secret-glow secret-glow-two" aria-hidden="true" />

      <header className="secret-topbar">
        <button type="button" className="secret-back" onClick={onBack}>
          <span aria-hidden="true">←</span> Back to LearnWorld
        </button>
        <nav className="secret-quick-links" aria-label="Private space shortcuts"><a href="#game-corner">🎮 Game Corner</a><a href="#secret-study-heading">📚 Study desk</a><a href="#secret-progress-area">✧ Progress</a></nav>
        <span className="secret-bow" aria-hidden="true">🎀</span>
      </header>

      <div className="secret-hero">
        <span className="secret-eyebrow"><span /> YOUR PRIVATE LEARNING CORNER</span>
        <h1 id="secret-title">Welcome to your<br /><span>secret little world.</span></h1>
        <p className="secret-intro">
          A quiet, burgundy-and-nude corner made for learning at your own pace.
          Pick a subject, understand one idea at a time, and practise until it clicks.
        </p>
        <div className="secret-heartline" aria-hidden="true"><span /> ♡ <span /></div>
      </div>

      <div className="secret-dashboard">
        <div className="secret-dashboard-heading">
          <div>
            <span className="secret-card-kicker">YOUR LEARNING DASHBOARD</span>
            <h2>Every little step adds up.</h2>
            <p>Your learning progress is saved in this browser on this device.</p>
          </div>
          <span className="secret-dashboard-bow" aria-hidden="true">✧</span>
        </div>
        <div className="secret-stat-grid">
          <article className="secret-stat glass-card">
            <span>TOPICS COMPLETED</span>
            <strong>{completedLessons}<small> / {totalLessons}</small></strong>
          </article>
          <article className="secret-stat glass-card">
            <span>TOPICS TRIED</span>
            <strong>{attemptedLessons}</strong>
          </article>
          <article className="secret-stat glass-card">
            <span>OVERALL PROGRESS</span>
            <strong>{completion}%</strong>
          </article>
        </div>
        <div className="secret-overall-track" role="progressbar" aria-label="Overall learning progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={completion}>
          <span style={{ width: `${completion}%` }} />
        </div>
      </div>

      <GameCorner />

      <div className="secret-section-heading">
        <span className="secret-card-kicker">CHOOSE YOUR SUBJECT</span>
        <h2>What shall we explore today?</h2>
        <p>Each subject contains topic notes, examples, and a knowledge check.</p>
      </div>

      <div className="secret-subject-grid">
        {subjects.map((item, index) => (
          <div className={`secret-subject-wrap secret-subject-wrap-${index}`} key={item.id}>
            <SubjectCard
              subject={item}
              selected={selectedId === item.id}
              onSelect={() => chooseSubject(item.id)}
            />
          </div>
        ))}
      </div>

      <section className="secret-study-area" aria-labelledby="secret-study-heading">
        <div className="secret-section-heading secret-study-heading">
          <span className="secret-card-kicker">LEARN • UNDERSTAND • PRACTISE</span>
          <h2 id="secret-study-heading">Your study desk</h2>
          <p>Read the explanation, review the key ideas, then answer the question.</p>
        </div>
        <LessonPanel
          subject={subject}
          lesson={lesson}
          onSelectLesson={setSelectedLessonId}
          progress={progress[lesson.id]}
          onRecordAttempt={recordAttempt}
        />
      </section>

      <section className="secret-progress-area" id="secret-progress-area" aria-label="Detailed learning progress">
        <ProgressPanel subjects={subjects} progress={progress} onReset={resetProgress} />
      </section>

      <div className="secret-section-heading">
        <span className="secret-card-kicker">THE LITTLE DETAILS</span>
        <h2>Small things, happy feelings.</h2>
        <p>A few thoughtful touches for this little corner.</p>
      </div>

      <div className="secret-favourites">
        {littleThings.map((item) => (
          <article className="secret-favourite glass-card" key={item.title}>
            <span className="secret-favourite-icon" aria-hidden="true">{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>

      <div className="secret-signoff">
        <span className="secret-signoff-bow" aria-hidden="true">🎀</span>
        <p>May this little corner remind you that you matter, and that every new thing you learn is a step forward.</p>
        <span className="secret-signoff-stars" aria-hidden="true">✧ ♡ ✧</span>
      </div>

      <p className="secret-disclaimer">
        The name and question gate is a frontend-only check, not strong security. Progress is stored in this browser.
        Do not put genuinely sensitive information here until server-side authentication and authorization are implemented.
      </p>
    </section>
  );
}
