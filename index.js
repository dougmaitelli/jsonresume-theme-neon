import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import Resume from './components/resume.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const js = readFileSync(join(__dirname, 'assets', 'page.js'), 'utf-8')
const css = readFileSync(join(__dirname, 'assets', 'page.css'), 'utf-8')

export const pdfRenderOptions = {
  mediaType: 'print',
  printBackground: true,
}

/**
 * @param {import('./schema.d.ts').ResumeSchema} resume
 * @returns {string}
 */
export const render = resume => {
  return Resume(resume, { css, js })
}
