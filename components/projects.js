import { html } from '@rbardini/html'
import markdown from '../utils/markdown.js'
import DateTimeDuration from '../utils/date-time-duration.js'
import Link from '../utils/link.js'

/**
 * @param {string[]} roles
 * @returns {string}
 */
const formatRoles = roles => (Intl.ListFormat ? new Intl.ListFormat('en').format(roles) : roles.join(', '))

/**
 * @param {import('../schema.d.ts').ResumeSchema['projects']} projects
 * @returns {string | false}
 */
export default function Projects(projects = []) {
  return (
    projects.length > 0 &&
    html`
      <section id="projects">
        <h3>Projects</h3>
        <div class="card-stack">
          ${projects.map(
            ({
              description,
              entity,
              highlights = [],
              keywords = [],
              name,
              startDate,
              endDate,
              roles = [],
              type,
              url,
            }) => html`
              <article class="card card-glow">
                <header>
                  <div>
                    <span class="position">${Link(url, name)}</span>
                    ${roles.length > 0 && html` <span class="company">${formatRoles(roles)}</span>`}
                    ${entity && html` at <span class="company">${entity}</span>`}
                  </div>
                  <div class="meta">
                    ${startDate && html`<span>${DateTimeDuration(startDate, endDate)}</span>`}
                    ${type && html`<span>${type}</span>`}
                  </div>
                </header>
                ${description && html`<p class="summary">${markdown(description)}</p>`}
                ${highlights.length > 0 &&
                html`
                  <ul>
                    ${highlights.map(highlight => html`<li>${markdown(highlight)}</li>`)}
                  </ul>
                `}
                ${keywords.length > 0 &&
                html`
                  <ul class="tag-list" style="margin-top: 0.5em;">
                    ${keywords.map(keyword => html`<li>${keyword}</li>`)}
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
