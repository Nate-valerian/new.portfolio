"use client";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggle = () => {
    const next = locale === "ru" ? "en" : "ru";
    document.cookie = `locale=${next}; path=/; max-age=31536000`;
    const newPath = pathname.replace(`/${locale}`, `/${next}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={toggle}
      style={{
        background: "rgba(14,165,233,.12)",
        border: "1px solid rgba(14,165,233,.3)",
        color: "#0EA5E9",
        fontSize: "12px",
        fontWeight: 700,
        padding: "8px 16px",
        borderRadius: "100px",
        cursor: "pointer",
        letterSpacing: "1px",
        transition: "all .2s",
      }}
    >
      {locale === "ru" ? "EN" : "RU"}
    </button>
  );
}
