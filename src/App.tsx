

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

  const totalLessons = subjects.reduce(
    (total, item) => total + item.lessons.length,
    0,
  );

  const completedLessons = subjects.reduce(
    (total, item) =>
      total +
      item.lessons.filter((itemLesson) => progress[itemLesson.id]?.completed)
        .length,
    0,
  );

  function chooseSubject(id: string) {
    const nextSubject = subjects.find((item) => item.id === id);
    if (!nextSubject) return;

    setSelectedId(id);
    setSelectedLessonId(nextSubject.lessons[0].id);
  }

  return (
    <div className="app">
      <header className="header">
        <a className="brand" href="#home" aria-label="LearnWorld home">
          <span className="brand-icon">✳</span>
          <span>learn<span className="brand-light">world</span></span>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#subjects">Explore</a>
          <a href="#progress">My progress</a>
          <a href="#lesson">Lessons</a>
        </nav>

        <a className="header-cta" href="#subjects">
          Start learning <span>↗</span>
        </a>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-copy">
            <div className="hero-pill">
              <span className="live-dot" />
              YOUR PERSONAL LEARNING SPACE
            </div>

            <h1>
              Make room
              <br />
              for <span className="gradient-text">wonder.</span>
            </h1>

            <p className="hero-description">
              Big ideas. Simple explanations. A little curiosity every day.
              Discover a better way to understand the things you learn.
            </p>

            <div className="hero-actions">
              <a className="hero-primary" href="#subjects">
                Explore lessons <span>↗</span>
              </a>
              <a className="hero-secondary" href="#progress">
                <span className="play-icon">▶</span>
                See your journey
              </a>
            </div>

            <div className="hero-social-proof">
              <div className="avatar-stack" aria-hidden="true">
                <span>📚</span>
                <span>🧠</span>
                <span>✨</span>
              </div>
              <div>
                <strong>Learn at your own pace</strong>
                <span>Curiosity is a great place to start.</span>
              </div>
            </div>
          </div>

          <div className="hero-art" aria-label="Learning dashboard preview">
            <div className="orb orb-mint" />
            <div className="orb orb-lilac" />
            <div className="orb orb-blue" />

            <div className="floating-spark spark-one">✦</div>
            <div className="floating-spark spark-two">✧</div>

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
                  <span className="visual-kicker">A LITTLE PROGRESS ADDS UP</span>
                  <h2>Keep exploring<span>.</span></h2>
                  <p>Every concept brings a new perspective.</p>
                </div>
                <div className="welcome-illustration">🌱</div>
              </div>

              <div className="visual-course-grid">
                <div className="visual-course visual-course-green">
                  <span className="visual-course-icon">⚛️</span>
                  <span className="visual-course-label">DISCOVER</span>
                  <strong>Science</strong>
                  <span className="visual-course-subtitle">Understand the why</span>
                </div>

                <div className="visual-course visual-course-purple">
                  <span className="visual-course-icon">💻</span>
                  <span className="visual-course-label">CREATE</span>
                  <strong>Programming</strong>
                  <span className="visual-course-subtitle">Build something new</span>
                </div>
              </div>

              <div className="visual-bottom-card">
                <div className="visual-bottom-icon">✧</div>
                <div className="visual-bottom-copy">
                  <strong>Your next small win</strong>
                  <span>One lesson. One new idea.</span>
                </div>
                <span className="visual-arrow">↗</span>
              </div>
            </div>

            <div className="floating-note floating-note-top">
              <span className="floating-note-icon">💡</span>
              <span>
                <strong>Ideas made simple</strong>
                <small>Understand, don't memorise.</small>
              </span>
            </div>

            <div className="floating-note floating-note-bottom">
              <span className="floating-note-icon">🎯</span>
              <span>
                <strong>{completedLessons} lessons completed</strong>
                <small>Your progress, your pace.</small>
              </span>
            </div>
          </div>
        </section>

        <section className="feature-strip" aria-label="Learning features">
          <div className="feature-item">
            <span className="feature-symbol feature-symbol-green">✳</span>
            <div>
              <strong>Simple explanations</strong>
              <span>Make difficult ideas click.</span>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-symbol feature-symbol-purple">◈</span>
            <div>
              <strong>Learn by doing</strong>
              <span>Examples and quick quizzes.</span>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-symbol feature-symbol-blue">↗</span>
            <div>
              <strong>Progress that matters</strong>
              <span>See what you've mastered.</span>
            </div>
          </div>
        </section>

        <section className="subjects section-block" id="subjects">
          <div className="section-heading">
            <div>
              <span className="section-kicker">YOUR NEXT ADVENTURE</span>
              <h2>What sparks your <span>curiosity?</span></h2>
              <p>Choose a path. Start with one idea. See where it takes you.</p>
            </div>
            <span className="section-decoration" aria-hidden="true">✳</span>
          </div>

          <div className="subject-grid">
            {subjects.map((item, index) => (
              <div className={`subject-wrap subject-wrap-${index % 3}`} key={item.id}>
                <SubjectCard
                  subject={item}
                  selected={selectedId === item.id}
                  onSelect={() => chooseSubject(item.id)}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="journey-section" id="progress">
          <div className="journey-intro">
            <span className="section-kicker">SMALL STEPS, BIG GROWTH</span>
            <h2>Your journey is <span>taking shape.</span></h2>
            <p>
              Every attempt teaches you something. Keep going and watch your
              understanding grow.
            </p>

            <div className="journey-mini-stats">
              <div>
                <strong>{completedLessons}<span>/{totalLessons}</span></strong>
                <small>Lessons completed</small>
              </div>
              <div>
                <strong>{Math.round((completedLessons / Math.max(totalLessons, 1)) * 100)}%</strong>
                <small>Journey completed</small>
              </div>
            </div>

            <div className="journey-doodle" aria-hidden="true">
              <span>✧</span><span>↗</span><span>✳</span>
            </div>
          </div>

          <div className="journey-panel">
            <ProgressPanel
              subjects={subjects}
              progress={progress}
              onReset={resetProgress}
            />
          </div>
        </section>

        <section className="lesson-section" id="lesson">
          <div className="section-heading lesson-section-heading">
            <div>
              <span className="section-kicker">TIME TO GET CURIOUS</span>
              <h2>Let's make it <span>click.</span></h2>
              <p>Read, explore the example, then test your understanding.</p>
            </div>
            <span className="lesson-heading-icon">✎</span>
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
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-icon">✳</span>
          <span>learn<span className="brand-light">world</span></span>
        </a>
        <span>Made for curious minds, one idea at a time.</span>
        <a className="back-to-top" href="#home">Back to top ↑</a>
      </footer>
    </div>
  );
}

export default App;
