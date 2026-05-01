import { useEffect, useState } from 'react';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'works', label: 'Works' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' }
];

const SectionDots = () => {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    let rafId = 0;

    const updateActiveSection = () => {
      if (rafId) {
        return;
      }
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const viewportCenter = window.scrollY + window.innerHeight / 2;
        let bestId = sections[0].id;
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
  }, []);

  const scrollToSection = id => {
    const element = document.getElementById(id);
    if (!element) {
      return;
    }
    // Keep section heading clear of sticky nav.
    const NAV_OFFSET = 96;
    const top = element.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
  };

  return <nav className="section-dots" aria-label="Page sections">
      <ul>
        {sections.map(section => {
        const isActive = section.id === activeSection;

        return <li key={section.id}>
            <button type="button" className={isActive ? 'active' : ''} aria-label={`Go to ${section.label}`} aria-current={isActive ? 'true' : undefined} onClick={() => scrollToSection(section.id)}>
              <span />
            </button>
          </li>;
      })}
      </ul>
    </nav>;
};

export default SectionDots;
