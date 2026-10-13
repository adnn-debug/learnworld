import { useState, type FormEvent } from "react";
import "./SecretGate.css";

type SecretGateProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

const privacyQuestions = [
  {
    question: "What’s your favourite colour?",
    acceptedAnswers: ["burgundy", "coffee nude", "burgundy and coffee nude"],
  },
  {
    question: "What’s your favourite emoji?",
    acceptedAnswers: ["🎀", "pink bow", "pink bow emoji"],
  },
  {
    question: "By what name does your stupid call you?",
    acceptedAnswers: ["madam"],
  },
];

function normalise(value: string) {
  return value.trim().toLocaleLowerCase().replace(/\s+/g, " ");
}

export default function SecretGate({ onSuccess, onCancel }: SecretGateProps) {
  const [name, setName] = useState("");
  const [nameAccepted, setNameAccepted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  function submitName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (normalise(name) !== "saniya") {
      setError("This private learning space is only for the invited learner.");
      return;
    }

    setNameAccepted(true);
    setError("");
  }

  function submitAnswer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const currentQuestion = privacyQuestions[questionIndex];
    const submitted = normalise(answer);
    const accepted = currentQuestion.acceptedAnswers.some(
      (item) => normalise(item) === submitted,
    );

    if (!accepted) {
      setError("That answer doesn’t match. Please try again.");
      setAnswer("");
      return;
    }

    setError("");
    setAnswer("");

    if (questionIndex === privacyQuestions.length - 1) {
      onSuccess();
      return;
    }

    setQuestionIndex((index) => index + 1);
  }

  return (
    <section className="secret-gate" aria-labelledby="secret-gate-title">
      <div className="secret-gate-glow secret-gate-glow-one" aria-hidden="true" />
      <div className="secret-gate-glow secret-gate-glow-two" aria-hidden="true" />

      <button className="secret-gate-back" type="button" onClick={onCancel}>
        ← Back to LearnWorld
      </button>

      <div className="secret-gate-card">
        <span className="secret-gate-bow" aria-hidden="true">🎀</span>
        <span className="secret-gate-eyebrow">A PRIVATE LEARNING CORNER</span>
        <h1 id="secret-gate-title">
          {nameAccepted ? "A few things only you know." : "Before you step inside…"}
        </h1>
        <p className="secret-gate-description">
          {nameAccepted
            ? "Answer each privacy question to continue to your learning space."
            : "This little space has an entry check. Start by entering your first name."}
        </p>

        {!nameAccepted ? (
          <form className="secret-gate-form" onSubmit={submitName}>
            <label htmlFor="secret-first-name">Your first name</label>
            <input
              id="secret-first-name"
              type="text"
              autoComplete="off"
              autoCapitalize="none"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setError("");
              }}
              placeholder="Enter first name"
              required
              autoFocus
            />
            {error && <p className="secret-gate-error" role="alert">{error}</p>}
            <button className="secret-gate-submit" type="submit">
              Continue <span aria-hidden="true">→</span>
            </button>
          </form>
        ) : (
          <form className="secret-gate-form" onSubmit={submitAnswer}>
            <div className="secret-gate-progress" aria-label={`Question ${questionIndex + 1} of ${privacyQuestions.length}`}>
              {privacyQuestions.map((item, index) => (
                <span
                  key={item.question}
                  className={index <= questionIndex ? "is-current" : ""}
                />
              ))}
            </div>
            <span className="secret-gate-question-count">
              QUESTION {questionIndex + 1} OF {privacyQuestions.length}
            </span>
            <label className="secret-gate-question" htmlFor="secret-answer">
              {privacyQuestions[questionIndex].question}
            </label>
            <input
              id="secret-answer"
              type="text"
              autoComplete="off"
              value={answer}
              onChange={(event) => {
                setAnswer(event.target.value);
                setError("");
              }}
              placeholder="Your answer"
              required
              autoFocus
            />
            {error && <p className="secret-gate-error" role="alert">{error}</p>}
            <button className="secret-gate-submit" type="submit">
              {questionIndex === privacyQuestions.length - 1 ? "Enter private space" : "Next question"}
              <span aria-hidden="true">→</span>
            </button>
          </form>
        )}

        <p className="secret-gate-footer">
          <span aria-hidden="true">✧</span> A quiet place to learn, at your own pace.
        </p>
      </div>
    </section>
  );
}
