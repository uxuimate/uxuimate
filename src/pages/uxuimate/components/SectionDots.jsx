import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    let rafId = 0;

    const updateActiveSection = () => {
      if (rafId) {
        return;
      }
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const scrollMarker = window.scrollY + window.innerHeight * 0.62;
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

  const scrollToSection = id => {
    navigate({ hash: `#${id}` });
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
