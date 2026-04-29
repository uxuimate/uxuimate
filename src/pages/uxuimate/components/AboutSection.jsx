import aboutImage from '../assets/img/about-studio-bg.jpg';
import AboutAtmosphere from './AboutAtmosphere';

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
  return <section className="about-studio-section model-agency-parallax-bg" id={id} style={{
    backgroundImage: `url("${backgroundImage}")`,
    backgroundPosition
  }}>
      {showAtmosphere ? <AboutAtmosphere /> : null}
      <div className="about-studio__container">
        <div className="about-studio__content reveal-right">
          <span className="about-studio__eyebrow">{eyebrow}</span>
          <h2 className="about-heading">{title}</h2>
          {paragraphs.map(text => <p key={text}>{text}</p>)}
          {linkHref ? <a href={linkHref} className={linkClassName}>{linkText}</a> : null}
        </div>
      </div>
    </section>;
};

export default AboutSection;
