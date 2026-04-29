import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import FooterAtmosphere from './FooterAtmosphere';

const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms-and-conditions' },
  { label: 'Cookie Policy', to: '/cookie-policy' }
];

const Footer = ({ accentTheme = 'default' }) => {
  return <section className="innovative-footer" id="page-footer">
      <FooterAtmosphere accentTheme={accentTheme} />
      <h2 className="d-none">hidden</h2>
      <Container>
        <Row className="innovative-footer__top align-items-start">
          <Col md={6}>
            <div className="innovative-footer__brand reveal-up">
              <h3>UX UI MATE</h3>
              <p>Crafted for premium digital experiences.</p>
            </div>
          </Col>
          <Col md={6} className="text-md-right">
            <div className="innovative-footer__studios reveal-up">
              <span>Our Studios</span>
              <p>Newcastle, UK <em>/</em> Sofia, Bulgaria</p>
            </div>
          </Col>
        </Row>
        <div className="innovative-footer__divider reveal-up" />
        <div className="innovative-footer__meta reveal-up">
          <p className="innovative-footer__copyright">© 2026 UX UI MATE. All rights reserved.</p>
          <nav className="innovative-footer__legal" aria-label="Legal links">
            {legalLinks.map(({ label, to }) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </section>;
};
export default Footer;