// ============================================================
// СТРАНИЦА: AboutPage.tsx
// Страница «Об авторе» / «О журнале».
// ── ЗАМЕНИТЕ контент ниже на свои данные ──────────────────
// ============================================================

export default function AboutPage() {
  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 56, alignItems: "start" }}>

        {/* ── ЛЕВАЯ КОЛОНКА: О ЖУРНАЛЕ ───────────────────────── */}
        <div>

          {/* ── ЗАГОЛОВОК ── Замените на своё название ────────── */}
          <h1
            className="article-heading title-rule"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, margin: "0 0 32px" }}
          >
            О журнале
          </h1>

          {/* ── МИССИЯ ── Замените текст ──────────────────────── */}
          <div style={{ marginBottom: 36 }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "var(--color-graphite)",
                marginBottom: 12,
              }}
            >
              Миссия
            </h2>
            <p className="article-body" style={{ margin: 0 }}>
              «Научный Вестник» — независимое рецензируемое издание, работающее из Украины.
              Наша цель — публиковать актуальные исследования и технологические обзоры,
              которые помогают учёным и инженерам понимать современные тренды
              в ИИ, аппаратных платформах, безопасности и инженерных решениях.
            </p>
          </div>

          {/* ── РЕДАКЦИОННАЯ ПОЛИТИКА ─────────────────────────── */}
          <div style={{ marginBottom: 36 }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "var(--color-graphite)",
                marginBottom: 12,
              }}
            >
              Редакционная политика
            </h2>
            <p className="article-body" style={{ margin: "0 0 16px" }}>
              Все материалы проходят экспертное рецензирование, отвечают современным
              требованиям научной прозрачности и ориентированы на практическое применение.
              Мы публикуем только проверенные исследования с акцентом на технологические инновации.
            </p>
            <p className="article-body" style={{ margin: 0 }}>
              Главный редактор: <strong>Александр Сергеевич Кириенко</strong>.
              Контакты редакции доступны ниже. Журнал выходит в цифровом формате и
              поддерживает открытую науку.
            </p>
          </div>

          {/* ── КОНТАКТНАЯ ИНФОРМАЦИЯ ─────────────────────────── */}
          <div style={{ marginBottom: 36 }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "var(--color-graphite)",
                marginBottom: 12,
              }}
            >
              Контакты редакции
            </h2>
            {[
              { icon: "✉️", label: "E-mail", value: "laos55515@gmail.com" },
              { icon: "📍", label: "Адрес", value: "город Лубны, Полтавская область, Украина" },
              { icon: "📞", label: "Телефон", value: "+380731171988" },
              { icon: "👨‍💼", label: "Главный редактор", value: "Александр Сергеевич Кириенко" },
            ].map((item) => (
              <div
                key={item.label}
                style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}
              >
                <span style={{ fontSize: "1rem", flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--color-graphite-soft)",
                      display: "block",
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.875rem",
                      color: "var(--color-graphite-mid)",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ── КАК ПОДАТЬ РУКОПИСЬ ───────────────────────────── */}
          <div
            style={{
              background: "var(--color-accent-muted)",
              border: "1px solid #c8daea",
              borderLeft: "4px solid var(--color-accent)",
              borderRadius: "0 4px 4px 0",
              padding: "20px 24px",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--color-accent)",
                marginBottom: 8,
              }}
            >
              Подача рукописей
            </h3>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                color: "var(--color-graphite-mid)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Рукописи принимаются в формате .docx или LaTeX через официальную форму на сайте.
              Требования к оформлению публикуются в разделе «Для авторов», а вопросы можно
              направлять по указанному электронному адресу.
            </p>
          </div>
        </div>

        {/* ── ПРАВАЯ КОЛОНКА: РЕДАКЦИОННЫЙ СОВЕТ ──────────────── */}
        <div>
          <div
            className="about-section"
            style={{ borderRadius: 4, padding: "28px 24px", position: "sticky", top: 20 }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.0625rem",
                fontWeight: 700,
                color: "var(--color-graphite)",
                marginBottom: 24,
                paddingBottom: 16,
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              Редакционный совет
            </h2>

            {/* ── ЧЛЕНЫ СОВЕТА ── Скопируйте блок, чтобы добавить ── */}
            {[
              {
                name: "Александр С. Кириенко",
                role: "Главный редактор",
                affiliation: "Научный Вестник, г. Лубны",
                field: "Научные и технические публикации",
              },
              {
                name: "Оксана П. Мельник",
                role: "Зам. главного редактора",
                affiliation: "Научный Вестник",
                field: "Научная визуализация",
              },
              {
                name: "Игорь А. Бондаренко",
                role: "Технический редактор",
                affiliation: "Научный Вестник",
                field: "Инженерные системы",
              },
              {
                name: "Елена В. Кравчук",
                role: "Редактор раздела «Информатика»",
                affiliation: "Научный Вестник",
                field: "ИИ и вычислительная техника",
              },
              {
                name: "Сергей Д. Романенко",
                role: "Редактор раздела «Инженерия»",
                affiliation: "Научный Вестник",
                field: "Термоинтерфейсы и аппаратные платформы",
              },
            ].map((member, idx, arr) => (
              <div
                key={member.name}
                style={{
                  paddingBottom: idx < arr.length - 1 ? 16 : 0,
                  marginBottom: idx < arr.length - 1 ? 16 : 0,
                  borderBottom: idx < arr.length - 1 ? "1px solid #f0f0f0" : "none",
                }}
              >
                {/* Аватар + имя */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "var(--color-accent-muted)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-accent)",
                      fontFamily: "var(--font-display)",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        color: "var(--color-graphite)",
                        margin: 0,
                      }}
                    >
                      {member.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.72rem",
                        color: "var(--color-accent)",
                        margin: 0,
                        fontWeight: 500,
                      }}
                    >
                      {member.role}
                    </p>
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.72rem",
                    color: "var(--color-graphite-soft)",
                    margin: "4px 0 0 42px",
                  }}
                >
                  {member.affiliation} · {member.field}
                </p>
              </div>
            ))}
            {/* ── КОНЕЦ БЛОКА СОВЕТА ───────────────────────────── */}

            {/* Статистика журнала */}
            <div
              style={{
                marginTop: 24,
                paddingTop: 20,
                borderTop: "1px solid #e5e7eb",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {/* ── ЗАМЕНИТЕ цифры на актуальные ─────────────── */}
              {[
                { value: "42", label: "Года издания" },
                { value: "8,47", label: "Импакт-фактор" },
                { value: "1 200+", label: "Статей в год" },
                { value: "38", label: "Стран авторов" },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.375rem",
                      fontWeight: 700,
                      color: "var(--color-accent)",
                      margin: 0,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.68rem",
                      color: "var(--color-graphite-soft)",
                      margin: "2px 0 0",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
