// ============================================================
// КОМПОНЕНТ: Header.tsx
// Серьёзный минималистичный заголовок и навигация журнала.
// Чтобы изменить пункты меню — отредактируйте массив navItems.
// ============================================================

import { useState } from "react";

type Page = "home" | "categories" | "about";

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

// ── ПУНКТЫ НАВИГАЦИОННОГО МЕНЮ ────────────────────────────────
// Скопируйте элемент, чтобы добавить новый раздел
const navItems: { label: string; page: Page }[] = [
  { label: "Главная",    page: "home" },
  { label: "Категории",  page: "categories" },
  { label: "Об авторе",  page: "about" },
];
// ── КОНЕЦ МЕНЮ ───────────────────────────────────────────────

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header style={{ borderBottom: "1px solid #e5e7eb", background: "#ffffff" }}>
      {/* ── Верхняя полоса с номером выпуска ──────────────────── */}
      <div
        style={{
          background: "var(--color-accent)",
          color: "white",
          textAlign: "center",
          fontSize: "0.7rem",
          fontFamily: "var(--font-sans)",
          letterSpacing: "0.1em",
          padding: "6px 16px",
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        {/* ── ЗАМЕНИТЕ текст выпуска ────────────────────────── */}
        Том XLIII • Выпуск 5 • Май 2026 · ISSN 1234-5678
      </div>

      {/* ── Основной заголовок ────────────────────────────────── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "28px 24px 20px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        {/* Логотип / Название */}
        <div
          style={{ cursor: "pointer" }}
          onClick={() => onNavigate("home")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onNavigate("home")}
        >
          {/* ── ЗАМЕНИТЕ название журнала ─────────────────────── */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "var(--color-graphite)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Научный Вестник
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.75rem",
              color: "var(--color-graphite-soft)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginTop: 6,
              fontWeight: 400,
            }}
          >
            {/* ── ЗАМЕНИТЕ подзаголовок журнала ─────────────── */}
            Рецензируемый академический журнал
          </p>
        </div>

        {/* ── Кнопка мобильного меню ─────────────────────────── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Меню"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
          }}
          className="mobile-menu-btn"
        >
          <div style={{ width: 22, height: 2, background: "var(--color-graphite)", marginBottom: 5 }} />
          <div style={{ width: 22, height: 2, background: "var(--color-graphite)", marginBottom: 5 }} />
          <div style={{ width: 22, height: 2, background: "var(--color-graphite)" }} />
        </button>

        {/* ── Навигация (десктоп) ────────────────────────────── */}
        <nav
          style={{
            display: "flex",
            gap: 32,
            alignItems: "center",
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`nav-link${currentPage === item.page ? " active" : ""}`}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* ── Мобильное меню (выпадающее) ───────────────────────── */}
      {mobileOpen && (
        <div
          style={{
            borderTop: "1px solid #e5e7eb",
            padding: "12px 24px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => {
                onNavigate(item.page);
                setMobileOpen(false);
              }}
              className={`nav-link${currentPage === item.page ? " active" : ""}`}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Нижняя декоративная линия ─────────────────────────── */}
      <div
        style={{
          height: 3,
          background:
            "linear-gradient(90deg, var(--color-accent) 0%, var(--color-accent-light) 50%, transparent 100%)",
        }}
      />
    </header>
  );
}
