import { useEffect, useState } from 'react';

const sections = [
  { id: 'home', label: 'Hero' },
  { id: 'brief', label: 'Brief' },
  { id: 'process', label: 'Process' },
  { id: 'how-solved-1', label: 'How solved 1' },
  { id: 'how-solved-2', label: 'How solved 2' },
  { id: 'how-solved-3', label: 'How solved 3' },
  { id: 'outcomes', label: 'Outcomes' },
  { id: 'works', label: 'Works' }
];

const VideoCaseSectionDots = () => {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    let rafId = 0;

    const updateActiveSection = () => {
      if (rafId) {
        return;
      }

      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const marker = window.scrollY + window.innerHeight * 0.62;
        const current = sections.reduce((activeId, section) => {
          const element = document.getElementById(section.id);
          if (!element) {
            return activeId;
          }
          const top = element.getBoundingClientRect().top + window.scrollY;
          return top <= marker ? section.id : activeId;
        }, sections[0].id);
        setActiveSection(prev => (prev === current ? prev : current));
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
                onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
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
