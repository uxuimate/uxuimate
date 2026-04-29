import { useEffect, useState } from 'react';
import { lenisScrollToTop } from '@/utils/lenisScroll';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = event => {
    event.preventDefault();
    lenisScrollToTop();
  };

  return <a className="scroll-top-arrow" href="#" onClick={scrollToTop} style={{
    display: isVisible ? 'block' : 'none'
  }}>
      <i className="fas fa-angle-up" />
    </a>;
};
export default BackToTop;