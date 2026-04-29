/**
 * In-app "Book ... call" CTAs - scroll to embedded Calendly on Contact (stay on site).
 */
export const CONTACT_BOOK_CALL_ANCHOR = '/contact#book-a-call';
export const CONTACT_BRIEF_ANCHOR = '/contact#contact';

/**
 * Direct Calendly page (optional share / email). CTAs use CONTACT_BOOK_CALL_ANCHOR.
 */
export const CALENDLY_BOOKING_URL = 'https://calendly.com/uxuimate/30min';

/**
 * Inline iframe - one soft greige surface inside the iframe (no white "mat" around a dark card).
 * Outer page stays void #04050a; only the calendar chrome uses this tone.
 * Calendly hex params omit # (see embed options).
 */
export const CALENDLY_INLINE_WIDGET_URL =
  'https://calendly.com/uxuimate/30min?hide_event_type_details=1&background_color=d5d9e2&text_color=1a1b20&primary_color=e8195a';
