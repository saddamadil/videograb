const steps = [
  { num: '01', icon: 'bi-clipboard-plus', title: 'Copy Link' },
  { num: '02', icon: 'bi-ui-checks', title: 'Pick Format' },
  { num: '03', icon: 'bi-cloud-download', title: 'Download' },
  { num: '04', icon: 'bi-play-btn', title: 'Enjoy' },
];

export default function HowItWorks() {
  return (
    <section className="how-section">
      <h2 className="section-title">
        How It <span className="accent">Works</span>
      </h2>
      <p className="section-sub">Three steps. That's it.</p>
      <div className="steps-grid">
        {steps.map((s) => (
          <div className="step" key={s.num}>
            <div className="step-num">{s.num}</div>
            <div className="step-icon">
              <i className={`bi ${s.icon}`} aria-hidden="true"></i>
            </div>
            <h3>{s.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
