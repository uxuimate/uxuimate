import { useEffect, useRef, useState } from 'react';
import '@vendor/css/owl.carousel.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import dimitarPortrait from '../assets/img/feedback/uxm-face-dimitar.webp';
import mohaanPortrait from '../assets/img/feedback/uxm-face-mohaan.webp';
import ivaPortrait from '../assets/img/feedback/uxm-face-iva.webp';
import stanislavPortrait from '../assets/img/feedback/uxm-face-stanislav.webp';
import teamBg from '../assets/img/feedback/team-bg.webp';

const FEEDBACK_CAROUSEL = '#innovative-testimonial-quote';

const feedbackItems = [
  {
    name: 'Dimitar Ermenliev',
    role: 'Bomi Clima (ER CLIMA)',
    image: dimitarPortrait,
    quote: `I had the pleasure of working with this creative agency, and I must say, they truly impressed me. They consistently think outside the box, resulting in impressive and impactful work. I highly recommend this agency for their consistent delivery of exceptional creative solutions.`
  },
  {
    name: 'Mohaan Biswas',
    role: 'Gateshead College - Level 5 Diploma',
    image: mohaanPortrait,
    quote: `A strong, research-led UX project with clear, evidence-based design decisions. User insights were effectively translated into well-structured flows and polished, user-friendly prototypes. The work was professionally presented and demonstrated a confident understanding of user-centred design.`
  },
  {
    name: 'Iva Kostadinova',
    role: 'Digital Marketing Manager & Brand Strategist',
    image: ivaPortrait,
    quote: `Working with Alexander was extremely pleasant and professional. Communication throughout the entire process was clear, timely, and very smooth, which made the collaboration easy and effective. He quickly understood our business needs and transformed them into a clear, intuitive, and modern UX. The result exceeded our expectations, and we would be happy to work with him again.`
  },
  {
    name: 'Stanislav Hristov',
    role: 'Soft Play Solutions',
    image: stanislavPortrait,
    quote: `We've been absolutely blown away by the team. Their creativity is on another level - they don't just follow trends, they come up with bold, original concepts that perfectly fit our brand and really stand out in the soft play industry. Every detail is thoughtfully executed, the visuals are stunning, and the final results have had a huge impact on how customers see Soft Play Solutions. Highly recommend working with them!`
  }
];

const FeedbackSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const jqueryRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    let cleanup = () => {};

    const initCarousel = async () => {
      const jqueryModule = await import('jquery');
      if (!mounted) {
        return;
      }

      const $ = jqueryModule.default;
      jqueryRef.current = $;
      window.$ = window.jQuery = $;
      await import('@vendor/js/owl.carousel.min.js');
      if (!mounted) {
        return;
      }

      const $carousel = $(FEEDBACK_CAROUSEL);
      if (!$carousel.length) {
        return;
      }

      const onChanged = (event) => {
        if (event.item && Number.isInteger(event.item.index)) {
          setActiveIndex(event.item.index);
        }
      };

      $carousel.owlCarousel({
        items: 1,
        autoplay: true,
        autoplayTimeout: 2500,
        autoplayHoverPause: true,
        mouseDrag: false,
        loop: false,
        rewind: true,
        margin: 30,
        dots: false,
        nav: false,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        responsive: {
          1280: { items: 1 },
          600: { items: 1 },
          320: { items: 1 }
        }
      });

      $carousel.on('changed.owl.carousel', onChanged);

      cleanup = () => {
        $carousel.off('changed.owl.carousel', onChanged);
        if ($carousel.data('owl.carousel')) {
          $carousel.trigger('destroy.owl.carousel');
        }
      };
    };

    void initCarousel();

    return () => {
      mounted = false;
      cleanup();
    };
  }, []);

  return <section
      className="section bg-team feedback-section"
      id="feedback"
      style={{ backgroundImage: `url("${teamBg}")` }}
    >
      <div className="bg-overlay bg-black opacity-4" />
      <Container fluid className="feedback-section__container">
        <Row className="justify-content-center">
          <Col xs={12} className="feedback-section__col">
            <div
              className="owl-carousel"
              id="innovative-testimonial-quote"
            >
              {feedbackItems.map(item => <div key={item.name} className="item">
                  <div className="testimonial-quote whitecolor">
                    <div className="team-img mb-4">
                      <img src={item.image} alt={`${item.name}, ${item.role}`} />
                    </div>
                    <h1 className="font-weight-light mb-3 alt-font">{item.name}</h1>
                    <div className="mb-3 testimonial-line wow fadeInleft" />
                    <div className="mb-1 mb-md-5"> <span>{item.role}</span></div>
                    <div className="team-description mb-1 mb-md-5">
                      <p className="m-0">{item.quote}</p>
                    </div>
                  </div>
                </div>)}
            </div>
            <div className="feedback-section__thumbs" role="tablist" aria-label="Choose testimonial">
              {feedbackItems.map((item, index) => <button
                  key={item.name}
                  className={`feedback-section__thumb link ${index === activeIndex ? 'active' : ''}`}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Show testimonial: ${item.name}`}
                  onClick={() => {
                    const $ = jqueryRef.current;
                    if (!$) {
                      return;
                    }
                    const $c = $(FEEDBACK_CAROUSEL);
                    if ($c.data('owl.carousel')) {
                      $c.trigger('to.owl.carousel', [index, 300]);
                    }
                    setActiveIndex(index);
                  }}
                >
                  <img src={item.image} alt="" aria-hidden="true" />
                </button>)}
            </div>
            <div className="team-item d-none" />
          </Col>
        </Row>
      </Container>
    </section>;
};

export default FeedbackSection;
