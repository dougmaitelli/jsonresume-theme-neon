import { html } from '@rbardini/html'
import markdown from '../utils/markdown.js'
import DateTimeDuration from '../utils/date-time-duration.js'
import Duration from '../utils/duration.js'
import Link from '../utils/link.js'

/** @typedef {NonNullable<import('../schema.d.ts').ResumeSchema['work']>[number]} Work */
/** @typedef {Pick<Work, 'highlights' | 'location' | 'position' | 'startDate' | 'endDate' | 'summary'>} NestedWorkItem */
/** @typedef {Pick<Work, 'description' | 'name' | 'url'> & { items: NestedWorkItem[] }} NestedWork */

/**
 * @param {import('../schema.d.ts').ResumeSchema['work']} work
 * @returns {string | false}
 */
export default function Work(work = []) {
  const nestedWork = work.reduce((acc, { description, name, url, ...rest }) => {
    const prev = acc[acc.length - 1]
    if (prev && prev.name === name && prev.description === description && prev.url === url) prev.items.push(rest)
    else acc.push({ description, name, url, items: [rest] })
    return acc
  }, /** @type {NestedWork[]} */ ([]))

  return (
    work.length > 0 &&
    html`
      <section id="work">
        <h3>Work Experience</h3>
        <div class="card-stack">
          ${nestedWork.map(({ description, name, url, items = [] }) => {
            const singleItem = items.length === 1 ? items[0] : undefined
            return html`
              <article class="card card-glow">
                <header>
                  <div>
                    <span class="position">${singleItem ? singleItem.position : description}</span>
                    at <span class="company">${Link(url, name)}</span>
                  </div>
                  <div class="meta">
                    ${singleItem
                      ? html`
                          ${description && html`<span>${description}</span>`}
                          ${singleItem.startDate && html`<span>${DateTimeDuration(singleItem.startDate, singleItem.endDate)}</span>`}
                          ${singleItem.location && html`<span>${singleItem.location}</span>`}
                        `
                      : html`
                          ${items.some(item => item.startDate) && html`<span>${Duration(items)}</span>`}
                        `}
                  </div>
                </header>
                <div class="timeline">
                  ${items.map(
                    ({ highlights = [], location, position, startDate, endDate, summary }) => html`
                      <div>
                        ${!singleItem &&
                        html`
                          <div>
                            <h5>${position}</h5>
                            <div class="meta">
                              ${startDate && html`<span>${DateTimeDuration(startDate, endDate)}</span>`}
                              ${location && html`<span>${location}</span>`}
                            </div>
                          </div>
                        `}
                        ${summary && html`<p class="summary">${markdown(summary)}</p>`}
                        ${highlights.length > 0 &&
                        html`
                          <ul>
                            ${highlights.map(highlight => html`<li>${markdown(highlight)}</li>`)}
                          </ul>
                        `}
                      </div>
                    `,
                  )}
                </div>
              </article>
            `
          })}
        </div>
      </section>
    `
  )
}
