import { html } from '@rbardini/html'
import markdown from '../utils/markdown.js'
import DateTime from '../utils/date-time.js'

/**
 * @param {import('../schema.d.ts').ResumeSchema['awards']} awards
 * @returns {string | false}
 */
export default function Awards(awards = []) {
  return (
    awards.length > 0 &&
    html`
      <section id="awards">
        <h3>Awards</h3>
        <div class="card-stack">
          ${awards.map(
            ({ awarder, date, summary, title }) => html`
              <article class="card card-glow award-item">
                <header>
                  <div>
                    <span class="position">${title}</span>
                  </div>
                  <div class="meta">
                    ${awarder && html`<span>Awarded by <strong>${awarder}</strong></span>`}
                    <span>${DateTime(date)}</span>
                  </div>
                </header>
                ${summary && html`<p class="summary">${markdown(summary)}</p>`}
              </article>
            `,
          )}
        </div>
      </section>
    `
  )
}
