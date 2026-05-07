// ============================================================
// КОМПОНЕНТ: Footer.tsx
// Подвал журнала с метаинформацией и ссылками.
// ── ЗАМЕНИТЕ контактные данные и ссылки на свои ───────────
// ============================================================

type Page = "home" | "categories" | "about";

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer
      style={{
        background: "var(--color-graphite)",
        color: "rgba(255,255,255,0.75)",
        paddingTop: 48,
        paddingBottom: 24,
        marginTop: "auto",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* ── ВЕРХНЯЯ ЧАСТЬ ПОДВАЛА ────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: 48,
            marginBottom: 40,
          }}
        >
          {/* ── КОЛОНКА 1: Название и описание ─────────────────── */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.375rem",
                fontWeight: 700,
                color: "white",
                margin: "0 0 12px",
                letterSpacing: "-0.02em",
              }}
            >
              {/* Замените название */}
              Научный Вестник
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.8125rem",
                lineHeight: 1.65,
                margin: "0 0 20px",
                maxWidth: 320,
              }}
            >
              {/* Замените описание */}
              Рецензируемый академический журнал, освещающий передовые исследования
              в области естественных наук с 1983 года.
            </p>
            {/* ISSN */}
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {/* Замените ISSN */}
              ISSN 1234-5678 (print) · 8765-4321 (online)
            </p>
          </div>

          {/* ── КОЛОНКА 2: Навигация ────────────────────────────── */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                margin: "0 0 16px",
              }}
            >
              Разделы
            </h3>
            {/* ── ЗАМЕНИТЕ ссылки на актуальные ──────────────── */}
            {[
              { label: "Главная",   page: "home" as Page },
              { label: "Категории", page: "categories" as Page },
              { label: "Об авторе", page: "about" as Page },
            ].map((link) => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                style={{
                  display: "block",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.8125rem",
                  color: "rgba(255,255,255,0.7)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 0",
                  textAlign: "left",
                  transition: "color 0.2s",
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* ── КОЛОНКА 3: Информация ───────────────────────────── */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                margin: "0 0 16px",
              }}
            >
              Информация
            </h3>
            {/* ── ЗАМЕНИТЕ информационные ссылки ─────────────── */}
            {[
              "Для авторов",
              "Архив выпусков",
              "Политика рецензирования",
              "Открытый доступ",
              "Этические нормы",
            ].map((item) => (
              <p
                key={item}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.8125rem",
                  color: "rgba(255,255,255,0.7)",
                  margin: "0 0 8px",
                  cursor: "pointer",
                }}
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* ── НИЖНЯЯ ПОЛОСА ──────────────────────────────────────── */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.72rem",
              color: "rgba(255,255,255,0.4)",
              margin: 0,
            }}
          >
            {/* Замените год и название */}
            © 2025 Научный Вестник. Все права защищены.
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.72rem",
              color: "rgba(255,255,255,0.4)",
              margin: 0,
            }}
          >
            {/* Индексирование */}
            Индексируется в Web of Science · Scopus · PubMed · РИНЦ
          </p>
        </div>
      </div>
    </footer>
  );
}
