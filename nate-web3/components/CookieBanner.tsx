'use client';
import { useState, useEffect } from 'react';

interface Props {
  t: { text: string; privacy: string; btn: string };
}

export default function CookieBanner({ t }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookieAccepted')) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 9998, width: 'calc(100% - 40px)', maxWidth: '700px', background: 'linear-gradient(145deg,#0A1E35,#061522)', border: '1px solid rgba(14,165,233,.3)', borderRadius: '20px', padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', boxShadow: '0 8px 40px rgba(2,11,24,.8)' }}>
      <div style={{ fontSize: '14px', color: 'var(--muted2)', lineHeight: 1.6, flex: 1, minWidth: '200px' }}>
        🍪 {t.text} <a href="#privacy" style={{ color: 'var(--cyan)' }}>{t.privacy}</a>.
      </div>
      <button
        onClick={() => { localStorage.setItem('cookieAccepted', 'true'); setVisible(false); }}
        style={{ background: 'linear-gradient(135deg,#0EA5E9,#6B4EFF)', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit' }}
      >
        {t.btn}
      </button>
    </div>
  );
}
