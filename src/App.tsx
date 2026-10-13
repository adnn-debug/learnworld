
import { useState } from "react";
import "./App.css";
import { subjects } from "./data/curriculum";
import SubjectCard from "./components/SubjectCard";
import LessonPanel from "./components/LessonPanel";
import ProgressPanel from "./components/ProgressPanel";
import { useProgress } from "./hooks/useProgress";

function App() {
  const [selectedId, setSelectedId] = useState("physics");
  const [selectedLessonId, setSelectedLessonId] = useState("motion");

  const { progress, recordAttempt, resetProgress } = useProgress();

  const subject =
    subjects.find((item) => item.id === selectedId) ?? subjects[0];

  const lesson =
    subject.lessons.find((item) => item.id === selectedLessonId) ??
    subject.lessons[0];

  function chooseSubject(id: string) {
    const nextSubject = subjects.find((item) => item.id === id);

    if (!nextSubject) return;

    setSelectedId(id);
    setSelectedLessonId(nextSubject.lessons[0].id);
  }

  return (
    <div className="app">
      <header className="header">
        <a className="brand" href="#">
          <span className="brand-icon">✦</span>
          LearnWorld
        </a>
        <span className="header-note">Learn at your own pace</span>
      </header>

      <main>
        <section className="hero">
          <span className="eyebrow">YOUR LEARNING SPACE</span>
          <h1>
            Understand more.
            <br />
            <span>Learn better.</span>
          </h1>
          <p>
            Explore new concepts, learn through examples, and test
            your understanding at your own pace.
          </p>
        </section>

        <section className="subjects" id="subjects">
          <span className="eyebrow">PICK YOUR NEXT STEP</span>
          <h2>What will you learn today?</h2>

          <div className="subject-grid">
            {subjects.map((item) => (
              <SubjectCard
                key={item.id}
                subject={item}
                selected={selectedId === item.id}
                onSelect={() => chooseSubject(item.id)}
              />
            ))}
          </div>
        </section>

        <ProgressPanel
          subjects={subjects}
          progress={progress}
          onReset={resetProgress}
        />

        <LessonPanel
          key={`${subject.id}-${lesson.id}`}
          subject={subject}
          lesson={lesson}
          onSelectLesson={setSelectedLessonId}
          progress={progress[lesson.id]}
          onRecordAttempt={recordAttempt}
        />
      </main>

      <footer className="footer">
        <strong>✦ LearnWorld</strong>
        <span>Built for curious minds.</span>
      </footer>
    </div>
  );
}

export default App;
