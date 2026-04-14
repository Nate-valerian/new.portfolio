'use client';
import { useState } from 'react';

interface Props {
  t: { label: string; title: string; title_em: string; items: { q: string; a: string }[] };
}

export default function FAQ({ t }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" style={{ padding: '100px 20px', background: '#040D1C', borderTop: '1px solid rgba(14,165,233,.08)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'inline-block', background: 'rgba(14,165,233,.1)', color: 'var(--cyan)', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '6px 16px', borderRadius: '100px', marginBottom: '16px' }}>{t.label}</div>
        <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: 'var(--white)', marginBottom: '50px' }}>
          {t.title} <span className="grad-text">{t.title_em}</span>
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {t.items.map((item, i) => (
            <div
              key={i}
              style={{ background: 'linear-gradient(145deg,#0A1E35,#04111E)', border: '1px solid rgba(14,165,233,.12)', borderRadius: '20px', overflow: 'hidden', transition: 'all .3s' }}
            >
              <div
                onClick={() => setOpen(open === i ? null : i)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', padding: '28px 32px', cursor: 'pointer' }}
              >
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--white)' }}>{item.q}</div>
                <div style={{ color: 'var(--cyan)', fontSize: '22px', flexShrink: 0, transform: open === i ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform .3s' }}>+</div>
              </div>
              {open === i && (
                <div style={{ fontSize: '15px', color: 'var(--muted2)', lineHeight: 1.75, padding: '0 32px 28px' }}>{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
