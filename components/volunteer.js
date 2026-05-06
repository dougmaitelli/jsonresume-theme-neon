import { html } from '@rbardini/html'
import markdown from '../utils/markdown.js'
import DateTimeDuration from '../utils/date-time-duration.js'
import Link from '../utils/link.js'

/**
 * @param {import('../schema.d.ts').ResumeSchema['volunteer']} volunteer
 * @returns {string | false}
 */
export default function Volunteer(volunteer = []) {
  return (
    volunteer.length > 0 &&
    html`
      <section id="volunteer">
        <h3>Volunteer</h3>
        <div class="card-stack">
          ${volunteer.map(
            ({ highlights = [], organization, position, startDate, endDate, summary, url }) => html`
              <article class="card card-glow">
                <header>
                  <div>
                    <span class="position">${position}</span>
                    <span class="company">${Link(url, organization)}</span>
                  </div>
                  <div class="meta">
                    <span>${DateTimeDuration(startDate, endDate)}</span>
                  </div>
                </header>
                ${summary && html`<p class="summary">${markdown(summary)}</p>`}
                ${highlights.length > 0 &&
                html`
                  <ul>
                    ${highlights.map(highlight => html`<li>${markdown(highlight)}</li>`)}
                  </ul>
                `}
              </article>
            `,
          )}
        </div>
      </section>
    `
  )
}
