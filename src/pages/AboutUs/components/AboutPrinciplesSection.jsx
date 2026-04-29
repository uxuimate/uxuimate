const rows = [
  {
    n: '01',
    title: 'Research before pixels',
    text: 'We talk to your users and stakeholders before we touch a screen.'
  },
  {
    n: '02',
    title: 'One team. Full accountability.',
    text: 'The person you brief is the person who delivers.'
  },
  {
    n: '03',
    title: 'Design that earns its place',
    text: 'Every element has a job. No decoration. No guesswork.'
  },
  {
    n: '04',
    title: 'Honest advice, even when it costs us',
    text: "If we think you're solving the wrong problem, we'll tell you. We'd rather lose a project than deliver something that doesn't work."
  }
];

const AboutPrinciplesSection = () => {
  return (
    <section className="about-principles" id="about-principles" aria-labelledby="about-principles-heading">
      <div className="about-principles__glow" aria-hidden="true" />
      <div className="about-principles__mesh" aria-hidden="true" />
      <svg
        className="about-principles__ribbons"
        viewBox="0 0 1200 640"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="about-principles-ribbon" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(232, 25, 90, 0.38)" />
            <stop offset="1" stopColor="rgba(232, 168, 50, 0.28)" />
          </linearGradient>
        </defs>
        {/* Continuation of belief-section curves: arcs entering from the top */}
        <path
          d="M -20 90 Q 280 20 600 110 T 1220 70"
          fill="none"
          stroke="url(#about-principles-ribbon)"
          strokeWidth="0.45"
        />
        <path
          d="M 0 220 Q 450 160 900 240 T 1200 200"
          fill="none"
          opacity="0.42"
          stroke="url(#about-principles-ribbon)"
          strokeWidth="0.38"
        />
        <path
          d="M 100 380 Q 600 320 1100 420"
          fill="none"
          opacity="0.32"
          stroke="url(#about-principles-ribbon)"
          strokeWidth="0.35"
        />
      </svg>
      <svg
        className="about-principles__orb-echo"
        viewBox="0 0 520 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <ellipse cx="260" cy="240" opacity="0.4" rx="248" ry="188" stroke="currentColor" strokeWidth="0.55" />
        <ellipse
          cx="260"
          cy="240"
          opacity="0.32"
          rx="188"
          ry="248"
          stroke="currentColor"
          strokeWidth="0.5"
          transform="rotate(42 260 240)"
        />
        <path d="M 40 240 Q 260 40 480 240" opacity="0.28" stroke="currentColor" strokeWidth="0.45" />
      </svg>
      <div className="about-principles__bloom" aria-hidden="true" />

      <div className="about-principles__inner">
        <h2 id="about-principles-heading" className="about-principles__heading reveal-up">
          How we work
        </h2>
        <ul className="about-principles__list">
          {rows.map((row, i) => (
            <li key={row.n} className="about-principles__row reveal-up" data-delay={(i * 0.07).toFixed(2)}>
              <span className="about-principles__index" aria-hidden="true">
                {row.n}
              </span>
              <h3 className="about-principles__title">{row.title}</h3>
              <p className="about-principles__text">{row.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AboutPrinciplesSection;
