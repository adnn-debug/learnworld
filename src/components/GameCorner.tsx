import { useState } from "react";
import "./GameCorner.css";

type GameMode = "memory" | "quest" | "battle" | "lab";

const modes: { id: GameMode; icon: string; name: string; tagline: string }[] = [
  { id: "memory", icon: "🧠", name: "Memory Match", tagline: "Flip, remember, match" },
  { id: "quest", icon: "🗺️", name: "Concept Quest", tagline: "Choose your next move" },
  { id: "battle", icon: "⚡", name: "Quiz Battle", tagline: "Build your streak" },
  { id: "lab", icon: "🧪", name: "Mystery Lab", tagline: "Think like a scientist" },
];

const memoryDeck = [
  { id: 1, pair: "atom", face: "⚛️", label: "Atom" },
  { id: 2, pair: "atom", face: "⚛️", label: "Atom" },
  { id: 3, pair: "code", face: "</>", label: "Code" },
  { id: 4, pair: "code", face: "</>", label: "Code" },
  { id: 5, pair: "book", face: "📚", label: "Book" },
  { id: 6, pair: "book", face: "📚", label: "Book" },
  { id: 7, pair: "star", face: "⭐", label: "Star" },
  { id: 8, pair: "star", face: "⭐", label: "Star" },
];

const questQuestions = [
  { prompt: "Which part of a C program stores a value that can change?", options: ["Variable", "Comment", "Operator"], answer: 0, note: "A variable names a storage location whose value can change." },
  { prompt: "What keeps planets in orbit around the Sun?", options: ["Sound", "Gravity", "Friction"], answer: 1, note: "Gravity provides the centripetal acceleration that keeps planets in orbit." },
  { prompt: "Which word is closest in meaning to 'curious'?", options: ["Eager to know", "Uninterested", "Exhausted"], answer: 0, note: "Curious means eager to know, learn, or understand." },
];

