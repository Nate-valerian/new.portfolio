"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const services = [
  { icon: "🌐", key: "s1", min: 25000 },
  { icon: "🛒", key: "s2", min: 100000 },
  { icon: "📱", key: "s3", min: 300000 },
  { icon: "🤖", key: "s4", min: 200000 },
  { icon: "🎬", key: "s5", min: 100000 },
  { icon: "🏦", key: "s6", min: 1000000 },
];

export default function PriceCalculator() {
  const t = useTranslations("calc");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const total = services
    .filter(s => selected.has(s.key))
    .reduce((sum, s) => sum + s.min, 0);

  const fmt = (n: number) => n.toLocaleString("ru-RU") + " ₽";

  return (
    <section id="calc" style={{ padding: "100px 20px", background: "#020B18", borderTop: "1px solid rgba(14,165,233,.08)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "inline-block", background: "rgba(14,165,233,.1)", color: "#0EA5E9", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", padding: "6px 16px", borderRadius: "100px", marginBottom: "16px" }}>
          {t("label")}
        </div>
        <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: "#E8F5EC", marginBottom: "12px" }}>
          {t("title")}{" "}
          <span style={{ background: "linear-gradient(135deg,#0EA5E9,#6B4EFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {t("title_accent")}
          </span>
        </h2>
        <p style={{ fontSize: "16px", color: "#7AAF87", marginBottom: "50px" }}>{t("subtitle")}</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "16px", marginBottom: "32px" }}>
          {services.map(s => (
            <div
              key={s.key}
              onClick={() => toggle(s.key)}
              style={{
                background: selected.has(s.key) ? "linear-gradient(145deg,#0E2A45,#061A2E)" : "linear-gradient(145deg,#0A1E35,#04111E)",
                border: selected.has(s.key) ? "2px solid #0EA5E9" : "2px solid rgba(14,165,233,.1)",
                borderRadius: "20px", padding: "28px", cursor: "pointer",
                transition: "all .25s",
                boxShadow: selected.has(s.key) ? "0 0 24px rgba(14,165,233,.15)" : "none",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: "24px", marginBottom: "10px" }}>{s.icon}</div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "#E8F5EC", marginBottom: "6px" }}>{t(`${s.key}_name`)}</div>
                  <div style={{ fontSize: "13px", color: "#7AAF87" }}>{t(`${s.key}_desc`)}</div>
                </div>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  background: selected.has(s.key) ? "#0EA5E9" : "rgba(14,165,233,.1)",
                  border: selected.has(s.key) ? "2px solid #0EA5E9" : "2px solid rgba(14,165,233,.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: selected.has(s.key) ? "#fff" : "transparent",
                  fontSize: "13px", flexShrink: 0, transition: "all .25s",
                }}>✓</div>
              </div>
              <div style={{ marginTop: "16px", fontSize: "15px", fontWeight: 700, color: "#0EA5E9" }}>{t(`${s.key}_price` as any)}</div>
            </div>
          ))}
        </div>

        {selected.size > 0 ? (
          <div style={{ background: "linear-gradient(145deg,#0E2040,#061830)", border: "1px solid rgba(14,165,233,.3)", borderRadius: "24px", padding: "36px 40px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
              <div>
                <div style={{ fontSize: "13px", color: "#7AAF87", marginBottom: "8px" }}>{t("result_label")}</div>
                <div style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, background: "linear-gradient(135deg,#0EA5E9,#6B4EFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  от {fmt(total)}
                </div>
                <div style={{ fontSize: "13px", color: "#3D6B4A", marginTop: "8px" }}>{t("result_note")}</div>
              </div>
              <Link href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "linear-gradient(135deg,#0EA5E9,#6B4EFF)", color: "#fff", fontSize: "14px", fontWeight: 700, padding: "14px 32px", borderRadius: "100px", textDecoration: "none", whiteSpace: "nowrap" }}>
                {t("cta")}
              </Link>
            </div>
            <p style={{ marginTop: "16px", fontSize: "13px", color: "#3D6B4A" }}>{t("result_disclaimer")}</p>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px", color: "#3D6B4A", fontSize: "15px" }}>{t("empty")}</div>
        )}
      </div>
    </section>
  );
}
