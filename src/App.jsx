import { useEffect, useState } from 'react'
import { content, email, links, project, skills } from './data.js'
import Icon from './Icon.jsx'
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
        <li key={`${it.name}-${it.detail}`}>
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
        <img src={photo} alt={t.alt} width="168" height="168" />
        <h1>Murat Akpınar</h1>
        <p className="roles">
          {t.roles.map((r) => (
            <span key={r}>{r}</span>
          ))}
        </p>
        <div className="icons">
          <a href={`mailto:${email}`} aria-label="Email" title="Email">
            <Icon name="mail" />
          </a>
          {Object.entries(links).map(([key, l]) => (
            <a
              key={key}
              href={l.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={l.label}
              title={l.label}
            >
              <Icon name={key} />
            </a>
          ))}
        </div>
      </header>

      <main>
        <section>
          <h2>{t.about.h}</h2>
          {t.about.ps.map((p) => (
            <p key={p}>{p}</p>
          ))}
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
          <div className="project">
            <h3>{project.name}</h3>
            <p>{t.project.p}</p>
            <ul className="chips small-chips">
              {project.games.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
            <a className="btn" href={project.url} target="_blank" rel="noreferrer noopener">
              {t.project.visit} →
            </a>
          </div>
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
              <span className="with-icon">
                <Icon name="mail" size={16} /> {t.contact.email}
              </span>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
            {Object.entries(links).map(([key, l]) => (
              <li key={key}>
                <span className="with-icon">
                  <Icon name={key} size={16} /> {l.label}
                </span>
                <a href={l.href} target="_blank" rel="noreferrer noopener">
                  {l.text}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer>© {new Date().getFullYear()} Murat Akpınar</footer>
    </div>
  )
}
