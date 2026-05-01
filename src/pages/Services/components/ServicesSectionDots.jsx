import { useEffect, useState } from 'react';

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
        const viewportCenter = window.scrollY + window.innerHeight / 2;
        let bestId = sections[0]?.id ?? 'services-hero';
        let bestDistance = Number.POSITIVE_INFINITY;

        sections.forEach(section => {
          const element = document.getElementById(section.id);

          if (!element) {
            return;
          }

          const rect = element.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          const sectionCenter = sectionTop + rect.height / 2;
          const distance = Math.abs(sectionCenter - viewportCenter);

          if (distance < bestDistance) {
            bestDistance = distance;
            bestId = section.id;
          }
        });

        setActiveSection(prev => (prev === bestId ? prev : bestId));
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

  const scrollToSection = sectionId => {
    const element = document.getElementById(sectionId);
    if (!element) {
      return;
    }
    // Keep section heading clear of sticky nav.
    const NAV_OFFSET = 96;
    const top = element.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
  };

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
              onClick={() => scrollToSection(section.id)}
            />
          </li>;
      })}
      </ul>
    </nav>;
};

export default ServicesSectionDots;
