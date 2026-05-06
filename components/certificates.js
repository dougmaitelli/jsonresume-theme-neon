import { html } from '@rbardini/html'
import DateTime from '../utils/date-time.js'
import Link from '../utils/link.js'

/**
 * @param {import('../schema.d.ts').ResumeSchema['certificates']} certificates
 * @returns {string | false}
 */
export default function Certificates(certificates = []) {
  return (
    certificates.length > 0 &&
    html`
      <section id="certificates">
        <h3>Certificates</h3>
        <div class="card-stack">
          ${certificates.map(
            ({ date, issuer, name, url }) => html`
              <article class="card card-glow">
                <header>
                  <div>
                    <span class="position">${Link(url, name)}</span>
                  </div>
                  <div class="meta">
                    <span>Issued by <strong>${issuer}</strong></span>
                    <span>${DateTime(date)}</span>
                  </div>
                </header>
              </article>
            `,
          )}
        </div>
      </section>
    `
  )
}
