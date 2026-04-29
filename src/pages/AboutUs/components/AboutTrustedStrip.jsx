const TRUSTED_CLIENTS = [
  'VideoNabliudenie.bg',
  'Soft Play Solutions',
  'Er Clima',
  'Eco Herbalist',
  'Northshore Digital',
  'Bloom & Co. Studio',
  'Atlas Freight Group',
  'Medilink Partners',
  'Studio Verge',
  'Kettlewell Interiors',
  'Harborlight Finance',
  'Urban Field Architects',
  'Silverline Hospitality',
  'Cairn Analytics',
  'Velvet Row Retail'
];

const AboutTrustedStrip = () => (
  <aside className="about-trusted">
    <p className="about-trusted__sr-only">
      Trusted by {TRUSTED_CLIENTS.join(', ')}.
    </p>
    <p className="about-trusted__heading">Trusted by</p>
    <div className="about-trusted__marquee" aria-hidden="true">
      <div className="about-trusted__marquee-track">
        <div className="about-trusted__group">
          {TRUSTED_CLIENTS.map(name => (
            <span key={name} className="about-trusted__client">
              {name}
            </span>
          ))}
        </div>
        <div className="about-trusted__group about-trusted__group--duplicate">
          {TRUSTED_CLIENTS.map(name => (
            <span key={`dup-${name}`} className="about-trusted__client">
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  </aside>
);

export default AboutTrustedStrip;
