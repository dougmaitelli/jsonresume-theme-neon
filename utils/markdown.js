import { micromark } from 'micromark'
import striptags from 'striptags'

/**
 * @param {string} doc
 * @param {boolean} [stripTags]
 * @returns
 */
export default function markdown(doc, stripTags = false) {
  const html = micromark(doc)
  return stripTags ? striptags(html) : html
}
