const UX = {
  quote: <>Working with UX UI Mate completely changed how we think about our product. They
    didn&apos;t just design screens - they challenged our assumptions, talked to our
    users, and delivered something we couldn&apos;t have built without them.</>,
  name: 'Sarah Mitchell',
  role: 'Founder, Launchpad App'
};

const DEVELOPMENT = {
  quote: <>They didn&apos;t just build what we asked for - they made it better. We
    finally have a website we&apos;re proud to send clients to.</>,
  name: 'James Harrison',
  role: 'Founder, Bridgepoint Studio'
};

const BRANDING = {
  quote: <>We&apos;d been putting off sorting our brand for two years. UX UI Mate turned it
    around in three weeks - and we finally look like the company we actually are.</>,
  name: 'Oliver Pemberton',
  role: 'Co-founder, Canvass Studio'
};

const MOBILE_SAAS = {
  quote: <>We came with a rough idea and left with a product our investors actually got excited about. The research phase alone changed how we thought about our own users.</>,
  name: 'Tom Ashworth',
  role: 'CPO, Stackly'
};

const ServicesTestimonialSection = ({ mode = 'ux' }) => {
  const copy = mode === 'mobile'
    ? MOBILE_SAAS
    : mode === 'branding'
      ? BRANDING
      : mode === 'development'
        ? DEVELOPMENT
        : UX;
  const headingId = mode === 'mobile'
    ? 'services-testimonial-heading-mobile'
    : mode === 'branding'
      ? 'services-testimonial-heading-brand'
      : mode === 'development'
        ? 'services-testimonial-heading-dev'
        : 'services-testimonial-heading';

  return <section
      className="services-testimonial"
      aria-labelledby={headingId}
    >
      <div className="services-testimonial__inner">
        <p className="services-testimonial__mark" aria-hidden="true">“</p>
        <blockquote
          className="services-testimonial__quote"
          id={headingId}
        >
          <p>
            {copy.quote}
          </p>
        </blockquote>
        <div className="services-testimonial__rule" role="presentation" />
        <p className="services-testimonial__name">{copy.name}</p>
        <p className="services-testimonial__role">{copy.role}</p>
      </div>
    </section>;
};

export default ServicesTestimonialSection;
