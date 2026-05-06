import { html } from '@rbardini/html'
import markdown from '../utils/markdown.js'
import DateTime from '../utils/date-time.js'
import Link from '../utils/link.js'

/**
 * @param {import('../schema.d.ts').ResumeSchema['publications']} publications
 * @returns {string | false}
 */
export default function Publications(publications = []) {
  return (
    publications.length > 0 &&
    html`
      <section id="publications">
        <h3>Publications</h3>
        <div class="card-stack">
          ${publications.map(
            ({ name, publisher, releaseDate, summary, url }) => html`
              <article class="card card-glow">
                <header>
                  <div>
                    <span class="position">${Link(url, name)}</span>
                  </div>
                  <div class="meta">
                    <span>Published by <strong>${publisher}</strong></span>
                    <span>${DateTime(releaseDate)}</span>
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
