import { Helmet } from 'react-helmet-async';
import { mergeKeywords, SITE_CORE_KEYWORDS, SITE_NAME, SITE_TWITTER_SITE, SITE_URL } from '@/constants/siteSeo';

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
  /** When true, merges {@link SITE_CORE_KEYWORDS} with page keywords (deduped). */
  mergeCoreKeywords = true,
  noindex = false,
  jsonLd
}) => {
  const canonical = toCanonical(path);
  const resolvedTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const mergedKeywordList = mergeCoreKeywords ? mergeKeywords(SITE_CORE_KEYWORDS, keywords) : mergeKeywords(keywords);
  const keywordsContent = mergedKeywordList.length ? mergedKeywordList.join(', ') : '';

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <link rel="canonical" href={canonical} />
      <meta name="description" content={description} />
      {keywordsContent ? <meta name="keywords" content={keywordsContent} /> : null}
      <meta name="author" content={SITE_NAME} />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large'} />

      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={toCanonical(image)} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE_TWITTER_SITE} />
      <meta name="twitter:creator" content={SITE_TWITTER_SITE} />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={toCanonical(image)} />

      {jsonLd ? <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> : null}
    </Helmet>
  );
};

export default SeoHead;
