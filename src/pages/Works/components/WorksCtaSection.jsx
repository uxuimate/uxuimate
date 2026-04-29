import { Link } from 'react-router-dom';
import { CONTACT_BOOK_CALL_ANCHOR } from '@/constants/booking';

const WorksCtaSection = () => (
  <section className="works-cta" aria-labelledby="works-cta-heading">
    <div className="works-cta__inner">
      <p className="works-cta__eyebrow">Start a project</p>
      <h2 id="works-cta-heading" className="works-cta__heading">
        Ready to be next?
      </h2>
      <p className="works-cta__sub">Let&apos;s build something worth remembering.</p>
      <Link className="btn btn-transparent-white btn-rounded btn-large works-cta__btn" to={CONTACT_BOOK_CALL_ANCHOR}>
        Book a Free Call
      </Link>
    </div>
  </section>
);

export default WorksCtaSection;
