import { useEffect, useState } from 'react';
import { lenisScrollToElementId } from '@/utils/lenisScroll';

const sections = [
  { id: 'about-hero', label: 'Hero' },
  { id: 'about-intro', label: 'Belief' },
  { id: 'about-why-studio', label: 'Why us' },
  { id: 'about-principles', label: 'How we work' },
  { id: 'about-founder', label: 'Founder' },
  { id: 'contact', label: 'Contact' },
  { id: 'page-footer', label: 'Footer' }
];

const AboutSectionDots = () => {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollMarker = window.scrollY + window.innerHeight * 0.5;
      const currentSection = sections.reduce((activeId, section) => {
        const element = document.getElementById(section.id);

        if (!element) {
          return activeId;
        }

        const sectionTop = element.getBoundingClientRect().top + window.scrollY;

        return sectionTop <= scrollMarker ? section.id : activeId;
      }, sections[0].id);

      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

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
