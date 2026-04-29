import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CONTACT_BOOK_CALL_ANCHOR } from '@/constants/booking';
import processBackground from '../assets/img/single-portfolio2.jpg';

const processSteps = [
  {
    number: '01',
    title: 'You get in touch',
    text: 'Fill the form or book a call. No commitment, no pressure.'
  },
  {
    number: '02',
    title: 'Free 30-min call',
    text: "We learn about your business, your goals, and what's not working right now. You get honest advice - even if we're not the right fit."
  },
  {
    number: '03',
    title: 'You receive a proposal',
    text: "A clear document. What we'll build, what's included, what's not, and exactly how much it costs. No hidden fees."
  },
  {
    number: '04',
    title: 'Agreement signed',
    text: "Simple terms. Clear scope. Payment split into milestones so you're never paying for work you haven't seen."
  },
  {
    number: '05',
    title: 'We get to work',
    text: 'Weekly updates. You see progress at every stage and approve before we move forward.'
  },
  {
    number: '06',
    title: 'Launch & handoff',
    text: "Your site goes live. You get all files, a walkthrough, and 30 days of included support. We don't disappear."
  }
];

const OurProcessSection = ({
  id = 'process',
  backgroundImage = processBackground,
  bookCallHref = CONTACT_BOOK_CALL_ANCHOR,
  heading = "Here's exactly what happens when you work with us.",
  intro = 'No vague steps, no hidden surprises. Just a clear path from first conversation to launch.',
  eyebrow = 'Our Process',
  steps = processSteps,
  showCta = true
}) => {
  const bookCallExternal = /^https?:\/\//i.test(bookCallHref);
  const bookCallSpa = bookCallHref.startsWith('/') && !bookCallHref.startsWith('//') && !bookCallExternal;

  const ctaClasses = 'btn btn-transparent-white btn-rounded btn-large';

  const cta = bookCallSpa ? (
    <Link className={ctaClasses} to={bookCallHref}>
      Book your free 30-min call
    </Link>
  ) : (
    <a className={ctaClasses} href={bookCallHref} {...(bookCallExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      Book your free 30-min call
    </a>
  );

  return <section
      className="our-process-section our-process-timeline-section"
      id={id}
      style={{
        backgroundAttachment: 'scroll',
        backgroundImage: `url("${backgroundImage}")`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <Container>
        <Row>
          <Col xs={12} className="our-process__content our-process-timeline__heading text-center reveal-up">
            <span className="our-process__eyebrow">{eyebrow}</span>
            <h2>{heading}</h2>
            <span className="our-process__line" />
            <p className="our-process__intro">{intro}</p>
          </Col>
          <Col xs={12}>
            <div className="our-process-timeline">
              {steps.map((step, index) => <article className={`our-process-timeline__item ${index % 2 === 0 ? 'is-left' : 'is-right'} reveal-up`} data-delay={(index * 0.08).toFixed(2)} key={step.number}>
                  <div className="our-process-timeline__card">
                    <span>{step.number}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>)}
            </div>
          </Col>
          {showCta ? <Col xs={12} className="our-process__cta text-center py-4 py-md-5 reveal-up">
              {cta}
            </Col> : null}
        </Row>
      </Container>
    </section>;
};

export default OurProcessSection;
