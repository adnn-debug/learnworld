
import { useState } from "react";
import SecretBase from "./components/SecretBase";
import "./App.css";

import { subjects } from "./data/curriculum";
import SubjectCard from "./components/SubjectCard";
import LessonPanel from "./components/LessonPanel";
import ProgressPanel from "./components/ProgressPanel";
import { useProgress } from "./hooks/useProgress";

function App() {
  const [activePage, setActivePage] = useState<"home" | "secret">("home");
  const [selectedId, setSelectedId] = useState("physics");
  const [selectedLessonId, setSelectedLessonId] = useState("motion");

  const { progress, recordAttempt, resetProgress } = useProgress();

  const subject =
    subjects.find((item) => item.id === selectedId) ?? subjects[0];

  const lesson =
    subject.lessons.find((item) => item.id === selectedLessonId) ??
    subject.lessons[0];

  const totalLessons = subjects.reduce(
    (total, item) => total + item.lessons.length,
    0
  );

  const completedLessons = subjects.reduce(
    (total, item) =>
      total +
      item.lessons.filter((currentLesson) =>
        Boolean(progress[currentLesson.id]?.completed)
      ).length,
    0
  );

  const attemptedLessons = subjects.reduce(
    (total, item) =>
      total +
      item.lessons.filter(
        (currentLesson) =>
          (progress[currentLesson.id]?.attempts ?? 0) > 0
      ).length,
    0
  );

  const completionPercentage =
    totalLessons === 0
      ? 0
      : Math.round((completedLessons / totalLessons) * 100);

  function chooseSubject(id: string) {
    const nextSubject = subjects.find((item) => item.id === id);

    if (!nextSubject) return;

    setSelectedId(id);
    setSelectedLessonId(nextSubject.lessons[0]?.id ?? "");
  }

  return (
    <div className="app">
      <header className="header">
        <a className="brand" href="#" aria-label="LearnWorld home">
          <span className="brand-icon">✳</span>
          <span>Learn<span className="brand-light">World</span></span>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#subjects">Explore</a>
          <a href="#journey">My progress</a>
          <a href="#lessons">Lessons</a>
        </nav>

        <a className="header-cta" href="#subjects">
          Start learning <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main>
        {activePage === "secret" ? (
          <SecretBase onBack={() => setActivePage("home")} />
        ) : (
          <>
        <section className="hero">
          <div className="hero-copy">
            <div className="hero-pill">
              <span className="live-dot" />
              YOUR PERSONAL LEARNING SPACE
            </div>

            <h1>
              Big ideas,
              <br />
              <span className="gradient-text">made simple.</span>
            </h1>

            <p className="hero-description">
              Learning doesn’t have to feel complicated. Explore ideas,
              understand them through examples, and practise until
              everything clicks.
            </p>

            <div className="hero-actions">
              <a className="hero-primary" href="#subjects">
                Explore subjects <span aria-hidden="true">→</span>
              </a>

              <a className="hero-secondary" href="#lessons">
                <span className="play-icon" aria-hidden="true">▷</span>
                Continue learning
              </a>
            </div>

            <div className="hero-social-proof">
              <div className="avatar-stack" aria-hidden="true">
                <span>📘</span>
                <span>💡</span>
                <span>🚀</span>
              </div>
              <span>Curiosity first. Progress follows.</span>
            </div>
          </div>

          <div className="hero-art" aria-label="Illustration of a learning dashboard">
            <span className="orb orb-mint" />
            <span className="orb orb-lilac" />
            <span className="orb orb-blue" />
            <span className="floating-spark spark-one">✦</span>
            <span className="floating-spark spark-two">✳</span>

            <div className="visual-window">
              <div className="visual-window-top">
                <div className="window-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="window-label">YOUR LEARNING SPACE</span>
                <span className="window-menu">•••</span>
              </div>

              <div className="visual-welcome">
                <div>
                  <span className="visual-kicker">A LITTLE PROGRESS EVERY DAY</span>
                  <h2>Make today<br />a learning day.</h2>
                </div>

                <div className="welcome-illustration" aria-hidden="true">
                  <span className="illustration-sun">☀</span>
                  <span className="illustration-book">📚</span>
                  <span className="illustration-star">✦</span>
                </div>
              </div>

              <div className="visual-course-grid">
                <div className="visual-course visual-course-green">
                  <span className="visual-course-icon">⚛</span>
                  <span className="visual-course-label">PHYSICS</span>
                  <strong>Explore how<br />the world works</strong>
                  <span className="visual-course-subtitle">Concepts made clear</span>
                </div>

                <div className="visual-course visual-course-purple">
                  <span className="visual-course-icon">&lt;/&gt;</span>
                  <span className="visual-course-label">PROGRAMMING</span>
                  <strong>Turn ideas<br />into code</strong>
                  <span className="visual-course-subtitle">Learn by doing</span>
                </div>
              </div>

              <div className="visual-bottom-card">
                <span className="visual-bottom-icon">✧</span>
                <div className="visual-bottom-copy">
                  <strong>Every step counts</strong>
                  <span>Your next discovery is one lesson away.</span>
                </div>
                <span className="visual-arrow">↗</span>
              </div>
            </div>

            <div className="floating-note floating-note-top">
              <span className="floating-note-icon">💡</span>
              <span>Learn something<br /><strong>new today</strong></span>
            </div>

            <div className="floating-note floating-note-bottom">
              <span className="floating-note-icon">✓</span>
              <span><strong>Small steps</strong><br />Real progress</span>
            </div>
          </div>
        </section>

        <section className="feature-strip" aria-label="How LearnWorld works">
          <div className="feature-item">
            <span className="feature-symbol feature-symbol-green">✧</span>
            <div>
              <strong>Learn visually</strong>
              <p>Simple explanations and examples</p>
            </div>
          </div>

          <div className="feature-item">
            <span className="feature-symbol feature-symbol-purple">◎</span>
            <div>
              <strong>Practise actively</strong>
              <p>Test what you understand</p>
            </div>
          </div>

          <div className="feature-item">
            <span className="feature-symbol feature-symbol-blue">↗</span>
            <div>
              <strong>Track your progress</strong>
              <p>See which lessons you complete</p>
            </div>
          </div>
        </section>

        <section className="section-block" id="subjects">
          <div className="section-heading">
            <div>
              <span className="section-kicker">YOUR NEXT DISCOVERY</span>
              <h2>What will you learn today?</h2>
              <p>Choose a subject and start with one small idea.</p>
            </div>
            <span className="section-decoration" aria-hidden="true">✳</span>
          </div>

          <div className="subject-grid">
            {subjects.map((item, index) => (
              <div
                className={`subject-wrap subject-wrap-${index % 3}`}
                key={item.id}
              >
                <SubjectCard
                  subject={item}
                  selected={selectedId === item.id}
                  onSelect={() => chooseSubject(item.id)}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="journey-section" id="journey">
          <div className="journey-intro">
            <span className="section-kicker">YOUR LEARNING JOURNEY</span>
            <h2>Progress, one lesson at a time.</h2>
            <p>
              You don’t need to master everything at once. Keep exploring,
              practise what you learn, and build your understanding step by step.
            </p>

            <div className="journey-mini-stats">
              <div>
                <strong>{completedLessons}</strong>
                <span>Lessons completed</span>
              </div>
              <div>
                <strong>{attemptedLessons}</strong>
                <span>Lessons attempted</span>
              </div>
            </div>

            <span className="journey-doodle" aria-hidden="true">✧</span>
          </div>

          <div className="journey-panel">
            <div className="journey-panel-heading">
              <div>
                <span className="section-kicker">YOUR OVERVIEW</span>
                <h3>Keep moving forward</h3>
              </div>
              <span className="journey-panel-icon">↗</span>
            </div>

            <div className="journey-progress-summary">
              <div>
                <span>Overall completion</span>
                <strong>{completionPercentage}%</strong>
              </div>
              <div
                className="journey-progress-track"
                role="progressbar"
                aria-label="Overall lesson completion"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={completionPercentage}
              >
                <span style={{ width: `${completionPercentage}%` }} />
              </div>
              <p>
                {completedLessons} of {totalLessons} lessons completed
              </p>
            </div>

            <ProgressPanel
              subjects={subjects}
              progress={progress}
              onReset={resetProgress}
            />
          </div>
        </section>

        <section className="lesson-section" id="lessons">
          <div className="lesson-section-heading">
            <div>
              <span className="section-kicker">TIME TO GET HANDS-ON</span>
              <h2>Let’s understand something.</h2>
              <p>
                Read the explanation, explore the example, then try the question.
              </p>
            </div>
            <span className="lesson-heading-icon" aria-hidden="true">✎</span>
          </div>

          <LessonPanel
            key={`${subject.id}-${lesson.id}`}
            subject={subject}
            lesson={lesson}
            onSelectLesson={setSelectedLessonId}
            progress={progress[lesson.id]}
            onRecordAttempt={recordAttempt}
          />
        </section>
          </>
        )}
      </main>

      <footer className="footer">
        <a className="footer-brand" href="#">
          <span className="brand-icon">✳</span>
          LearnWorld
        </a>
        <span>Built for curious minds. Keep asking why. ✦</span>
        <div className="footer-actions">
          <button
            type="button"
            className="secret-entry"
            onClick={() => setActivePage(activePage === "secret" ? "home" : "secret")}
            aria-label={activePage === "secret" ? "Return to LearnWorld" : "Open the secret base"}
            title="A little hidden corner 🎀"
          >
            🎀
          </button>
          <a className="back-to-top" href="#" onClick={() => setActivePage("home")} aria-label="Back to top">
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
