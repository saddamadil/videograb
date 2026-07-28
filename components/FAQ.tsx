'use client';

import { useState } from 'react';
import { faqs } from '@/lib/tools';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="faq-section">
      <h2 className="section-title">
        <span className="accent">FAQ</span>
      </h2>
      <p className="section-sub">Quick answers.</p>
      <div>
        {faqs.map((f, i) => (
          <div className={`faq-item${open === i ? ' open' : ''}`} key={f.q}>
            <button
              className="faq-q"
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? null : i)}
            >
              {f.q}
              <span className="faq-ic">
                <i className="bi bi-plus-lg" aria-hidden="true"></i>
              </span>
            </button>
            <div className="faq-a">
              <div className="faq-a-inner">{f.a}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
