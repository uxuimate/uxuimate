import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const HERO_SLIDES = [
  {
    image: '/img/works/healthy-eats/hero-1.webp',
    eyebrow: 'Product UI Redesign',
    heading: 'Healthy Eats Redesign',
    text: 'A production food-ordering app redesign focused on clarity, faster decisions, and lower checkout friction.'
  },
  {
    image: '/img/works/healthy-eats/hero-2.webp',
    eyebrow: 'Core UX Problem',
    heading: 'Reduce cognitive load',
    text: 'The old product had weak hierarchy and inconsistent patterns, forcing users to think too much for simple actions.'
  },
  {
    image: '/img/works/healthy-eats/hero-3.webp',
    eyebrow: 'Delivery Impact',
    heading: 'System-driven consistency',
    text: 'A reusable design system and linear checkout flow improved scanability, confidence, and task completion speed.'
  }
];

const HealthyEatsHeroSlider = () => (
  <section className="offer-hero video-case-hero" id="home">
    <Swiper
      speed={1500}
      effect="coverflow"
      coverflowEffect={{ rotate: 42, stretch: 0, depth: 520, modifier: 1, slideShadows: true }}
      modules={[Autoplay, Pagination, EffectCoverflow]}
      autoplay={{ delay: 5200, disableOnInteraction: false }}
      pagination={{
        el: '.video-case-hero__pagination',
        clickable: true,
        renderBullet: (index, className) => `<span class="${className}">${index + 1}</span>`
      }}
      className="offer-hero__swiper"
    >
      {HERO_SLIDES.map((slide, index) => (
        <SwiperSlide key={slide.image}>
          <div className="offer-hero__overlay" />
          <img src={slide.image} alt={`${slide.heading} — ${slide.eyebrow}`} loading={index === 0 ? 'eager' : 'lazy'} sizes="100vw" />
          <Container className="offer-hero__content">
            <Row>
              <Col xs={12} className="mb-0 mb-md-5">
                <div className="offer-hero__panel reveal-up">
                  <span className="offer-hero__eyebrow">{slide.eyebrow}</span>
                  <h1 className="offer-hero__heading">{slide.heading}</h1>
                  <p className="offer-hero__text">{slide.text}</p>
                  <div className="video-case-hero__actions">
                    <Link className="btn btn-white btn-rounded btn-large" to="/services">
                      Explore services →
                    </Link>
                    <Link className="btn btn-transparent-white btn-rounded btn-large" to="/works">
                      ← Back to works
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </SwiperSlide>
      ))}
    </Swiper>
    <div className="offer-hero__pagination video-case-hero__pagination" />
  </section>
);

export default HealthyEatsHeroSlider;
