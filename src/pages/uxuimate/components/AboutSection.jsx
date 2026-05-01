import { lazy, Suspense, useEffect, useState } from 'react';
import aboutImage from '../assets/img/about-studio-bg.webp';
import { Link } from 'react-router-dom';
const AboutAtmosphere = lazy(() => import('./AboutAtmosphere'));

const defaultParagraphs = [
  "We're a small, focused digital studio operating between Newcastle, UK and Sofia, Bulgaria.",
  "We don't take on 50 clients a year. We take on the right ones - businesses that want design that actually moves the needle, not just something that looks good in a screenshot.",
  'Every project is led by Alexander personally. No account managers, no handoffs, no surprises.'
];

const AboutSection = ({
  id = 'about',
  backgroundImage = aboutImage,
  backgroundPosition = 'center top',
  eyebrow = 'Who We Are',
  title = 'ABOUT THE STUDIO',
  paragraphs = defaultParagraphs,
  linkHref = '/about-us',
  linkText = 'Meet the founder →',
  linkClassName = 'btn btn-white btn-rounded btn-large',
  showAtmosphere = true
}) => {
  const [showAtmosphereLayer, setShowAtmosphereLayer] = useState(false);
  const [allowAtmosphere, setAllowAtmosphere] = useState(false);
  const isExternal = typeof linkHref === 'string' && /^https?:\/\//i.test(linkHref);
  const isSpaPath = typeof linkHref === 'string' && linkHref.startsWith('/') && !linkHref.startsWith('//') && !isExternal;

  useEffect(() => {
    if (!showAtmosphere) {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(min-width: 992px) and (hover: hover) and (pointer: fine)');
    const update = () => {
      setAllowAtmosphere(mediaQuery.matches);
    };
    update();
    mediaQuery.addEventListener('change', update);
    return () => {
      mediaQuery.removeEventListener('change', update);
    };
  }, [showAtmosphere]);

  useEffect(() => {
    if (!showAtmosphere || !allowAtmosphere) {
      return undefined;
    }

    let cancelled = false;
    const run = () => {
      if (!cancelled) {
        setShowAtmosphereLayer(true);
      }
    };

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(run, { timeout: 1500 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const timeoutId = window.setTimeout(run, 550);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [showAtmosphere, allowAtmosphere]);

  return <section className="about-studio-section model-agency-parallax-bg" id={id} style={{
    backgroundImage: `url("${backgroundImage}")`,
    backgroundPosition
  }}>
      {showAtmosphere && allowAtmosphere && showAtmosphereLayer ? <Suspense fallback={null}>
          <AboutAtmosphere />
        </Suspense> : null}
      <div className="about-studio__container">
        <div className="about-studio__content reveal-right">
          <span className="about-studio__eyebrow">{eyebrow}</span>
          <h2 className="about-heading">{title}</h2>
          {paragraphs.map(text => <p key={text}>{text}</p>)}
          {linkHref ? isSpaPath ? <Link to={linkHref} className={linkClassName}>{linkText}</Link> : <a href={linkHref} className={linkClassName}>{linkText}</a> : null}
        </div>
      </div>
    </section>;
};

export default AboutSection;
