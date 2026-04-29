import { SELECTED_WORKS_PROJECTS } from '@/data/selectedWorksProjects';
import { getInterlockPlacement, INTERLOCK_PLACEMENT_CLASS } from './worksShowcasePlacement';
import MobileSliderHint from '@/components/MobileSliderHint';
import { Link } from 'react-router-dom';

function catalogCardImageSrc(project, placement) {
  const narrow = placement === 'narrow-right' || placement === 'narrow-left';
  if (narrow && project.imagePortrait) {
    return project.imagePortrait;
  }
  return project.image;
}

const WorksProjectsSection = () => (
  <section className="works-showcase" id="works" aria-label="Selected work projects">
    <div className="works-showcase__grain" aria-hidden="true" />
    <div className="works-showcase__glow" aria-hidden="true" />

    <div className="works-showcase__inner">
      <ul className="works-showcase__grid works-showcase__grid--catalog mobile-card-slider" role="list">
        {SELECTED_WORKS_PROJECTS.map((project, index) => {
          const placement = getInterlockPlacement(index, SELECTED_WORKS_PROJECTS.length);
          const placeClass = INTERLOCK_PLACEMENT_CLASS[placement];
          const imgSrc = catalogCardImageSrc(project, placement);
          return (
            <li key={project.id} className={`works-showcase__cell ${placeClass} mobile-card-slide`}>
              <article className="works-showcase-card" id={project.id}>
                <Link
                  className="works-showcase-card__link"
                  to={project.url}
                  aria-label={`${project.headline}. ${project.client}. ${project.outcomeMetric} ${project.outcomeRest}. Open case study.`}
                >
                  <div className="works-showcase-card__frame">
                    <img
                      className="works-showcase-card__img"
                      src={imgSrc}
                      alt={`${project.name} case study preview`}
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 767px) 100vw, 50vw"
                    />
                    <div className="works-showcase-card__gradient" aria-hidden="true" />
                    <span className="works-showcase-card__arrow" aria-hidden="true">
                      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M4 13L13 4M13 4H6M13 4V11"
                          stroke="currentColor"
                          strokeWidth="1.15"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div className="works-showcase-card__copy">
                      <div className="works-showcase-card__pills">
                        <span className="works-showcase-card__pill">{project.tagPill}</span>
                      </div>
                      <span className="works-showcase-card__client">{project.client}</span>
                      <h3 className="works-showcase-card__headline">{project.headline}</h3>
                      <p className="works-showcase-card__outcome">
                        <span className="works-showcase-card__metric">{project.outcomeMetric}</span>{' '}
                        {project.outcomeRest}
                      </p>
                    </div>
                  </div>
                </Link>
              </article>
            </li>
          );
        })}
      </ul>
      <MobileSliderHint dotCount={Math.min(SELECTED_WORKS_PROJECTS.length, 6)} />
    </div>
  </section>
);

export default WorksProjectsSection;
