// ============================================================
// СТРАНИЦА: HomePage.tsx
// Главная страница с сеткой статей.
// ── КАК ДОБАВИТЬ СТАТЬЮ: добавьте объект в articles[] в articles.ts
// ── КАК ИЗМЕНИТЬ СЕТКУ: отредактируйте grid-template-columns ниже
// ============================================================

import { useState } from "react";
import { articles, ArticleTag } from "../data/articles";
import ArticleCard from "../components/ArticleCard";
import ArticleModal from "../components/ArticleModal";

// ── ВСЕ ДОСТУПНЫЕ ТЕГИ ────────────────────────────────────────
// Добавьте новый тег, если добавляете новую категорию
const ALL_TAGS: (ArticleTag | "Все")[] = [
  "Все", "Физика", "Биология", "Астрономия",
  "Химия", "Нейронауки", "Математика", "Экология", "Технологии",
];

interface HomePageProps {
  initialOpenId?: string | null;
}

export default function HomePage({ initialOpenId }: HomePageProps) {
  const [activeTag, setActiveTag] = useState<ArticleTag | "Все">("Все");
  const [openArticleId, setOpenArticleId] = useState<string | null>(initialOpenId ?? null);

  // Фильтрация по тегу
  const filtered = activeTag === "Все"
    ? articles
    : articles.filter((a) => a.tag === activeTag);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  const openArticle = articles.find((a) => a.id === openArticleId);

  return (
    <>
      {/* ── ГЛАВНАЯ ОБЛАСТЬ КОНТЕНТА ──────────────────────────── */}
      <main
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "40px 24px 80px",
        }}
      >
        {/* ── ФИЛЬТР ПО ТЕГАМ / КАТЕГОРИЯМ ─────────────────────── */}
        <section aria-label="Фильтр по категориям" style={{ marginBottom: 36 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-graphite-soft)",
                marginRight: 4,
              }}
            >
              Разделы:
            </span>
            {/* ── ЧИПЫ КАТЕГОРИЙ ──────────────────────────────── */}
            {/* Добавьте тег в ALL_TAGS выше, чтобы появилась новая кнопка */}
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`category-chip${activeTag === tag ? " active" : ""}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        {/* Нет результатов */}
        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "80px 24px",
              color: "var(--color-graphite-soft)",
              fontFamily: "var(--font-sans)",
            }}
          >
            <p style={{ fontSize: "2rem", marginBottom: 12 }}>📭</p>
            <p>В этой категории пока нет статей.</p>
          </div>
        )}

        {/* ── FEATURED-КАРТОЧКА (первая статья) ─────────────────── */}
        {/* Чтобы убрать featured-вид — удалите блок ниже и добавьте featured в rest */}
        {featured && (
          <section aria-label="Главная статья выпуска" style={{ marginBottom: 40 }}>
            <ArticleCard
              article={featured}
              featured={true}
              onOpen={setOpenArticleId}
            />
          </section>
        )}

        {/* ── РАЗДЕЛИТЕЛЬ ────────────────────────────────────────── */}
        {rest.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 32,
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
                color: "var(--color-graphite-soft)",
                whiteSpace: "nowrap",
              }}
            >
              Последние публикации
            </span>
            <hr className="rule" style={{ flex: 1 }} />
          </div>
        )}

        {/* ════════════════════════════════════════════════════════
            СЕТКА СТАТЕЙ
            Чтобы изменить число колонок — отредактируйте gridTemplateColumns
            Текущий вариант: 3 колонки на широком экране
            ════════════════════════════════════════════════════ */}
        {rest.length > 0 && (
          <section
            aria-label="Список статей"
            style={{
              display: "grid",
              // ── ИЗМЕНИТЬ СЕТКУ ЗДЕСЬ ──────────────────────
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 28,
            }}
          >
            {/* ── НАЧАЛО ЦИКЛА КАРТОЧЕК ──────────────────────── */}
            {/* Добавьте статью в articles.ts — она автоматически появится здесь */}
            {rest.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onOpen={setOpenArticleId}
              />
            ))}
            {/* ── КОНЕЦ ЦИКЛА КАРТОЧЕК ───────────────────────── */}
          </section>
        )}

        {/* ── ПАГИНАЦИЯ (placeholder для будущего использования) ── */}
        {/* Раскомментируйте и реализуйте при добавлении большого числа статей */}
        {/*
        <div style={{ display: "flex", justifyContent: "center", marginTop: 48 }}>
          <button className="btn-read-more">Загрузить ещё</button>
        </div>
        */}
      </main>

      {/* ── МОДАЛЬНОЕ ОКНО СТАТЬИ ──────────────────────────────── */}
      {/* Открывается при нажатии «Читать» на любой карточке */}
      {openArticle && (
        <ArticleModal
          article={openArticle}
          onClose={() => setOpenArticleId(null)}
        />
      )}
    </>
  );
}
