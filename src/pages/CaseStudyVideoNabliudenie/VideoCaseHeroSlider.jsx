import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const HERO_SLIDES = [
  {
    image: '/img/works/videonabliudenie-bg/hero-1.webp',
    eyebrow: 'UX/UI Design & Web Development',
    heading: 'VideoNabliudenie.bg',
    text: 'A B2B-first digital system that reframed the company from local installer to integrated security partner.'
  },
  {
    image: '/img/works/videonabliudenie-bg/outcomes.webp',
    eyebrow: 'Client Feedback',
    heading: 'Built with trust and structure',
    text: 'After several failed attempts with other providers, the client chose UX UI MATE for a clear process, professional communication, and strong understanding of web design and user behavior.'
  },
  {
    image: '/img/works/videonabliudenie-bg/process.webp',
    eyebrow: 'Delivery Impact',
    heading: 'From strategy to live launch',
    text: 'The full site was rebuilt from scratch through research, structure, Figma UI, development, usability testing, and post-launch support.'
  }
];

const VideoCaseHeroSlider = () => (
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
                  <p className="offer-hero__text">
                    {slide.text}
                  </p>
                  <div className="video-case-hero__actions">
                    <a className="btn btn-white btn-rounded btn-large" href="https://videonabliudenie.bg/" target="_blank" rel="noreferrer">
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

export default VideoCaseHeroSlider;
