import { useEffect, useState } from 'react';
import { lenisScrollToElementId } from '@/utils/lenisScroll';

const sections = [
  { id: 'services-hero', label: 'Hero' },
  { id: 'services-ux-theory', label: 'What UX is' },
  { id: 'services-deliverables', label: 'Tiers' },
  { id: 'services-our-process', label: 'Our process' }
];

const ServicesSectionDots = () => {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    let rafId = 0;

    const updateActiveSection = () => {
      if (rafId) {
        return;
      }
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const scrollMarker = window.scrollY + window.innerHeight * 0.4;
        const currentSection = sections.reduce((activeId, section) => {
          const element = document.getElementById(section.id);

          if (!element) {
            return activeId;
          }

          const sectionTop = element.getBoundingClientRect().top + window.scrollY;

          return sectionTop <= scrollMarker ? section.id : activeId;
        }, sections[0].id);

        setActiveSection(prev => (prev === currentSection ? prev : currentSection));
      });
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  return <nav className="services-section-dots" aria-label="On this page">
      <ul className="services-section-dots__list">
        {sections.map(section => {
        const isActive = section.id === activeSection;

        return <li key={section.id} className="services-section-dots__item">
            <button
              type="button"
              className={'services-section-dots__btn' + (isActive ? ' is-active' : '')}
              aria-label={`Scroll to: ${section.label}`}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => {
                lenisScrollToElementId(section.id);
              }}
            />
          </li>;
      })}
      </ul>
    </nav>;
};

export default ServicesSectionDots;
