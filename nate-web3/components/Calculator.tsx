'use client';
import { useState } from 'react';

interface Service { icon: string; name: string; desc: string; from: number; }
interface Props {
  t: {
    label: string; title: string; title_em: string; sub: string;
    empty: string; result_label: string; result_note: string;
    disclaimer: string; cta: string; services: Service[];
  };
}

export default function Calculator({ t }: Props) {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    const next = new Set(selected);
    next.has(i) ? next.delete(i) : next.add(i);
    setSelected(next);
  };

  const total = Array.from(selected).reduce((sum, i) => sum + t.services[i].from, 0);
  const fmt = (n: number) => n.toLocaleString('ru-RU') + ' ₽';

  return (
    <section id="calc" style={{ padding: '100px 20px', background: '#020B18', borderTop: '1px solid rgba(14,165,233,.08)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'inline-block', background: 'rgba(14,165,233,.1)', color: 'var(--cyan)', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '6px 16px', borderRadius: '100px', marginBottom: '16px' }}>{t.label}</div>
        <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: 'var(--white)', marginBottom: '12px' }}>
          {t.title} <span className="grad-text">{t.title_em}</span>
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--muted2)', marginBottom: '50px' }}>{t.sub}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {t.services.map((svc, i) => (
            <div
              key={i}
              onClick={() => toggle(i)}
              style={{
                background: selected.has(i) ? 'linear-gradient(145deg,#0E2A45,#061A2E)' : 'linear-gradient(145deg,#0A1E35,#04111E)',
                border: selected.has(i) ? '2px solid #0EA5E9' : '2px solid rgba(14,165,233,.1)',
                borderRadius: '20px', padding: '28px', cursor: 'pointer',
                transition: 'all .25s', position: 'relative',
                boxShadow: selected.has(i) ? '0 0 24px rgba(14,165,233,.15)' : 'none',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '28px', marginBottom: '10px' }}>{svc.icon}</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--white)', marginBottom: '6px' }}>{svc.name}</div>
                  <div style={{ fontSize: '13px', color: 'var(--muted2)' }}>{svc.desc}</div>
                </div>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                  background: selected.has(i) ? '#0EA5E9' : 'rgba(14,165,233,.1)',
                  border: selected.has(i) ? '2px solid #0EA5E9' : '2px solid rgba(14,165,233,.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', color: selected.has(i) ? '#fff' : 'transparent', transition: 'all .25s',
                }}>✓</div>
              </div>
              <div style={{ marginTop: '16px', fontSize: '15px', fontWeight: 700, color: 'var(--cyan)' }}>от {fmt(svc.from)}</div>
            </div>
          ))}
        </div>

        {selected.size === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)', fontSize: '15px' }}>{t.empty}</div>
        ) : (
          <div style={{ background: 'linear-gradient(145deg,#0E2040,#061830)', border: '1px solid rgba(14,165,233,.3)', borderRadius: '24px', padding: '36px 40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '13px', color: 'var(--muted2)', marginBottom: '8px' }}>{t.result_label}</div>
                <div className="grad-text" style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800 }}>от {fmt(total)}</div>
                <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '8px' }}>{t.result_note}</div>
              </div>
              <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'linear-gradient(135deg,#0EA5E9,#6B4EFF)', color: '#fff', fontSize: '14px', fontWeight: 700, padding: '14px 32px', borderRadius: '100px', textDecoration: 'none', whiteSpace: 'nowrap' }}>{t.cta}</a>
            </div>
            <div style={{ marginTop: '16px', fontSize: '13px', color: 'var(--muted)' }}>{t.disclaimer}</div>
          </div>
        )}
      </div>
    </section>
  );
}
