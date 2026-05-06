import { html } from '@rbardini/html'
import markdown from '../utils/markdown.js'
import DateTimeDuration from '../utils/date-time-duration.js'
import Link from '../utils/link.js'

/**
 * @param {import('../schema.d.ts').ResumeSchema['education']} education
 * @returns {string | false}
 */
export default function Education(education = []) {
  return (
    education.length > 0 &&
    html`
      <section id="education">
        <h3>Education</h3>
        <div class="card-stack">
          ${education.map(
            ({ area, courses = [], institution, startDate, endDate, studyType, url }) => html`
              <article class="card card-glow">
                <header>
                  <div>
                    <span class="position">${Link(url, institution)}</span>
                  </div>
                  <div class="meta">
                    <span>${[studyType, area && html`<strong>${area}</strong>`].filter(Boolean).join(' in ')}</span>
                    <span>${DateTimeDuration(startDate, endDate)}</span>
                  </div>
                </header>
                ${courses.length > 0 &&
                html`
                  <h5>Courses</h5>
                  <ul>
                    ${courses.map(course => html`<li>${markdown(course)}</li>`)}
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
