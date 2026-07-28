'use client';

import { navGroups } from '@/lib/tools';

export default function Nav({
  activeGroup,
  onSelectGroup,
}: {
  activeGroup: number;
  onSelectGroup: (toolId: number) => void;
}) {
  return (
    <nav>
      <div className="nav-inner">
        <a href="/" className="logo">
          <span className="logo-icon">
            <i className="bi bi-download" aria-hidden="true"></i>
          </span>
          Vid<span className="accent">Grab</span>
        </a>
        <div className="nav-pills">
          {navGroups.map((g, i) => (
            <button
              key={g.label}
              className={`nav-pill${activeGroup === i ? ' active' : ''}`}
              onClick={() => onSelectGroup(g.firstTool)}
            >
              <i className={`bi ${g.icon}`} aria-hidden="true"></i> {g.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
