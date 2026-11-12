import { useEffect, useState } from 'react'
import { content, email, links, project, skills } from './data.js'
import photo from './assets/profile.webp'

function getInitialLang() {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'tr' || saved === 'en') return saved
  } catch {
    /* storage unavailable */
  }
  return 'tr'
}

function List({ items }) {
  return (
    <ul className="list">
      {items.map((it) => (
        <li key={it.name}>
          <span>{it.name}</span>
          <span className="muted">{it.detail}</span>
        </li>
      ))}
    </ul>
  )
}

export default function App() {
  const [lang, setLang] = useState(getInitialLang)
  const t = content[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* storage unavailable */
    }
  }, [lang])

  return (
    <div className="page">
      <div className="lang" role="group" aria-label="Language">
        {['tr', 'en'].map((l) => (
          <button
            key={l}
            type="button"
            className={lang === l ? 'on' : ''}
            aria-pressed={lang === l}
            onClick={() => setLang(l)}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <header className="hero">
        <img src={photo} alt={t.alt} width="180" height="180" />
        <h1>Murat Akpınar</h1>
        <p className="muted">{t.title}</p>
      </header>

      <main>
        <section>
          <h2>{t.about.h}</h2>
          <p>{t.about.p}</p>
        </section>

        <section>
          <h2>{t.skills.h}</h2>
          <ul className="chips">
            {skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>{t.project.h}</h2>
          <h3>{project.name}</h3>
          <p>{t.project.p}</p>
          <p className="muted small">
            {t.project.games}: {project.games.join(' · ')}
          </p>
          <p>
            <a href={project.url} target="_blank" rel="noreferrer noopener">
              {t.project.visit} →
            </a>
          </p>
        </section>

        <section>
          <h2>{t.experience.h}</h2>
          <List items={t.experience.items} />
        </section>

        <section>
          <h2>{t.education.h}</h2>
          <List items={t.education.items} />
        </section>

        <section>
          <h2>{t.languages.h}</h2>
          <List items={t.languages.items} />
        </section>

        <section>
          <h2>{t.contact.h}</h2>
          <ul className="list">
            <li>
              <span>{t.contact.email}</span>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
            {Object.values(links).map((l) => (
              <li key={l.label}>
                <span>{l.label}</span>
                <a href={l.href} target="_blank" rel="noreferrer noopener">
                  {l.text}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="muted small">© {new Date().getFullYear()} Murat Akpınar</footer>
    </div>
  )
}
