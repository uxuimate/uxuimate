import { Col, Container, Row } from 'react-bootstrap';
import contactSectionBg from '../assets/img/contact-section-bg.jpg';

const InnovativeContactSection = ({
  id = 'contact',
  backgroundImage = contactSectionBg
}) => {
  return (
    <section
      className="single-items innovative-contact-section center-block model-agency-parallax-bg"
      id={id}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <Container>
        <Row className="pb-5 innovative-contact__header">
          <Col xs={12} md={7}>
            <span className="innovative-contact__eyebrow">Contact Us</span>
            <h2>Let&apos;s Get In Touch</h2>
            <p>Tell us what you are building and we will come back with a clear next step.</p>
          </Col>
          <Col xs={12} md={5} className="innovative-contact__brand text-md-right pt-4 pt-md-0">
            <h3>UX UI MATE</h3>
            <p>Newcastle, UK / Sofia, Bulgaria</p>
          </Col>
        </Row>
        <form className="innovative-contact-form contact-form" id="contact-form-data">
          <Row className="pt-3">
            <Col xs={12}>
              <Col sm={12} className="px-0" id="result" />
            </Col>
            <Col md={4} className="innovative-contact-form__details">
              <div className="form-group">
                <input className="form-control" type="text" placeholder="Name" required id="first_name" name="firstName" />
              </div>
              <div className="form-group">
                <input className="form-control" type="tel" placeholder="Phone Number" id="phone" name="userPhone" />
              </div>
              <div className="form-group">
                <input className="form-control" type="email" placeholder="Email" required id="email" name="userEmail" />
              </div>
            </Col>
            <Col xs={12} md={6} className="offset-md-1 innovative-contact-form__message">
              <div className="form-group">
                <textarea className="form-control" placeholder="Type Your Message Here" id="message" name="userMessage" defaultValue="" />
              </div>
            </Col>
            <Col xs={12} className="px-md-0">
              <div className="innovative-contact__button pt-5 text-center text-lg-left">
                <button type="button" className="btn btn-transparent-white btn-rounded btn-large text-capitalize contact_btn">
                  Contact Now
                </button>
              </div>
            </Col>
          </Row>
        </form>
      </Container>
    </section>
  );
};

export default InnovativeContactSection;
