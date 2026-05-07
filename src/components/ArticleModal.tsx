// ============================================================
// КОМПОНЕНТ: ArticleModal.tsx
// Полный текст статьи — открывается как модальное окно.
// ── СТРУКТУРА: header image → мета → секции (текст + фото + цитата)
// ── КАК ДОБАВИТЬ СЕКЦИЮ: добавьте элемент в sections[] в articles.ts
// ============================================================

import { useEffect } from "react";
import { ArticleData } from "../data/articles";
import CitationBlock from "./CitationBlock";

interface ArticleModalProps {
  article: ArticleData;
  onClose: () => void;
}

// Цвета тегов (дублирует ArticleCard — можно вынести в утилиту)
const tagColors: Record<string, { bg: string; text: string }> = {
  Физика:     { bg: "#e8f0f7", text: "#2f6690" },
  Биология:   { bg: "#e8f5e9", text: "#2e7d32" },
  Астрономия: { bg: "#ede7f6", text: "#512da8" },
  Химия:      { bg: "#fff3e0", text: "#e65100" },
  Нейронауки: { bg: "#fce4ec", text: "#c62828" },
  Математика: { bg: "#e0f7fa", text: "#006064" },
  Экология:   { bg: "#f1f8e9", text: "#558b2f" },
  Технологии: { bg: "#e8eaf6", text: "#283593" },
};

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  const tagStyle = tagColors[article.tag] || { bg: "#e8f0f7", text: "#2f6690" };

  // Блокируем скролл страницы при открытом модале
  useEffect(() => {
    document.body.classList.add("modal-open");
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <>
      {/* ── ФОН-ОВЕРЛЕЙ (клик закрывает модал) ──────────────── */}
      <div className="modal-overlay" onClick={onClose} />

      {/* ── ПАНЕЛЬ СТАТЬИ ────────────────────────────────────── */}
      <div className="modal-panel">
        <div
          className="modal-content"
          style={{
            maxWidth: 800,
            margin: "40px auto 80px",
            background: "var(--color-surface)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
            borderRadius: 6,
            overflow: "hidden",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── КНОПКА ЗАКРЫТЬ ───────────────────────────────── */}
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              display: "flex",
              justifyContent: "flex-end",
              padding: "12px 16px",
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(8px)",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <button
              onClick={onClose}
              aria-label="Закрыть статью"
              style={{
                background: "#f5f5f5",
                border: "none",
                borderRadius: "50%",
                width: 36,
                height: 36,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-graphite-mid)",
                fontSize: "1.25rem",
                fontFamily: "var(--font-sans)",
                transition: "background 0.2s",
              }}
            >
              ✕
            </button>
          </div>

          {/* ── ИЗОБРАЖЕНИЕ ШАПКИ ─────────────────────────────── */}
          {/* Замените headerImage.url в articles.ts */}
          <figure className="article-figure" style={{ margin: 0 }}>
            <img
              src={article.headerImage.url}
              alt={article.headerImage.alt}
              className="article-header-image"
            />
            {article.headerImage.caption && (
              <figcaption
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.8rem",
                  color: "var(--color-graphite-soft)",
                  padding: "8px 32px",
                  textAlign: "center",
                  fontStyle: "italic",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                {article.headerImage.caption}
              </figcaption>
            )}
          </figure>

          {/* ── ОСНОВНОЙ КОНТЕНТ ─────────────────────────────── */}
          <div style={{ padding: "36px 48px 48px" }}>

            {/* ── МЕТА-ДАННЫЕ ──────────────────────────────────── */}
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
              {/* Тег */}
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  background: tagStyle.bg,
                  color: tagStyle.text,
                  padding: "3px 9px",
                  borderRadius: 2,
                }}
              >
                {article.tag}
              </span>
              {/* Дата */}
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--color-graphite-soft)" }}>
                {article.date}
              </span>
              {/* Время чтения */}
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--color-graphite-soft)" }}>
                · {article.readingTime} мин чтения
              </span>
            </div>

            {/* ── ЗАГОЛОВОК СТАТЬИ ──────────────────────────────── */}
            {/* Замените title в articles.ts */}
            <h1
              className="article-heading"
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2.125rem)",
                fontWeight: 700,
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
                marginBottom: 14,
              }}
            >
              {article.title}
            </h1>

            {/* ── ПОДЗАГОЛОВОК ─────────────────────────────────── */}
            {/* Замените subtitle в articles.ts */}
            <p
              className="font-serif"
              style={{
                fontSize: "1.0625rem",
                color: "var(--color-graphite-soft)",
                lineHeight: 1.65,
                fontStyle: "italic",
                marginBottom: 20,
              }}
            >
              {article.subtitle}
            </p>

            {/* Декоративная линия */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 32,
                paddingBottom: 24,
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              {/* Иконка автора */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "var(--color-accent-muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-accent)",
                  fontSize: "0.875rem",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {article.author.charAt(0)}
              </div>
              <div>
                {/* Замените author в articles.ts */}
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-graphite)", margin: 0 }}>
                  {article.author}
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--color-graphite-soft)", margin: 0 }}>
                  Научный Вестник · Редакционный совет
                </p>
              </div>
            </div>

            {/* ════════════════════════════════════════════════════
                СЕКЦИИ СТАТЬИ
                Каждая секция = heading + body + (опционально) image + citation
                Добавьте секцию в массив sections[] в articles.ts
                ════════════════════════════════════════════════ */}
            <div className="article-body">
              {article.sections.map((section, idx) => (
                <div key={idx} style={{ marginBottom: 40 }}>

                  {/* ── ПОДЗАГОЛОВОК СЕКЦИИ ─────────────────────── */}
                  {/* Замените heading в articles.ts */}
                  {section.heading && (
                    <h2
                      className="article-heading"
                      style={{
                        fontSize: "1.1875rem",
                        fontWeight: 700,
                        marginBottom: 14,
                        paddingTop: idx === 0 ? 0 : 8,
                        borderTop: idx === 0 ? "none" : "1px solid #f0f0f0",
                        paddingBottom: idx === 0 ? 0 : 14,
                      }}
                    >
                      {section.heading}
                    </h2>
                  )}

                  {/* ── ТЕКСТ СЕКЦИИ ─────────────────────────────── */}
                  {/* Замените body в articles.ts */}
                  <p style={{ margin: "0 0 20px" }}>{section.body}</p>

                  {/* ── ИЗОБРАЖЕНИЕ ВНУТРИ СЕКЦИИ ────────────────── */}
                  {/* Замените image.url в articles.ts */}
                  {section.image && (
                    <figure className="article-figure" style={{ margin: "24px 0" }}>
                      <img
                        src={section.image.url}
                        alt={section.image.alt}
                        style={{
                          width: "100%",
                          maxHeight: 400,
                          objectFit: "cover",
                          borderRadius: 3,
                          display: "block",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        }}
                      />
                      {section.image.caption && (
                        <figcaption>{section.image.caption}</figcaption>
                      )}
                    </figure>
                  )}

                  {/* ── БЛОК ЦИТАТЫ / ФОРМУЛЫ / КОДА ─────────────── */}
                  {/* Добавьте citation в articles.ts */}
                  {section.citation && (
                    <CitationBlock citation={section.citation} />
                  )}
                </div>
              ))}
            </div>
            {/* ════════════════════════════════════════════════════
                КОНЕЦ СЕКЦИЙ СТАТЬИ
                ════════════════════════════════════════════════ */}

            {/* ── НИЖНЯЯ ЧАСТЬ: кнопка закрыть ──────────────────── */}
            <div
              style={{
                marginTop: 48,
                paddingTop: 24,
                borderTop: "2px solid #e5e7eb",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--color-graphite-soft)", margin: 0 }}>
                  Научный Вестник · {article.date}
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--color-graphite-soft)", margin: "2px 0 0" }}>
                  © 2025. Все права защищены. DOI: 10.12345/nv.2025.{article.id}
                </p>
              </div>
              <button
                onClick={onClose}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-accent)",
                  background: "var(--color-accent-muted)",
                  border: "none",
                  borderRadius: 3,
                  padding: "8px 20px",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
              >
                ← К журналу
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
