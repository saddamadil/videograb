export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-badge">
        <i className="bi bi-stars" aria-hidden="true"></i> 9 tools, 6 platforms, 1 free app
      </div>
      <h1>
        Download any video, <span className="accent">no strings attached.</span>
      </h1>
      <p className="hero-sub">
        YouTube, TikTok, Instagram, Facebook, Twitter and Pinterest — paste a link and grab it in
        seconds. No login, no watermark, no charge.
      </p>
      <div className="hero-stats">
        <div className="stat">
          <div className="stat-num">9</div>
          <div className="stat-label">Free tools</div>
        </div>
        <div className="stat">
          <div className="stat-num">4K</div>
          <div className="stat-label">Max quality</div>
        </div>
        <div className="stat">
          <div className="stat-num">0</div>
          <div className="stat-label">Watermarks</div>
        </div>
        <div className="stat">
          <div className="stat-num">0€</div>
          <div className="stat-label">Cost, ever</div>
        </div>
      </div>
    </section>
  );
}
