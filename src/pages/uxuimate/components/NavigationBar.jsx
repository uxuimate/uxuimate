import { useEffect, useMemo, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { withBasePath } from '@/utils';

/** Matches Footer / Services page themes for nav hover + active pill colour */
const ACCENT_BY_THEME = {
  default: '#e8195a',
  development: '#A855F7',
  branding: '#92680A',
  mobile: '#3B82F6'
};

const SCROLL_SECTION_IDS = ['home', 'works', 'about', 'contact'];

const socialLinks = [
  {
    label: 'Behance',
    href: 'https://www.behance.net/uxuimate',
    icon: 'fab fa-behance',
    hoverClass: 'behance-text-hvr'
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/uxuimate',
    icon: 'fab fa-facebook-f',
    hoverClass: 'facebook-text-hvr'
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/uxuimate/',
    icon: 'fab fa-instagram',
    hoverClass: 'instagram-text-hvr'
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/uxalexander/',
    icon: 'fab fa-linkedin-in',
    hoverClass: 'linkedin-text-hvr'
  },
  {
    label: 'Medium',
    href: 'https://medium.com/@uxuimate',
    icon: 'fab fa-medium-m',
    hoverClass: 'medium-text-hvr'
  }
];

const HOME_PATH = '/innovative-parallax';

const navLinks = [
  {
    label: 'Home',
    to: `${HOME_PATH}#home`,
    match: { kind: 'section', section: 'home' }
  },
  {
    label: 'Services',
    to: '/services',
    match: { kind: 'path', path: '/services' }
  },
  {
    label: 'Works',
    to: '/works',
    match: { kind: 'path', path: '/works' }
  },
  {
    label: 'About',
    to: '/about-us',
    match: { kind: 'path', path: '/about-us' }
  },
  {
    label: 'Contact',
    to: '/contact',
    match: { kind: 'path', path: '/contact' }
  }
];

const navLinkStyle = {
  fontFamily: "'Deltha', sans-serif",
  fontSize: '13px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase'
};

const normalizePath = p => {
  if (!p || p === '/') {
    return p || '/';
  }
  return p.replace(/\/$/, '');
};

const isNavLinkActive = (link, pathnameNorm, homeNorm, scrollSection) => {
  const { match } = link;

  if (match.kind === 'path') {
    return pathnameNorm === normalizePath(match.path);
  }

  if (pathnameNorm !== homeNorm) {
    return false;
  }

  return scrollSection === match.section;
};

const NavigationBar = ({ accentTheme = 'default' }) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollSection, setScrollSection] = useState(() => {
    if (typeof window === 'undefined') {
      return 'home';
    }

    const h = window.location.hash.replace(/^#/, '');
    return SCROLL_SECTION_IDS.includes(h) ? h : 'home';
  });
  const ignoreScrollUntilRef = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

  const accentHex = ACCENT_BY_THEME[accentTheme] ?? ACCENT_BY_THEME.default;

  const pathnameNorm = useMemo(() => normalizePath(location.pathname), [location.pathname]);
  const homeNorm = useMemo(() => normalizePath(HOME_PATH), []);

  useEffect(() => {
    ignoreScrollUntilRef.current = Date.now() + 600;
  }, []);

  useEffect(() => {
    if (pathnameNorm !== homeNorm) {
      return undefined;
    }

    const raw = (location.hash || '').replace(/^#/, '');

    if (SCROLL_SECTION_IDS.includes(raw)) {
      setScrollSection(raw);
      ignoreScrollUntilRef.current = Date.now() + 520;
    }

    return undefined;
  }, [location.hash, pathnameNorm, homeNorm]);

  useEffect(() => {
    if (pathnameNorm !== homeNorm) {
      return undefined;
    }

    const updateScrollSection = () => {
      if (Date.now() < ignoreScrollUntilRef.current) {
        return;
      }

      const scrollMarker = window.scrollY + window.innerHeight * 0.35;
      let current = 'home';

      for (const id of SCROLL_SECTION_IDS) {
        const element = document.getElementById(id);

        if (!element) {
          continue;
        }

        const sectionTop = element.getBoundingClientRect().top + window.scrollY;

        if (sectionTop <= scrollMarker) {
          current = id;
        }
      }

      setScrollSection(current);
    };

    updateScrollSection();
    window.addEventListener('scroll', updateScrollSection, { passive: true });
    window.addEventListener('resize', updateScrollSection);

    return () => {
      window.removeEventListener('scroll', updateScrollSection);
      window.removeEventListener('resize', updateScrollSection);
    };
  }, [pathnameNorm, homeNorm]);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 220);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleInternalLink = (event, to) => {
    const parts = to.split('#');
    const pathPart = parts[0] || '';
    const hash = parts[1];
    const here = normalizePath(location.pathname);
    const there = pathPart ? normalizePath(pathPart) : null;

    if (pathPart && there !== here) {
      return;
    }

    if (hash) {
      event.preventDefault();

      if (SCROLL_SECTION_IDS.includes(hash)) {
        setScrollSection(hash);
        ignoreScrollUntilRef.current = Date.now() + 520;
      }

      navigate({ hash: `#${hash}` });
    }

    setIsMenuOpen(false);
  };

  const closeMenu = event => {
    event.preventDefault();
    setIsMenuOpen(false);
  };

  const headerStyle = {
    '--nav-accent': accentHex
  };

  const navStyle = {
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.18) 70%, rgba(0, 0, 0, 0) 100%)',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    border: 0
  };

  return <header className={'header-appear' + (hasScrolled ? ' is-scrolled' : '')} style={headerStyle}>
      <nav className="navbar navbar-top-default navbar-expand-lg navbar-simple nav-box-round" style={navStyle}>
        <Container>
          <Link to={HOME_PATH} title="Logo" className="logo scroll">
            <img src={withBasePath('/img/icons/logo-footer.png')} alt="UX UI MATE — home" className="uxui-nav-logo" />
          </Link>
          <div className="collapse navbar-collapse" id="megaone">
            <div className="navbar-nav ml-auto">
              {navLinks.map(link => {
                const active = isNavLinkActive(link, pathnameNorm, homeNorm, scrollSection);
                const dest = link.to;
                return <Link
                  key={link.label}
                  className={'nav-link scroll' + (active ? ' active' : '')}
                  to={dest}
                  onClick={event => handleInternalLink(event, dest)}
                  style={navLinkStyle}
                  aria-current={active ? (link.match.kind === 'path' ? 'page' : 'true') : undefined}
                >
                  {link.label}
                </Link>;
              })}
            </div>
          </div>
          <a href="#" className="d-inline-block sidemenu_btn" id="sidemenu_toggle" onClick={event => {
          event.preventDefault();
          setIsMenuOpen(true);
        }}>
            <span />
            <span />
            <span />
          </a>
        </Container>
      </nav>
      <div className={`side-menu ${isMenuOpen ? 'side-menu-active' : 'hidden'}`}>
        <div className="inner-wrapper">
          <span className="btn-close" id="btn_sideNavClose" onClick={closeMenu}><i /><i /></span>
          <nav className="side-nav w-100">
            <ul className="navbar-nav">
              {navLinks.map(link => {
                const active = isNavLinkActive(link, pathnameNorm, homeNorm, scrollSection);
                const dest = link.to;
                return <li className="nav-item" key={link.label}>
                  <Link
                    className={'nav-link scroll' + (active ? ' active' : '')}
                    to={dest}
                    onClick={event => handleInternalLink(event, dest)}
                    style={navLinkStyle}
                    aria-current={active ? (link.match.kind === 'path' ? 'page' : 'true') : undefined}
                  >
                    {link.label}
                  </Link>
                </li>;
              })}
            </ul>
          </nav>
          <div className="side-footer text-white w-100">
            <ul className="social-icons-simple">
              {socialLinks.map(({ label, href, icon, hoverClass }) => <li key={label}>
                  <a className={hoverClass} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                    <i className={icon} aria-hidden="true" />
                  </a>
                </li>)}
            </ul>
            <p className="text-white">© {new Date().getFullYear()} UX UI MATE. Premium UX/UI, branding, and web development.</p>
          </div>
        </div>
      </div>
      <a id="close_side_menu" href="#" onClick={closeMenu} style={{
      display: isMenuOpen ? 'block' : 'none'
    }} />
    </header>;
};
export default NavigationBar;