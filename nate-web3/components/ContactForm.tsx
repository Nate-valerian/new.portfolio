"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const PUBLIC_KEY = "87_f2ZcU4pQ0LZlpc";

interface ContactFormProps {
  formType?: "full" | "callback";
}

export default function ContactForm({ formType = "full" }: ContactFormProps) {
  const t = useTranslations("contact");
  const th = useTranslations("hero");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(14,165,233,.2)",
    borderRadius: formType === "callback" ? "100px" : "16px",
    padding: "14px 20px",
    color: "#E8F5EC",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
    width: "100%",
    transition: "border-color .2s",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, { from_name: name, phone, email, message }, PUBLIC_KEY);
      setSent(true);
    } catch {
      window.location.href = `mailto:m.moleva@mail.ru?subject=Заявка с сайта&body=Имя: ${encodeURIComponent(name)}%0AТелефон: ${encodeURIComponent(phone)}%0AEmail: ${encodeURIComponent(email)}%0A%0A${encodeURIComponent(message)}`;
      setSent(true);
    }
    setLoading(false);
  };

  if (sent) {
    return <p style={{ color: "#86EFAC", textAlign: "center", fontSize: "15px", fontWeight: 600, padding: "20px 0" }}>
      {formType === "callback" ? th("callback_success") : t("success")}
    </p>;
  }

  if (formType === "callback") {
    return (
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input style={inputStyle} placeholder={th("callback_name")} value={name} onChange={e => setName(e.target.value)} required />
        <input style={inputStyle} type="tel" placeholder={th("callback_phone")} value={phone} onChange={e => setPhone(e.target.value)} required />
        <button type="submit" disabled={loading} style={{ background: "linear-gradient(135deg,#0EA5E9,#6B4EFF)", color: "#fff", border: "none", padding: "13px 28px", borderRadius: "100px", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
          {loading ? "..." : th("callback_btn")}
        </button>
        <p style={{ fontSize: "11px", color: "#3D6B4A", textAlign: "center" }}>{th("callback_consent")}</p>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "500px", margin: "0 auto 32px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
        <input style={inputStyle} placeholder={t("name")} value={name} onChange={e => setName(e.target.value)} required />
        <input style={{ ...inputStyle, borderRadius: "16px" }} type="tel" placeholder={t("phone")} value={phone} onChange={e => setPhone(e.target.value)} required />
      </div>
      <input style={inputStyle} type="email" placeholder={t("email")} value={email} onChange={e => setEmail(e.target.value)} />
      <textarea style={{ ...inputStyle, borderRadius: "16px", resize: "vertical" }} placeholder={t("message")} value={message} onChange={e => setMessage(e.target.value)} rows={4} />
      <button type="submit" disabled={loading} style={{ background: "linear-gradient(135deg,#0EA5E9,#6B4EFF)", color: "#fff", border: "none", padding: "15px 28px", borderRadius: "100px", fontSize: "15px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 8px 24px rgba(14,165,233,.3)" }}>
        {loading ? "..." : t("submit")}
      </button>
      <p style={{ fontSize: "11px", color: "#3D6B4A", textAlign: "center" }}>{t("consent")}</p>
    </form>
  );
}
