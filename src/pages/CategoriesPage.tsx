// ============================================================
// СТРАНИЦА: CategoriesPage.tsx
// Обзор всех категорий с количеством статей.
// ── КАК ДОБАВИТЬ КАТЕГОРИЮ: добавьте тег в ArticleTag в articles.ts
// ============================================================

import { useState } from "react";
import { articles, ArticleTag } from "../data/articles";
import ArticleCard from "../components/ArticleCard";
import ArticleModal from "../components/ArticleModal";

// ── ОПИСАНИЯ КАТЕГОРИЙ ──────────────────────────────────────
// Добавьте описание для новой категории
const categoryMeta: Record<string, { emoji: string; description: string }> = {
  Физика:     { emoji: "⚛️", description: "Квантовая механика, термодинамика, физика конденсированных сред и ускорительная физика." },
  Биология:   { emoji: "🧬", description: "Молекулярная биология, генетика, нейробиология и эволюционные исследования." },
  Астрономия: { emoji: "🔭", description: "Экзопланеты, космология, астрофизика и наблюдательная астрономия." },
  Химия:      { emoji: "🧪", description: "Органическая и неорганическая химия, катализ и материаловедение." },
  Нейронауки: { emoji: "🧠", description: "Нейропластичность, когнитивные науки, нейровизуализация и нейрофармакология." },
  Математика: { emoji: "📐", description: "Топология, теория чисел, алгебраическая геометрия и математический анализ." },
  Экология:   { emoji: "🌿", description: "Климатология, биоразнообразие, экосистемные услуги и устойчивое развитие." },
  Технологии: { emoji: "💡", description: "Искусственный интеллект, материалы нового поколения, биотехнологии и энергетика." },
};

export default function CategoriesPage() {
  const [openArticleId, setOpenArticleId] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<ArticleTag | null>(null);

  // Подсчёт статей по категориям
  const categoryCounts = articles.reduce<Record<string, number>>((acc, a) => {
    acc[a.tag] = (acc[a.tag] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.keys(categoryMeta) as ArticleTag[];
  const openArticle = articles.find((a) => a.id === openArticleId);

  return (
    <>
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* ── ЗАГОЛОВОК СТРАНИЦЫ ─────────────────────────────── */}
        <div style={{ marginBottom: 48 }}>
          <h1
            className="article-heading title-rule"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, margin: 0 }}
          >
            Категории
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9rem",
              color: "var(--color-graphite-soft)",
              marginTop: 20,
            }}
          >
            Исследуйте публикации по научным направлениям
          </p>
        </div>

        {/* ════════════════════════════════════════════════════════
            СЕТКА КАТЕГОРИЙ
            Каждая плитка — одна категория. Кликните, чтобы увидеть статьи.
            ════════════════════════════════════════════════════ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 20,
            marginBottom: 56,
          }}
        >
          {/* ── НАЧАЛО БЛОКА КАТЕГОРИЙ ─────────────────────────── */}
          {/* Скопируйте этот блок для новой категории */}
          {categories.map((cat) => {
            const meta = categoryMeta[cat];
            const count = categoryCounts[cat] || 0;
            const isExpanded = expandedCategory === cat;

            return (
              <div
                key={cat}
                onClick={() => setExpandedCategory(isExpanded ? null : cat)}
                style={{
                  background: isExpanded ? "var(--color-accent)" : "var(--color-surface)",
                  border: `1px solid ${isExpanded ? "var(--color-accent)" : "#e5e7eb"}`,
                  borderRadius: 4,
                  padding: "24px 24px 20px",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: isExpanded ? "0 8px 32px rgba(47,102,144,0.2)" : "none",
                }}
              >
                {/* Эмодзи */}
                <div style={{ fontSize: "2rem", marginBottom: 12 }}>{meta.emoji}</div>

                {/* Название */}
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.0625rem",
                    fontWeight: 700,
                    color: isExpanded ? "white" : "var(--color-graphite)",
                    margin: "0 0 8px",
                  }}
                >
                  {cat}
                </h3>

                {/* Описание */}
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.8125rem",
                    color: isExpanded ? "rgba(255,255,255,0.8)" : "var(--color-graphite-soft)",
                    lineHeight: 1.55,
                    margin: "0 0 16px",
                  }}
                >
                  {meta.description}
                </p>

                {/* Счётчик */}
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: isExpanded ? "rgba(255,255,255,0.7)" : "var(--color-accent)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{count} {count === 1 ? "статья" : count < 5 ? "статьи" : "статей"}</span>
                  <span>{isExpanded ? "▲" : "▼"}</span>
                </div>
              </div>
            );
          })}
          {/* ── КОНЕЦ БЛОКА КАТЕГОРИЙ ──────────────────────────── */}
        </div>

        {/* ════════════════════════════════════════════════════════
            СТАТЬИ ВЫБРАННОЙ КАТЕГОРИИ
            Появляются при нажатии на карточку категории
            ════════════════════════════════════════════════════ */}
        {expandedCategory && (
          <section>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 28,
              }}
            >
              <hr className="rule" style={{ flex: 1 }} />
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-accent)",
                  whiteSpace: "nowrap",
                }}
              >
                {categoryMeta[expandedCategory].emoji} {expandedCategory}
              </span>
              <hr className="rule" style={{ flex: 1 }} />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 24,
              }}
            >
              {/* ── СТАТЬИ КАТЕГОРИИ ──────────────────────────── */}
              {articles
                .filter((a) => a.tag === expandedCategory)
                .map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onOpen={setOpenArticleId}
                  />
                ))}
            </div>

            {articles.filter((a) => a.tag === expandedCategory).length === 0 && (
              <p style={{ fontFamily: "var(--font-sans)", color: "var(--color-graphite-soft)", textAlign: "center", padding: 40 }}>
                В этой категории пока нет статей.
              </p>
            )}
          </section>
        )}
      </main>

      {/* ── МОДАЛЬНОЕ ОКНО СТАТЬИ ──────────────────────────────── */}
      {openArticle && (
        <ArticleModal
          article={openArticle}
          onClose={() => setOpenArticleId(null)}
        />
      )}
    </>
  );
}
