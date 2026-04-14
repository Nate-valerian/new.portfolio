'use client';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLang = (lang: string) => {
    document.cookie = `lang=${lang};path=/;max-age=31536000`;
    const newPath = pathname.replace(`/${locale}`, `/${lang}`);
    router.push(newPath);
    router.refresh();
  };

  return (
    <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,.06)', borderRadius: '100px', padding: '3px' }}>
      {['ru', 'en'].map(lang => (
        <button
          key={lang}
          onClick={() => switchLang(lang)}
          style={{
            padding: '6px 14px',
            borderRadius: '100px',
            border: 'none',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all .2s',
            background: locale === lang ? 'var(--cyan)' : 'transparent',
            color: locale === lang ? '#020B18' : 'var(--muted2)',
          }}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
