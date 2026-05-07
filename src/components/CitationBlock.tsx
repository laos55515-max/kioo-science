// ============================================================
// КОМПОНЕНТ: CitationBlock.tsx
// Блок для отображения формул, цитат и кода с кнопкой копирования.
// Используется внутри ArticleModal.
// ── КАК ДОБАВИТЬ БЛОК: добавьте поле citation в sections[] в articles.ts
// ============================================================

import { useState } from "react";
import { Citation } from "../data/articles";

interface CitationBlockProps {
  citation: Citation;
}

// Иконки типов блоков
const typeConfig = {
  formula: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 7h16M4 12h10M4 17h7"/>
        <path d="M19 12l-3 5 3 5M16 17h6"/>
      </svg>
    ),
    label: "Формула",
  },
  citation: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
      </svg>
    ),
    label: "Цитата",
  },
  code: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    label: "Код / Данные",
  },
};

export default function CitationBlock({ citation }: CitationBlockProps) {
  const [copied, setCopied] = useState(false);
  const config = typeConfig[citation.type];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(citation.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback для устаревших браузеров
      const ta = document.createElement("textarea");
      ta.value = citation.content;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    // ── НАЧАЛО БЛОКА ЦИТАТЫ ──────────────────────────────────
    <div className="citation-block" style={{ borderRadius: "0 4px 4px 0" }}>
      {/* Заголовок блока */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: "var(--color-accent)",
          }}
        >
          {config.icon}
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.68rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {/* ── МЕТКА БЛОКА ── Замените label в articles.ts */}
            {citation.label || config.label}
          </span>
        </div>

        {/* ── КНОПКА КОПИРОВАНИЯ ─────────────────────────────── */}
        <button
          className={`copy-btn${copied ? " copied" : ""}`}
          onClick={handleCopy}
        >
          {copied ? (
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 6l3 3 7-7"/>
              </svg>
              Скопировано
            </span>
          ) : (
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
              </svg>
              Копировать
            </span>
          )}
        </button>
      </div>

      {/* ── СОДЕРЖИМОЕ БЛОКА ─────────────────────────────────── */}
      {/* Замените content в articles.ts */}
      <pre
        className="citation-code"
        style={{ margin: 0, fontFamily: citation.type === "citation" ? "var(--font-serif)" : undefined }}
      >
        {citation.content}
      </pre>
    </div>
    // ── КОНЕЦ БЛОКА ЦИТАТЫ ───────────────────────────────────
  );
}
