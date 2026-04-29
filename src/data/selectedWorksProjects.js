/**
 * Canonical selected-work entries - shared by Innovative Parallax (#works) and /works page.
 */
import { withBasePath } from '@/utils';

export const SELECTED_WORKS_PROJECTS = [
  {
    id: 'videonabliudenie-bg',
    name: 'VideoNabliudenie.bg',
    client: 'VideoNabliudenie.bg',
    year: 2026,
    filterSlug: 'web',
    tagPill: 'Web dev',
    headline: 'B2B security flagship that converts cold traffic',
    outcomeMetric: '+31%',
    outcomeRest: 'qualified inbound lift',
    category: 'Web Development',
    url: '/works/videonabliudenie-bg',
    image: withBasePath('/img/works/videonabliudenie-bg/hero-1.jpg'),
    imagePortrait: withBasePath('/img/works/videonabliudenie-bg/card-portrait.jpg'),
    tagline: 'Security-first commerce with a calm, authoritative digital flagship.'
  },
  {
    id: 'bomi-clima',
    name: 'Er Clima Solutions',
    client: 'Er Clima Solutions',
    year: 2025,
    filterSlug: 'web',
    tagPill: 'Web dev',
    headline: 'Industrial HVAC web system with product clarity',
    outcomeMetric: '−42%',
    outcomeRest: 'bounce on product pages',
    category: 'Web Development',
    url: '/works/er-clima-solutions',
    image: withBasePath('/img/works/er-clima/hero-1.jpg'),
    imagePortrait: withBasePath('/img/works/er-clima/hero-2.jpg'),
    tagline: 'Industrial climate control, translated into a precise responsive system.'
  },
  {
    id: 'soft-play-solutions',
    name: 'Soft Play Solutions',
    client: 'Soft Play Solutions',
    year: 2025,
    filterSlug: 'web',
    tagPill: 'Web dev',
    headline: 'Play brand site engineered for leads, not just looks',
    outcomeMetric: '2.4×',
    outcomeRest: 'average session depth',
    category: 'Web Development',
    url: '/works/soft-play-solutions',
    image: withBasePath('/img/works/soft-play-solutions/card.jpg'),
    imagePortrait: withBasePath('/img/works/soft-play-solutions/card-portrait.jpg'),
    tagline: 'Playful category storytelling with conversion-grade structure.'
  },
  {
    id: 'eco-herbalist-ux',
    name: 'Eco Herbalist UX',
    client: 'Eco Herbalist',
    year: 2025,
    filterSlug: 'ux-ui',
    tagPill: 'UX/UI design',
    headline: 'Wellness journeys that feel calm, fast, and trustworthy',
    outcomeMetric: '+67%',
    outcomeRest: 'checkout completion',
    category: 'UX/UI Design',
    url: '/works/eco-herbalist-ux',
    image: withBasePath('/img/works/eco-herbalist-ux/card.jpg'),
    imagePortrait: withBasePath('/img/works/eco-herbalist-ux/card-portrait.jpg'),
    tagline: 'Heritage wellness UX - clarity, ritual, and trust at every step.'
  },
  {
    id: 'healthy-eats',
    name: 'Healthy Eats Redesign',
    client: 'Healthy Eats',
    year: 2025,
    filterSlug: 'ux-ui',
    tagPill: 'UX/UI design',
    headline: 'Nutrition app redesign subscribers actually finish',
    outcomeMetric: '+19%',
    outcomeRest: 'subscription conversion',
    category: 'UX/UI Redesign',
    url: '/works/healthy-eats-redesign',
    image: withBasePath('/img/works/healthy-eats/card.jpg'),
    imagePortrait: withBasePath('/img/works/healthy-eats/card-portrait.jpg'),
    tagline: 'Nutrition platform redesign with appetite-led visual hierarchy.'
  },
  {
    id: 'eco-herbalist-brand',
    name: 'Eco Herbalist Branding',
    client: 'Eco Herbalist',
    year: 2024,
    filterSlug: 'branding',
    tagPill: 'Branding',
    headline: 'Botanical identity scaled for retail and digital',
    outcomeMetric: '100+',
    outcomeRest: 'assets in one source of truth',
    category: 'Brand Guidelines',
    url: '/works/eco-herbalist-branding',
    image: withBasePath('/img/works/eco-herbalist-branding/card.jpg'),
    imagePortrait: withBasePath('/img/works/eco-herbalist-branding/card-portrait.jpg'),
    tagline: 'Botanical identity system - guidelines built for scale and craft.'
  },
  {
    id: 'cinematic-escapes',
    name: 'Cinematic Escapes',
    client: 'Private project',
    year: 2023,
    filterSlug: 'branding',
    tagPill: 'Branding',
    headline: 'Travel campaign creative that stops the scroll',
    outcomeMetric: '4.8×',
    outcomeRest: 'dwell on hero sequence',
    category: 'Visual Creative',
    url: '/works/cinematic-escapes',
    image: withBasePath('/img/works/cinematic-escapes/card.jpg'),
    imagePortrait: withBasePath('/img/works/cinematic-escapes/card-portrait.jpg'),
    tagline: 'Immersive visual narrative - theatre for the travel imagination.'
  }
];

/**
 * Innovative Parallax #works carousel only - shortlist; full mosaic stays on /works.
 * Order here is the slide order.
 */
const PARALLAX_WORKS_CARD_IDS = [
  'videonabliudenie-bg',
  'eco-herbalist-ux',
  'healthy-eats',
  'eco-herbalist-brand'
];

const byId = new Map(SELECTED_WORKS_PROJECTS.map(p => [p.id, p]));

export const SELECTED_WORKS_FOR_PARALLAX = PARALLAX_WORKS_CARD_IDS.map(id => byId.get(id)).filter(Boolean);
