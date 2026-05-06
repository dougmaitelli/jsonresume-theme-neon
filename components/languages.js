import { html } from '@rbardini/html'

/**
 * @param {import('../schema.d.ts').ResumeSchema['languages']} languages
 * @returns {string | false}
 */
export default function Languages(languages = []) {
  return (
    languages.length > 0 &&
    html`
      <section id="languages">
        <h3>Languages</h3>
        <div class="info-grid">
          ${languages.map(
            ({ fluency, language }) => html`
              <div class="card">
                <h4>${language}</h4>
                <p>${fluency}</p>
              </div>
            `,
          )}
        </div>
      </section>
    `
  )
}
