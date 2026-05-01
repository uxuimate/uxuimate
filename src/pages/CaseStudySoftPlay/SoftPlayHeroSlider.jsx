import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const HERO_SLIDES = [
  {
    image: '/img/works/soft-play-solutions/hero-1.webp',
    eyebrow: 'UX/UI Design & Web Development',
    heading: 'Soft Play Solutions',
    text: 'A bilingual website redesign that transformed the business from no online presence to a professional global portfolio.'
  },
  {
    image: '/img/works/soft-play-solutions/hero-2.webp',
    eyebrow: 'Core Challenge',
    heading: 'Trust and clarity at first visit',
    text: 'The experience was structured to showcase real projects, clear services, and strong proof signals for faster B2B confidence.'
  },
  {
    image: '/img/works/soft-play-solutions/hero-3.webp',
    eyebrow: 'Delivery Impact',
    heading: 'From brochure gap to lead system',
    text: 'The new site now works as a 24/7 sales tool with bilingual content, clear service flows, and inquiry-first conversion paths.'
  }
];

const SoftPlayHeroSlider = () => (
  <section className="offer-hero video-case-hero" id="home">
    <Swiper
      speed={1500}
      effect="coverflow"
      coverflowEffect={{
        rotate: 42,
        stretch: 0,
        depth: 520,
        modifier: 1,
        slideShadows: true
      }}
      modules={[Autoplay, Pagination, EffectCoverflow]}
      autoplay={{
        delay: 5200,
        disableOnInteraction: false
      }}
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
                    <a className="btn btn-white btn-rounded btn-large" href="https://www.spsbul.com" target="_blank" rel="noreferrer">
                      Visit live site →
                    </a>
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

export default SoftPlayHeroSlider;
