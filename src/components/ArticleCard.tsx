// ============================================================
// КОМПОНЕНТ: ArticleCard.tsx
// Карточка-превью статьи для сетки на главной странице.
// ── КАК ДОБАВИТЬ КАРТОЧКУ: добавьте статью в articles.ts ──
// ============================================================

import { ArticleData } from "../data/articles";

interface ArticleCardProps {
  article: ArticleData;
  featured?: boolean;       // Увеличенная карточка (для первой статьи)
  onOpen: (id: string) => void;
}

// Цвета тегов по категориям
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

export default function ArticleCard({ article, featured = false, onOpen }: ArticleCardProps) {
  const tagStyle = tagColors[article.tag] || { bg: "#e8f0f7", text: "#2f6690" };

  const fallbackImage = "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000";

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = fallbackImage;
  };

  /* ── FEATURED: большая карточка (первая статья) ─────────── */
  if (featured) {
    return (
      // ── НАЧАЛО БЛОКА FEATURED-КАРТОЧКИ ───────────────────────
      <article
        className="article-card featured-card"
        style={{
          borderRadius: 4,
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "clamp(260px, 50%, 600px) 1fr",
          cursor: "pointer",
        }}
        onClick={() => onOpen(article.id)}
      >
        {/* ── ИЗОБРАЖЕНИЕ FEATURED ───────────────────────── */}
        {/* Замените previewImage.url в articles.ts */}
        <div className="card-img-wrap" style={{ position: "relative" }}>
          <img
            src={article.previewImage.url}
            alt={article.previewImage.alt}
            onError={handleImageError}
            style={{ width: "100%", height: 380, objectFit: "cover", display: "block" }}
          />
          <span
            className="featured-badge"
            style={{ position: "absolute", top: 16, left: 16 }}
          >
            В фокусе
          </span>
        </div>

        {/* ── ТЕКСТ FEATURED ─────────────────────────────── */}
        <div style={{ padding: "36px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {/* Метаданные */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: tagStyle.bg,
                color: tagStyle.text,
                padding: "2px 8px",
                borderRadius: 2,
              }}
            >
              {article.tag}
            </span>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                color: "var(--color-graphite-soft)",
              }}
            >
              {article.date}
            </span>
          </div>

          {/* ── ЗАГОЛОВОК СТАТЬИ ─────────────────────────── */}
          {/* Замените title в articles.ts */}
          <h2
            className="article-heading"
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              lineHeight: 1.3,
              marginBottom: 12,
              letterSpacing: "-0.01em",
            }}
          >
            {article.title}
          </h2>

          {/* ── АННОТАЦИЯ ────────────────────────────────── */}
          {/* Замените excerpt в articles.ts */}
          <p
            className="font-serif"
            style={{
              fontSize: "0.9375rem",
              color: "var(--color-graphite-mid)",
              lineHeight: 1.7,
              marginBottom: 24,
            }}
          >
            {article.excerpt}
          </p>

          {/* Нижняя строка */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 20,
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                color: "var(--color-graphite-soft)",
              }}
            >
              {article.author} · {article.readingTime} мин
            </span>
            <button
              className="btn-read-more"
              style={{ background: "none", border: "none", cursor: "pointer" }}
              onClick={(e) => { e.stopPropagation(); onOpen(article.id); }}
            >
              Читать далее
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </article>
      // ── КОНЕЦ БЛОКА FEATURED-КАРТОЧКИ ────────────────────────
    );
  }

  /* ── ОБЫЧНАЯ КАРТОЧКА ────────────────────────────────────── */
  return (
    // ── НАЧАЛО БЛОКА ОБЫЧНОЙ КАРТОЧКИ ────────────────────────
    // Чтобы добавить новую карточку — добавьте статью в articles.ts
    <article
      className="article-card"
      style={{ borderRadius: 4, overflow: "hidden", cursor: "pointer", display: "flex", flexDirection: "column" }}
      onClick={() => onOpen(article.id)}
    >
      {/* ── ИЗОБРАЖЕНИЕ КАРТОЧКИ ──────────────────────── */}
      {/* Замените previewImage.url в articles.ts */}
      <div className="card-img-wrap" style={{ flexShrink: 0 }}>
        <img
          src={article.previewImage.url}
          alt={article.previewImage.alt}
          onError={handleImageError}
          style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
        />
      </div>

      {/* ── КОНТЕНТ КАРТОЧКИ ──────────────────────────── */}
      <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        {/* Метаданные */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.62rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              background: tagStyle.bg,
              color: tagStyle.text,
              padding: "2px 7px",
              borderRadius: 2,
            }}
          >
            {article.tag}
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.72rem",
              color: "var(--color-graphite-soft)",
            }}
          >
            {article.date}
          </span>
        </div>

        {/* ── ЗАГОЛОВОК ─────────────────────────────────── */}
        {/* Замените title в articles.ts */}
        <h3
          className="article-heading"
          style={{
            fontSize: "1.0625rem",
            fontWeight: 700,
            lineHeight: 1.35,
            marginBottom: 10,
            letterSpacing: "-0.01em",
          }}
        >
          {article.title}
        </h3>

        {/* ── КРАТКОЕ ОПИСАНИЕ ────────────────────────── */}
        {/* Замените excerpt в articles.ts */}
        <p
          className="font-serif"
          style={{
            fontSize: "0.875rem",
            color: "var(--color-graphite-mid)",
            lineHeight: 1.65,
            marginBottom: "auto",
            paddingBottom: 16,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {article.excerpt}
        </p>

        {/* Нижняя строка */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 16,
            borderTop: "1px solid #f0f0f0",
            marginTop: 8,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.72rem",
              color: "var(--color-graphite-soft)",
            }}
          >
            {article.readingTime} мин чтения
          </span>
          <button
            className="btn-read-more"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            onClick={(e) => { e.stopPropagation(); onOpen(article.id); }}
          >
            Читать
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
    // ── КОНЕЦ БЛОКА ОБЫЧНОЙ КАРТОЧКИ ─────────────────────────
  );
}
