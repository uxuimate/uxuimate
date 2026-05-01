import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CONTACT_BOOK_CALL_ANCHOR, CONTACT_BRIEF_ANCHOR } from '@/constants/booking';
import codeDevelopmentImage from '../assets/img/code-development.webp';
import designThinkingImage from '../assets/img/hero-design-thinking.webp';
import researchHeroImage from '../assets/img/hero-research.webp';
import growthHeroImage from '../assets/img/hero-growth.webp';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const heroSlides = [
  {
    alt: 'Design collaboration and digital product planning',
    eyebrow: 'UX Design',
    title: 'Design thinking that turns ideas into clear digital journeys.',
    text: 'We shape user flows, wireframes, prototypes, and premium interfaces around what your customers actually need.',
    image: designThinkingImage
  },
  {
    alt: 'Web development and modern responsive interfaces',
    eyebrow: 'Web Development',
    title: 'Code development for fast, scalable websites that sell.',
    text: 'Responsive builds, clean implementation, performance, SEO foundations, and launch-ready delivery.',
    image: codeDevelopmentImage
  },
  {
    alt: 'Team research and product discovery workshop',
    eyebrow: 'Research & Insight',
    title: 'Insight before design, so every decision has a reason.',
    text: 'We uncover user needs, business goals, and market opportunities before shaping the experience.',
    image: researchHeroImage
  },
  {
    alt: 'Strategy, analytics, and business growth on screen',
    eyebrow: 'Premium Digital Growth',
    title: 'A sharper website can turn more visitors into serious enquiries.',
    text: 'We combine strategy, UX, branding, and conversion-focused development to make your offer easier to trust, choose, and buy.',
    image: growthHeroImage
  }
];

const HeroOfferSlider = () => {
  return <section className="offer-hero" id="home">
      <Swiper speed={1200} effect="coverflow" coverflowEffect={{
      rotate: 30,
      stretch: 0,
      depth: 420,
      modifier: 1,
      slideShadows: true
    }} modules={[Autoplay, Pagination, EffectCoverflow]} autoplay={{
      delay: 5200,
      disableOnInteraction: false
    }} pagination={{
      el: '.offer-hero__pagination',
      clickable: true,
      renderBullet: (index, className) => `<span class="${className}">${index + 1}</span>`
    }} className="offer-hero__swiper">
        {heroSlides.map((slide, index) => <SwiperSlide key={slide.eyebrow}>
            <div className="offer-hero__overlay" />
            <img src={slide.image} alt={slide.alt} loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} decoding="async" sizes="100vw" />
            <Container className="offer-hero__content">
              <Row>
                <Col xs={12} className="mb-0 mb-md-5">
                  <div className="offer-hero__panel">
                    <span className="offer-hero__eyebrow">{slide.eyebrow}</span>
                    <h1 className="offer-hero__heading">{slide.title}</h1>
                    <p className="offer-hero__text">{slide.text}</p>
                    <div className="offer-hero__ctas">
                      <Link to={CONTACT_BRIEF_ANCHOR} className="btn btn-white btn-rounded btn-large">
                        Send your brief
                      </Link>
                      <Link to={CONTACT_BOOK_CALL_ANCHOR} className="btn btn-transparent-white btn-rounded btn-large">
                        Book 30-min call
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </SwiperSlide>)}
      </Swiper>

      <div className="offer-hero__pagination" />
    </section>;
};

export default HeroOfferSlider;
