import { useEffect, useState } from 'react';
import { lenisScrollToElementId } from '@/utils/lenisScroll';

const SECTION_CANDIDATES = [
  { id: 'about-hero', label: 'Hero' },
  { id: 'about-intro', label: 'Belief' },
  { id: 'about-why-studio', label: 'Why us' },
  { id: 'about-principles', label: 'How we work' },
  { id: 'about-founder', label: 'Founder' },
  { id: 'contact', label: 'Contact' },
  { id: 'page-footer', label: 'Footer' }
];

const AboutSectionDots = () => {
  const resolveSections = () =>
    SECTION_CANDIDATES.filter(section => document.getElementById(section.id));

  const [sections, setSections] = useState(() => resolveSections());
  const [activeSection, setActiveSection] = useState(() => (sections[0]?.id ?? 'about-hero'));

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

    const updateActiveSection = () => {
      const scrollMarker = window.scrollY + window.innerHeight * 0.5;
      const currentSection = sections.reduce((activeId, section) => {
        const element = document.getElementById(section.id);

        if (!element) {
          return activeId;
        }

        const sectionTop = element.getBoundingClientRect().top + window.scrollY;

        return sectionTop <= scrollMarker ? section.id : activeId;
      }, sections[0]?.id ?? 'about-hero');

      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [sections]);

  if (!sections.length) {
    return null;
  }

  return (
    <nav className="section-dots" aria-label="On this page">
      <ul>
        {sections.map(section => {
          const isActive = section.id === activeSection;
          return (
            <li key={section.id}>
              <button
                type="button"
                className={isActive ? 'active' : ''}
                aria-label={`Scroll to: ${section.label}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => {
                  lenisScrollToElementId(section.id);
                }}
              >
                <span />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default AboutSectionDots;
