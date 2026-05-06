import { html } from '@rbardini/html'
import markdown from '../utils/markdown.js'
import Icon from '../utils/icon.js'
import Link from '../utils/link.js'

/**
 * @param {string} countryCode
 * @returns {string | undefined}
 */
const formatCountry = countryCode =>
  Intl.DisplayNames ? new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode) : countryCode

/**
 * @param {import('../schema.d.ts').ResumeSchema['basics']} basics
 * @returns {string}
 */
export default function Header(basics = {}) {
  const { email, image, label, location, name, phone, profiles = [], summary, url } = basics

  return html`
    <header class="masthead">
      <div class="masthead-content">
        ${image && html`<img src="${image}" alt="" />`}
        <div class="header-text">
          ${name && html`<h1>${name}</h1>`} ${label && html`<h2>${label}</h2>`}
          ${summary && html`<article>${markdown(summary)}</article>`}
          <ul class="contact-list">
          ${location?.city &&
          html`
            <li>
              ${Icon('map-pin')} ${location.city}${location.countryCode && html`, ${formatCountry(location.countryCode)}`}
            </li>
          `}
          ${email &&
          html`
            <li>
              ${Icon('mail')}
              <a href="mailto:${email}">${email}</a>
            </li>
          `}
          ${phone &&
          html`
            <li>
              ${Icon('phone')}
              <a href="tel:${phone.replace(/\s/g, '')}">${phone}</a>
            </li>
          `}
          ${url && html`<li>${Icon('link')} ${Link(url)}</li>`}
          ${profiles.map(
            ({ network, url, username }) => html`
              <li>
                ${network && Icon(network, 'user')} ${Link(url, username)}
                ${network && html`<span class="network">(${network})</span>`}
              </li>
            `,
          )}
          </ul>
          </div>
      </div>
    </header>
  `
}
