import "./SecretBase.css";

type SecretBaseProps = {
  onBack: () => void;
};

const littleThings = [
  {
    icon: "🎀",
    title: "A little pink bow",
    text: "A tiny detail to make this corner feel soft, playful, and yours.",
  },
  {
    icon: "🍓",
    title: "Sweet little favourites",
    text: "Strawberries and Dairy Milk Silk with nuts — a small, sweet nod to things you like.",
  },
  {
    icon: "🌷",
    title: "A gentle reminder",
    text: "You don’t have to have everything figured out today. One step at a time is still progress.",
  },
];

export default function SecretBase({ onBack }: SecretBaseProps) {
  return (
    <section className="secret-base" aria-labelledby="secret-title">
      <div className="secret-glow secret-glow-one" aria-hidden="true" />
      <div className="secret-glow secret-glow-two" aria-hidden="true" />

      <header className="secret-topbar">
        <button type="button" className="secret-back" onClick={onBack}>
          <span aria-hidden="true">←</span> Back to LearnWorld
        </button>
        <span className="secret-bow" aria-hidden="true">🎀</span>
      </header>

      <div className="secret-hero">
        <span className="secret-eyebrow"><span /> A LITTLE CORNER OF ITS OWN</span>
        <h1 id="secret-title">Welcome to your<br /><span>secret little world.</span></h1>
        <p className="secret-intro">
          A quiet corner for soft colours, small joys, and reminders that the little things matter.
        </p>
        <div className="secret-heartline" aria-hidden="true">
          <span /> ♡ <span />
        </div>
      </div>

      <div className="secret-note glass-card">
        <div className="secret-note-mark" aria-hidden="true">✧</div>
        <div>
          <span className="secret-card-kicker">A NOTE FOR TODAY</span>
          <h2>You are allowed to grow at your own pace.</h2>
          <p>
            Your progress doesn’t need to look like anyone else’s. Keep your curiosity,
            protect your peace, and give yourself credit for the small steps too.
          </p>
        </div>
      </div>

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
        <p>May this little corner remind you that you matter, exactly as you are.</p>
        <span className="secret-signoff-stars" aria-hidden="true">✧ ♡ ✧</span>
      </div>

      <p className="secret-disclaimer">
        This is a hidden design page, not a secured private account. Private access can be added later with authentication.
      </p>
    </section>
  );
}
