import { useEffect, useState } from 'react';
import { lenisScrollToElementId } from '@/utils/lenisScroll';

const SECTION_CANDIDATES = [
  { id: 'services-hero', label: 'Hero' },
  { id: 'services-ux-theory', label: 'What UX is' },
  { id: 'services-deliverables', label: 'Tiers' },
  { id: 'services-our-process', label: 'Our process' }
];

const ServicesSectionDots = () => {
  const resolveSections = () =>
    SECTION_CANDIDATES.filter(section => document.getElementById(section.id));

  const [sections, setSections] = useState(() => resolveSections());
  const [activeSection, setActiveSection] = useState(() => (sections[0]?.id ?? 'services-hero'));

  useEffect(() => {
    const hasSameIds = (a, b) =>
      a.length === b.length && a.every((section, index) => section.id === b[index].id);

    const syncSections = () => {
      const next = resolveSections();
      setSections(prev => (hasSameIds(prev, next) ? prev : next));
    };

    syncSections();
    const observer = new MutationObserver(syncSections);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('resize', syncSections);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', syncSections);
    };
  }, []);

  useEffect(() => {
    if (!sections.length) {
      return undefined;
    }

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
        }, sections[0]?.id ?? 'services-hero');

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
  }, [sections]);

  if (!sections.length) {
    return null;
  }

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
