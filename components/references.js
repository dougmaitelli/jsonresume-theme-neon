import { html } from '@rbardini/html'
import markdown from '../utils/markdown.js'

/**
 * @param {import('../schema.d.ts').ResumeSchema['references']} references
 * @returns {string | false}
 */
export default function References(references = []) {
  return (
    references.length > 0 &&
    html`
      <section id="references">
        <h3>References</h3>
        <div class="card-stack">
          ${references.map(
            ({ name, reference }) => html`
              <article class="card card-glow">
                <blockquote>
                  ${reference && markdown(reference)}
                  ${name &&
                  html`
                    <p>
                      <cite>${name}</cite>
                    </p>
                  `}
                </blockquote>
              </article>
            `,
          )}
        </div>
      </section>
    `
  )
}
