/** Shared local + service SEO: keywords, merges, and JSON-LD fragments */

export const SITE_NAME = 'UX UI Mate';
export const SITE_URL = 'https://uxuimate.com';

/** X (Twitter) handle for cards and structured data — include @ prefix for meta tags */
export const SITE_TWITTER_SITE = '@uxuimate';
export const SITE_X_PROFILE_URL = 'https://x.com/uxuimate';

/** Baseline phrases merged into meta keywords on most pages (deduped, case-insensitive). */
export const SITE_CORE_KEYWORDS = [
  'UX design',
  'UI design',
  'UX research',
  'Branding',
  'No-code development',
  'Web design',
  'Web development',
  'Custom code',
  'Custom development',
  'Premium digital studio',
  'Digital product studio',
  'Newcastle',
  'Newcastle upon Tyne',
  'Sofia',
  'United Kingdom',
  'UK',
  'Bulgaria',
  'Europe',
  'UX UI agency',
  'UX design agency',
  'UI design agency',
  'UX UI Mate',
  'uxuimate'
];

export const SCHEMA_SERVICE_TYPES = [
  'UX design',
  'UI design',
  'UX research',
  'Branding',
  'No-code development',
  'Web design',
  'Web development',
  'Custom development',
  'Mobile app design',
  'SaaS product design'
];

export const SCHEMA_KNOWS_ABOUT = [
  'User experience design',
  'User interface design',
  'UX research',
  'Brand identity',
  'No-code platforms',
  'Responsive web design',
  'Front-end development',
  'Newcastle upon Tyne',
  'Sofia',
  'United Kingdom',
  'Bulgaria',
  'European Union'
];

export const SCHEMA_AREA_SERVED = [
  {
    '@type': 'City',
    name: 'Newcastle upon Tyne',
    containedInPlace: { '@type': 'Country', name: 'United Kingdom' }
  },
  { '@type': 'City', name: 'Sofia', containedInPlace: { '@type': 'Country', name: 'Bulgaria' } },
  { '@type': 'Country', name: 'United Kingdom' },
  { '@type': 'Country', name: 'Bulgaria' },
  { '@type': 'Place', name: 'Europe' }
];

/**
 * @param {...(string[]|string)} groups
 * @returns {string[]}
 */
export function mergeKeywords(...groups) {
  const seen = new Set();
  const out = [];

  for (const g of groups) {
    const arr = Array.isArray(g) ? g : typeof g === 'string' ? [g] : [];

    for (const raw of arr) {
      const k = String(raw).trim();
      if (!k) {
        continue;
      }

      const lower = k.toLowerCase();

      if (seen.has(lower)) {
        continue;
      }

      seen.add(lower);
      out.push(k);
    }
  }

  return out;
}

export function buildStudioHomeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        email: 'uxuimate@gmail.com',
        description:
          'Premium UX/UI design studio in Newcastle, UK and Sofia, Bulgaria — UX research, branding, web design, no-code and custom web development for teams across the UK, Bulgaria and Europe.',
        areaServed: SCHEMA_AREA_SERVED,
        knowsAbout: SCHEMA_KNOWS_ABOUT,
        serviceType: SCHEMA_SERVICE_TYPES,
        sameAs: [SITE_X_PROFILE_URL, 'https://twitter.com/uxuimate']
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: 'en-GB',
        publisher: { '@id': `${SITE_URL}/#organization` }
      }
    ]
  };
}

/**
 * @param {{ email: string, telephone?: string, contactUrl?: string }} p
 */
export function buildStudioContactJsonLd({ email, telephone, contactUrl }) {
  const url = contactUrl || `${SITE_URL}/contact`;

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${url}#contact`,
    name: SITE_NAME,
    url,
    email,
    ...(telephone ? { telephone } : {}),
    areaServed: SCHEMA_AREA_SERVED,
    knowsAbout: SCHEMA_KNOWS_ABOUT,
    serviceType: SCHEMA_SERVICE_TYPES,
    sameAs: [SITE_X_PROFILE_URL, 'https://twitter.com/uxuimate'],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email,
        ...(telephone ? { telephone } : {}),
        areaServed: ['GB', 'BG', 'EU']
      }
    ]
  };
}