const battleQuestions = [
  { prompt: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Utility", "Core Program User"], answer: 0, note: "CPU means Central Processing Unit." },
  { prompt: "What is the SI unit of force?", options: ["Joule", "Newton", "Watt"], answer: 1, note: "Force is measured in newtons (N)." },
  { prompt: "Which loop checks its condition before each iteration?", options: ["while loop", "Only do-while", "Neither"], answer: 0, note: "A while loop checks the condition before the loop body runs." },
  { prompt: "Choose the correct plural of 'analysis'.", options: ["Analysises", "Analyses", "Analysis"], answer: 1, note: "The plural of analysis is analyses." },
  { prompt: "Which data structure follows FIFO?", options: ["Stack", "Queue", "Tree"], answer: 1, note: "A queue follows first in, first out (FIFO)." },
];

const labCases = [
  { title: "The disappearing shadow", scene: "A plant's shadow becomes shorter around noon. What is the best explanation?", options: ["The Sun appears higher in the sky", "The plant loses mass", "Gravity switches off"], answer: 0, note: "Near noon, the Sun is usually higher in the sky, so the shadow is shorter." },
  { title: "The mystery bug", scene: "A loop should print numbers 1 to 5, but it prints only 1 to 4. What should you inspect first?", options: ["The screen brightness", "The loop condition and boundary", "The variable's colour"], answer: 1, note: "Off-by-one errors commonly come from the loop condition or starting/ending values." },
  { title: "The word detective", scene: "You meet an unfamiliar word in a paragraph. What is the best first move?", options: ["Ignore every surrounding word", "Use the sentence context for clues", "Assume it means the opposite"], answer: 1, note: "Context, word parts, and nearby examples can help infer a likely meaning." },
];

function shuffledMemory() {
  return [...memoryDeck].sort(() => Math.random() - 0.5);
}

export default function GameCorner() {
  const [mode, setMode] = useState<GameMode>("memory");
  const [deck, setDeck] = useState(shuffledMemory);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [questIndex, setQuestIndex] = useState(0);
  const [questChoice, setQuestChoice] = useState<number | null>(null);
  const [questChecked, setQuestChecked] = useState(false);
  const [battleIndex, setBattleIndex] = useState(0);
  const [battleChoice, setBattleChoice] = useState<number | null>(null);
  const [battleChecked, setBattleChecked] = useState(false);
  const [battleScore, setBattleScore] = useState(0);
  const [battleStreak, setBattleStreak] = useState(0);
  const [labIndex, setLabIndex] = useState(0);
  const [labChoice, setLabChoice] = useState<number | null>(null);
  const [labChecked, setLabChecked] = useState(false);

  const quest = questQuestions[questIndex % questQuestions.length];
  const battle = battleQuestions[battleIndex % battleQuestions.length];
  const lab = labCases[labIndex % labCases.length];

  function selectMode(next: GameMode) {
    setMode(next);
  }

  function flipCard(cardId: number) {
    if (flipped.includes(cardId) || matched.some((pair) => deck.find((card) => card.id === cardId)?.pair === pair) || flipped.length === 2) return;
    const nextFlipped = [...flipped, cardId];
    setFlipped(nextFlipped);
    if (nextFlipped.length === 2) {
      setMoves((value) => value + 1);
      const first = deck.find((card) => card.id === nextFlipped[0]);
      const second = deck.find((card) => card.id === nextFlipped[1]);
      if (first && second && first.pair === second.pair) {
        setMatched((value) => [...value, first.pair]);
        setFlipped([]);
      } else {
        window.setTimeout(() => setFlipped([]), 750);
      }
    }
  }

  function resetMemory() {
    setDeck(shuffledMemory());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  }

  function nextQuest() {
    setQuestIndex((value) => value + 1);
    setQuestChoice(null);
    setQuestChecked(false);
  }

  function submitBattle() {
    if (battleChoice === null || battleChecked) return;
    const correct = battleChoice === battle.answer;
    setBattleChecked(true);
    if (correct) {
      setBattleScore((value) => value + 1);
      setBattleStreak((value) => value + 1);
    } else {
      setBattleStreak(0);
    }
  }

  function nextBattle() {
    setBattleIndex((value) => value + 1);
    setBattleChoice(null);
    setBattleChecked(false);
  }

  function nextLab() {
    setLabIndex((value) => value + 1);
    setLabChoice(null);
    setLabChecked(false);
  }

  return (
    <section className="game-corner" id="game-corner" aria-labelledby="game-corner-title">
      <div className="game-corner-spark game-corner-spark-one" aria-hidden="true">✦</div>
      <div className="game-corner-spark game-corner-spark-two" aria-hidden="true">✧</div>
      <header className="game-corner-heading">
        <div>
          <span className="game-corner-kicker">A PLAYFUL DETOUR</span>
          <h2 id="game-corner-title">The <span>Game Corner</span></h2>
          <p>Little challenges for curious minds. Play a round, learn a thing, and come back stronger. 🎀</p>
        </div>
        <div className="game-corner-mascot" aria-hidden="true">🧸<span>✦</span></div>
      </header>

      <div className="game-mode-grid" role="tablist" aria-label="Choose a mini-game">
        {modes.map((item) => (
          <button type="button" role="tab" aria-selected={mode === item.id} className={`game-mode-card ${mode === item.id ? "active" : ""}`} key={item.id} onClick={() => selectMode(item.id)}>
            <span className="game-mode-icon">{item.icon}</span>
            <strong>{item.name}</strong>
            <small>{item.tagline}</small>
            <span className="game-mode-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </div>

      <div className="game-play-board" role="tabpanel">
        {mode === "memory" && (
          <div className="mini-game-content">
            <div className="mini-game-title-row">
              <div><span className="game-corner-kicker">GAME 01 · MEMORY</span><h3>Find the matching pairs</h3><p>Flip two cards at a time. Remember where each symbol lives.</p></div>
              <div className="game-score-pill">Moves <strong>{moves}</strong></div>
            </div>
            <div className="memory-grid">
              {deck.map((card) => {
                const isMatched = matched.includes(card.pair);
                const isFlipped = flipped.includes(card.id) || isMatched;
                return <button type="button" key={card.id} className={`memory-card ${isFlipped ? "flipped" : ""} ${isMatched ? "matched" : ""}`} onClick={() => flipCard(card.id)} aria-label={isFlipped ? card.label : "Reveal card"} disabled={isMatched}>
                  <span className="memory-card-back">🎀</span><span className="memory-card-face">{card.face}</span>
                </button>;
              })}
            </div>
            <div className="game-bottom-row"><p role="status">{matched.length === 4 ? `Perfect! All pairs found in ${moves} moves. ✨` : `${matched.length} of 4 pairs found`}</p><button type="button" className="game-soft-button" onClick={resetMemory}>Shuffle & play again ↻</button></div>
          </div>
        )}

        {mode === "quest" && (
          <div className="mini-game-content">
            <div className="mini-game-title-row"><div><span className="game-corner-kicker">GAME 02 · ADVENTURE</span><h3>Concept Quest</h3><p>Pick the strongest answer to unlock the next little challenge.</p></div><span className="game-big-emoji" aria-hidden="true">🗺️</span></div>
            <div className="quest-progress"><span style={{ width: `${((questIndex % questQuestions.length) + 1) / questQuestions.length * 100}%` }} /></div>
            <h4 className="game-question">{quest.prompt}</h4>
            <div className="game-answer-list">{quest.options.map((option, index) => <button type="button" key={option} className={`game-answer ${questChecked && index === quest.answer ? "right" : ""} ${questChecked && questChoice === index && index !== quest.answer ? "wrong" : ""} ${questChoice === index ? "selected" : ""}`} disabled={questChecked} onClick={() => setQuestChoice(index)}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div>
            {questChecked && <p className="game-feedback" role="status">{quest.note}</p>}
            <div className="game-bottom-row"><p>Challenge {(questIndex % questQuestions.length) + 1} / {questQuestions.length}</p>{!questChecked ? <button type="button" className="game-primary-button" disabled={questChoice === null} onClick={() => setQuestChecked(true)}>Lock answer</button> : <button type="button" className="game-primary-button" onClick={nextQuest}>Next challenge →</button>}</div>
          </div>
        )}

        {mode === "battle" && (
          <div className="mini-game-content">
            <div className="mini-game-title-row"><div><span className="game-corner-kicker">GAME 03 · QUICK FIRE</span><h3>Quiz Battle</h3><p>One question at a time. Correct answers grow your score and streak.</p></div><div className="battle-stats"><span>⭐ {battleScore} points</span><span>🔥 {battleStreak} streak</span></div></div>
            <div className="quest-progress"><span style={{ width: `${((battleIndex % battleQuestions.length) + 1) / battleQuestions.length * 100}%` }} /></div>
            <h4 className="game-question">{battle.prompt}</h4>
            <div className="game-answer-list">{battle.options.map((option, index) => <button type="button" key={option} className={`game-answer ${battleChecked && index === battle.answer ? "right" : ""} ${battleChecked && battleChoice === index && index !== battle.answer ? "wrong" : ""} ${battleChoice === index ? "selected" : ""}`} disabled={battleChecked} onClick={() => setBattleChoice(index)}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div>
            {battleChecked && <p className="game-feedback" role="status">{battle.note}</p>}
            <div className="game-bottom-row"><p>Round {(battleIndex % battleQuestions.length) + 1} · Best played with curiosity</p>{!battleChecked ? <button type="button" className="game-primary-button" disabled={battleChoice === null} onClick={submitBattle}>Submit answer</button> : <button type="button" className="game-primary-button" onClick={nextBattle}>Next round →</button>}</div>
          </div>
        )}

        {mode === "lab" && (
          <div className="mini-game-content">
            <div className="mini-game-title-row"><div><span className="game-corner-kicker">GAME 04 · CASE FILE</span><h3>Mystery Lab</h3><p>Study the clues, make a hypothesis, then reveal the explanation.</p></div><span className="game-big-emoji" aria-hidden="true">🧪</span></div>
            <div className="mystery-scene"><span>CASE FILE #{String((labIndex % labCases.length) + 1).padStart(2, "0")}</span><p>{lab.scene}</p></div>
            <div className="game-answer-list">{lab.options.map((option, index) => <button type="button" key={option} className={`game-answer ${labChecked && index === lab.answer ? "right" : ""} ${labChecked && labChoice === index && index !== lab.answer ? "wrong" : ""} ${labChoice === index ? "selected" : ""}`} disabled={labChecked} onClick={() => setLabChoice(index)}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div>
            {labChecked && <p className="game-feedback" role="status">{lab.note}</p>}
            <div className="game-bottom-row"><p>Observation before assumption.</p>{!labChecked ? <button type="button" className="game-primary-button" disabled={labChoice === null} onClick={() => setLabChecked(true)}>Test hypothesis</button> : <button type="button" className="game-primary-button" onClick={nextLab}>Open next case →</button>}</div>
          </div>
        )}
      </div>
      <p className="game-corner-footnote">No grades here. Just curiosity, tiny wins, and another chance to try. ✧</p>
    </section>
  );
}
