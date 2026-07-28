'use client';

import { useMemo, useState } from 'react';
import { tools, Tool, API_BASE } from '@/lib/tools';

type PanelState = {
  url: string;
  quality: string;
  format: string;
  loading: boolean;
  loadingText: string;
  error: string;
  result: { filename: string; size: number } | null;
};

function initialState(tool: Tool): PanelState {
  return {
    url: '',
    quality: tool.quality?.find((_, i) => i === 0)?.label ?? 'best',
    format: tool.format[0]?.label.toLowerCase().split(' ')[0] ?? 'mp4',
    loading: false,
    loadingText: tool.loadingLabel,
    error: '',
    result: null,
  };
}

function isValidUrl(str: string) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

export default function Downloader({
  activeTool,
  setActiveTool,
}: {
  activeTool: number;
  setActiveTool: (id: number) => void;
}) {
  const tool = tools[activeTool];
  const [states, setStates] = useState<Record<number, PanelState>>(() =>
    Object.fromEntries(tools.map((t) => [t.id, initialState(t)]))
  );

  const state = states[activeTool];

  const darkLabel = !!tool.darkLabel;

  function patch(id: number, patch: Partial<PanelState>) {
    setStates((s) => ({ ...s, [id]: { ...s[id], ...patch } }));
  }

  async function handleDownload() {
    const url = state.url.trim();
    if (!url) {
      patch(tool.id, { error: 'Please enter a valid video URL to continue.', result: null });
      return;
    }
    if (!isValidUrl(url)) {
      patch(tool.id, { error: 'Invalid URL. Please paste a valid video link.', result: null });
      return;
    }

    patch(tool.id, { error: '', result: null, loading: true, loadingText: 'Processing your video...' });

    const wakeTimer = setTimeout(() => {
      patch(tool.id, { loadingText: 'Waking up the server, please wait a moment...' });
    }, 6000);

    try {
      const res = await fetch(API_BASE + '/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, tool: tool.id, quality: state.quality, format: state.format }),
      });
      clearTimeout(wakeTimer);

      const ctype = res.headers.get('Content-Type') || '';
      if (!res.ok || ctype.includes('application/json')) {
        let msg = 'Something went wrong. Please try again.';
        try {
          const j = await res.json();
          if (j && j.error) msg = j.error;
        } catch {}
        patch(tool.id, { loading: false, error: msg });
        return;
      }

      const blob = await res.blob();
      const cd = res.headers.get('Content-Disposition') || '';
      const m = cd.match(/filename\*?=(?:UTF-8'')?["']?([^"';]+)/i);
      const fname = m && m[1] ? decodeURIComponent(m[1]) : `vidgrab-download-${tool.id}.mp4`;

      const objUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objUrl;
      a.download = fname;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(objUrl), 4000);

      patch(tool.id, { loading: false, result: { filename: fname, size: blob.size } });
    } catch {
      clearTimeout(wakeTimer);
      patch(tool.id, {
        loading: false,
        error: 'Could not reach the server. It may be starting up — please wait a few seconds and try again.',
      });
    }
  }

  async function pasteURL() {
    try {
      const text = await navigator.clipboard.readText();
      patch(tool.id, { url: text.trim() });
    } catch {
      /* clipboard permission denied — user can type/paste manually */
    }
  }

  return (
    <section className="tools-section">
      <div className="breadcrumb">
        <a href="/">Home</a>
        <i className="bi bi-chevron-right" aria-hidden="true"></i>
        <span className="current">{tool.title}</span>
      </div>

      <div className="tool-tabs" role="tablist" style={{ marginTop: 22 }}>
        {tools.map((t) => (
          <button
            key={t.id}
            className={`tool-tab${activeTool === t.id ? ' active' : ''}${t.darkLabel ? ' dark-label' : ''}`}
            role="tab"
            title={t.title}
            style={activeTool === t.id ? ({ ['--tool' as any]: `var(--${t.accent})` } as React.CSSProperties) : undefined}
            onClick={() => setActiveTool(t.id)}
          >
            <i className={`bi ${t.tabIcon}`} aria-hidden="true"></i>
            <span>{t.tabLabel}</span>
          </button>
        ))}
      </div>

      <div className="downloader-card" style={{ ['--tool' as any]: `var(--${tool.accent})` } as React.CSSProperties}>
        <div className={`card-header${darkLabel ? ' dark-label' : ''}`}>
          <div className="card-icon">
            <i className={`bi ${tool.cardIcon}`} aria-hidden="true"></i>
          </div>
          <div>
            <div className="card-title">{tool.title}</div>
            <div className="card-desc">{tool.desc}</div>
          </div>
        </div>

        <div className="card-body">
          <div className="url-input-wrap">
            <div className="url-input-icon">
              <i className="bi bi-link-45deg" aria-hidden="true"></i>
            </div>
            <input
              className="url-input"
              type="url"
              placeholder={tool.placeholder}
              aria-label={tool.ariaLabel}
              value={state.url}
              onChange={(e) => patch(tool.id, { url: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleDownload();
                }
              }}
            />
            <button className="paste-btn" onClick={pasteURL}>
              <i className="bi bi-clipboard" aria-hidden="true"></i> Paste
            </button>
          </div>

          {tool.quality && (
            <div className="quality-row">
              {tool.quality.map((q) => (
                <button
                  key={q.label}
                  className={`quality-chip${state.quality === q.label ? ' selected' : ''}${darkLabel ? ' dark-label' : ''}`}
                  onClick={() => patch(tool.id, { quality: q.label })}
                >
                  {q.label}
                  {q.badge && <span className="quality-badge">{q.badge}</span>}
                </button>
              ))}
            </div>
          )}

          <div className="format-row">
            {tool.format.map((f) => {
              const val = f.label.toLowerCase().split(' ')[0];
              return (
                <button
                  key={f.label}
                  className={`format-chip${state.format === val ? ' selected' : ''}${darkLabel ? ' dark-label' : ''}`}
                  onClick={() => patch(tool.id, { format: val })}
                >
                  {f.icon && <i className={`bi ${f.icon}`} aria-hidden="true"></i>} {f.label}
                </button>
              );
            })}
          </div>

          <button className="dl-btn" onClick={handleDownload} disabled={state.loading}>
            <i className={`bi ${tool.buttonIcon}`} aria-hidden="true"></i> {tool.buttonLabel}
          </button>

          <div className={`loading-state${state.loading ? ' show' : ''}`}>
            <div className="spinner"></div>
            <div className="loading-text">{state.loadingText}</div>
          </div>

          <div className={`result-area${state.result ? ' show' : ''}`}>
            <div className="result-title">Your file is ready</div>
            <div className="download-links">
              {state.result && (
                <span className="dl-link">
                  <i className="bi bi-check-circle" aria-hidden="true"></i>
                  {state.result.filename}
                  {state.result.size ? ` · ${(state.result.size / 1048576).toFixed(1)} MB` : ''}
                </span>
              )}
            </div>
          </div>

          <div className={`error-area${state.error ? ' show' : ''}`}>
            <i className="bi bi-exclamation-triangle-fill" aria-hidden="true"></i>
            <span>{state.error}</span>
          </div>

          {tool.features && (
            <div className="features-grid" style={{ marginTop: 26 }}>
              {tool.features.map((f) => (
                <div className="feature-item" key={f.title}>
                  <div className="feature-icon">
                    <i className={`bi ${f.icon}`} aria-hidden="true"></i>
                  </div>
                  <div className="feature-text">
                    <h4>{f.title}</h4>
                    <p>{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
