import { html } from '@rbardini/html'
import colors from '../utils/colors.js'
import Awards from './awards.js'
import Certificates from './certificates.js'
import Education from './education.js'
import Header from './header.js'
import Interests from './interests.js'
import Languages from './languages.js'
import Meta from '../utils/meta.js'
import Projects from './projects.js'
import Publications from './publications.js'
import References from './references.js'
import Skills from './skills.js'
import Volunteer from './volunteer.js'
import Work from './work.js'

/**
 * @param {import('../schema.d.ts').ResumeSchema} resume
 * @param {object} [options]
 * @param {string} [options.css]
 * @param {string} [options.js]
 * @returns
 */
export default function Resume(resume, { css, js } = {}) {
  return html`<!doctype html>
    <html lang="en" style="${colors(resume.meta)}">
      <head>
        <meta charset="utf-8" />
        ${Meta(resume.basics)}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
        ${css &&
        html`<style>
          ${css}
        </style>`}
        ${js &&
        html`<script type="module">
          ${js}
        </script>`}
      </head>
      <body>
        ${Header(resume.basics)}
        <main class="content">
          ${Work(resume.work)} ${Volunteer(resume.volunteer)} ${Education(resume.education)}
          ${Projects(resume.projects)} ${Awards(resume.awards)} ${Certificates(resume.certificates)}
          ${Publications(resume.publications)} ${Skills(resume.skills)} ${Languages(resume.languages)}
          ${Interests(resume.interests)} ${References(resume.references)}
        </main>
      </body>
    </html>`
}
