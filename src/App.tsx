// ============================================================
// ГЛАВНЫЙ КОМПОНЕНТ: App.tsx
// Точка входа приложения. Управляет навигацией между страницами.
// ── ДОБАВИТЬ СТРАНИЦУ: добавьте новый case в renderPage() ──
// ============================================================

import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import AboutPage from "./pages/AboutPage";

// Типы страниц
type Page = "home" | "categories" | "about";

export default function App() {
  // ── ТЕКУЩАЯ СТРАНИЦА ───────────────────────────────────────
  // Замените "home" на другую страницу, чтобы изменить стартовую
  const [currentPage, setCurrentPage] = useState<Page>("home");

  // Рендер нужной страницы
  const renderPage = () => {
    switch (currentPage) {
      // ── ГЛАВНАЯ ───────────────────────────────────────────
      case "home":
        return <HomePage />;

      // ── КАТЕГОРИИ ─────────────────────────────────────────
      case "categories":
        return <CategoriesPage />;

      // ── ОБ АВТОРЕ ─────────────────────────────────────────
      case "about":
        return <AboutPage />;

      // ── ДОБАВЬТЕ НОВУЮ СТРАНИЦУ ЗДЕСЬ ─────────────────────
      // case "archive":
      //   return <ArchivePage />;

      default:
        return <HomePage />;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--color-bg)",
      }}
    >
      {/* ── ШАПКА ─────────────────────────────────────────────── */}
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* ── СТРАНИЦЫ ──────────────────────────────────────────── */}
      <div style={{ flex: 1 }}>
        {renderPage()}
      </div>

      {/* ── ПОДВАЛ ────────────────────────────────────────────── */}
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}
