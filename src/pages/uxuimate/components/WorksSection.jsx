import { useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SELECTED_WORKS_FOR_PARALLAX } from '@/data/selectedWorksProjects';

const WorksSection = ({ eyebrow = 'Selected Projects', heading = 'Selected Work', excludedProjectIds = [] }) => {
  const cardStateRef = useRef(new WeakMap());

  useEffect(() => {
    return () => {
      cardStateRef.current = new WeakMap();
    };
  }, []);
  const projects = useMemo(() => {
    const excluded = new Set(excludedProjectIds);
    return SELECTED_WORKS_FOR_PARALLAX.filter(project => !excluded.has(project.id)).slice(0, 3);
  }, [excludedProjectIds]);

  const handleCardEnter = event => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const state = cardStateRef.current.get(card) ?? {};
    cardStateRef.current.set(card, {
      ...state,
      rect
    });
  };

  const handleCardMove = event => {
    const card = event.currentTarget;
    const prevState = cardStateRef.current.get(card) ?? {};
    const rect = prevState.rect ?? card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rafId = requestAnimationFrame(() => {
      card.style.setProperty('--tilt-x', `${rotateX}deg`);
      card.style.setProperty('--tilt-y', `${rotateY}deg`);
      card.style.setProperty('--glow-x', `${x}px`);
      card.style.setProperty('--glow-y', `${y}px`);
    });

    if (prevState.rafId) {
      cancelAnimationFrame(prevState.rafId);
    }
    cardStateRef.current.set(card, {
      ...prevState,
      rect,
      rafId
    });
  };

  const handleCardLeave = event => {
    const card = event.currentTarget;
    const state = cardStateRef.current.get(card);
    if (state?.rafId) {
      cancelAnimationFrame(state.rafId);
    }
    cardStateRef.current.delete(card);

    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
    card.style.setProperty('--glow-x', '50%');
    card.style.setProperty('--glow-y', '0%');
  };

  if (!projects.length) {
    return null;
  }

  return (
    <section id="works" className="works-section">
      <div className="works-section__header">
        <div className="reveal-up">
          <span className="works-section__eyebrow">{eyebrow}</span>
          <h2>{heading}</h2>
        </div>
        <div className="works-section__actions reveal-up">
          <Link to="/works" className="btn btn-white btn-rounded btn-large works-section__btn">
            View all works
          </Link>
        </div>
      </div>

      <div className="works-section__fan-wrap">
        <div className="works-fan">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`works-fan__item works-fan__item--${index}`}
            >
              <Link
                className="works-card works-card--fan"
                to={project.url}
                aria-label={`${project.name} case study`}
              >
                <article
                className="works-card works-card--fan"
                onPointerEnter={handleCardEnter}
                onPointerMove={handleCardMove}
                onPointerLeave={e => {
                  handleCardLeave(e);
                }}
              >
                <div
                  className="works-card__image"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 48%, rgba(0, 0, 0, 0.35) 100%), url("${project.image}")`
                  }}
                />
                <div className="works-card__content">
                  <span>{project.category}</span>
                  <h3>{project.name}</h3>
                  <span className="btn btn-transparent-white btn-rounded works-card__link-btn">
                    View case study
                  </span>
                </div>
                </article>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorksSection;
