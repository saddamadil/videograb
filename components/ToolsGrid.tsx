'use client';

import { tools } from '@/lib/tools';

export default function ToolsGrid({ onSelect }: { onSelect: (id: number) => void }) {
  return (
    <section className="all-tools-section">
      <h2 className="section-title">
        All <span className="accent">Tools</span>
      </h2>
      <p className="section-sub">Pick a platform, start free.</p>
      <div className="tools-grid">
        {tools.map((t) => (
          <div
            key={t.id}
            className="tool-card"
            style={{ ['--tc' as any]: `var(--${t.accent})` } as React.CSSProperties}
            onClick={() => onSelect(t.id)}
          >
            <div className={`tool-card-icon${t.darkLabel ? ' dark-label' : ''}`}>
              <i className={`bi ${t.tabIcon}`} aria-hidden="true"></i>
            </div>
            <div className="tool-card-name">{t.title.replace(' Downloader', '')}</div>
            <div className="tool-card-desc">{t.gridDesc}</div>
            <div className="tool-card-arrow">
              Open <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
