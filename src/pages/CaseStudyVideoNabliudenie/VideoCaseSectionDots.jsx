import { useEffect, useState } from 'react';

const SECTION_CANDIDATES = [
  { id: 'home', label: 'Hero' },
  { id: 'brief', label: 'Brief' },
  { id: 'process', label: 'Process' },
  { id: 'how-solved-1', label: 'How solved 1' },
  { id: 'how-solved-2', label: 'How solved 2' },
  { id: 'how-solved-3', label: 'How solved 3' },
  { id: 'how-solved-4', label: 'How solved 4' },
  { id: 'how-solved-5', label: 'How solved 5' },
  { id: 'how-solved-6', label: 'How solved 6' },
  { id: 'visual-language', label: 'Visual language' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'outcomes', label: 'Outcomes' },
  { id: 'works', label: 'Works' },
  { id: 'more-works', label: 'More works' },
  { id: 'contact', label: 'Contact' }
];

const VideoCaseSectionDots = () => {
  const resolveSections = () =>
    SECTION_CANDIDATES.filter(section => document.getElementById(section.id));

  const [sections, setSections] = useState(() => resolveSections());
  const [activeSection, setActiveSection] = useState(() => (sections[0]?.id ?? 'home'));

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
        let bestId = sections[0]?.id ?? 'home';
        let bestDistance = Number.POSITIVE_INFINITY;

        sections.forEach(section => {
          const element = document.getElementById(section.id);
          if (!element) {
            return;
          }
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementCenter = elementTop + rect.height / 2;
          const distance = Math.abs(elementCenter - viewportCenter);

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
    // Keeps target heading visible under sticky nav.
    const NAV_OFFSET = 96;
    const top = element.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
  };

  return (
    <nav className="section-dots" aria-label="Page sections">
      <ul>
        {sections.map(section => {
          const active = section.id === activeSection;
          return (
            <li key={section.id}>
              <button
                type="button"
                className={active ? 'active' : ''}
                aria-label={`Go to ${section.label}`}
                aria-current={active ? 'true' : undefined}
                onClick={() => scrollToSection(section.id)}
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

export default VideoCaseSectionDots;
