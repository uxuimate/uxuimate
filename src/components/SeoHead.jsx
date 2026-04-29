import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'UX UI MATE';
const SITE_URL = 'https://uxuimate.com';
const DEFAULT_IMAGE = '/favicon.ico';

const toCanonical = (path = '/') => {
  if (!path.startsWith('/')) {
    return `${SITE_URL}/${path}`;
  }
  return `${SITE_URL}${path}`;
};

const SeoHead = ({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  keywords = [],
  noindex = false,
  jsonLd
}) => {
  const canonical = toCanonical(path);
  const resolvedTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const keywordsContent = Array.isArray(keywords) ? keywords.join(', ') : keywords;

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <link rel="canonical" href={canonical} />
      <meta name="description" content={description} />
      {keywordsContent ? <meta name="keywords" content={keywordsContent} /> : null}
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large'} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={toCanonical(image)} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={toCanonical(image)} />

      {jsonLd ? <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> : null}
    </Helmet>
  );
};

export default SeoHead;
