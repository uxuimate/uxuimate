import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const HERO_SLIDES = [
  {
    image: '/img/works/eco-herbalist-branding/hero-1.webp',
    eyebrow: 'Brand Identity Design',
    heading: 'Eco Herbalist Branding',
    text: 'A full visual identity system designed to build trust, consistency, and standout presence in the wellness market.'
  },
  {
    image: '/img/works/eco-herbalist-branding/hero-2.webp',
    eyebrow: 'Brand Challenge',
    heading: 'From generic look to distinct identity',
    text: 'The brand needed stronger differentiation and clear visual rules across packaging, digital, and marketing touchpoints.'
  },
  {
    image: '/img/works/eco-herbalist-branding/hero-3.webp',
    eyebrow: 'Delivery Impact',
    heading: 'System, not one-off visuals',
    text: 'A complete guideline enabled consistent execution and faster rollouts across all customer-facing materials.'
  }
];

const EcoHerbalistBrandingHeroSlider = () => (
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

export default EcoHerbalistBrandingHeroSlider;
