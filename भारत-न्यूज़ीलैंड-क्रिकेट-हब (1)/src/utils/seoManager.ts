export interface SEOConfig {
  title: string;
  description: string;
  canonicalPath: string;
  schemaType: 'WebSite' | 'NewsArticle' | 'SportsEvent' | 'CollectionPage';
  schemaData?: Record<string, unknown>;
}

export function updatePageSEO(config: SEOConfig): void {
  if (typeof document === 'undefined') return;

  document.title = config.title;

  const setMeta = (selector: string, content: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.setAttribute('content', content);
    }
  };

  setMeta('meta[name="description"]', config.description);
  setMeta('meta[property="og:title"]', config.title);
  setMeta('meta[property="og:description"]', config.description);
  setMeta('meta[name="twitter:title"]', config.title);
  setMeta('meta[name="twitter:description"]', config.description);

  const canonicalEl = document.querySelector('link[rel="canonical"]');
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://hinditechguide.in';
  const fullUrl = `${origin}${config.canonicalPath.startsWith('/') ? config.canonicalPath : `/${config.canonicalPath}`}`;
  if (canonicalEl) {
    canonicalEl.setAttribute('href', fullUrl);
  }

  const schemaScript = document.getElementById('dynamic-schema-ld');
  if (schemaScript) {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': config.schemaType,
      name: config.title,
      headline: config.title,
      description: config.description,
      url: fullUrl,
      inLanguage: 'hi-IN',
      publisher: {
        '@type': 'Organization',
        name: 'HindiTech Guide',
        url: origin,
      },
      ...(config.schemaData || {}),
    };
    schemaScript.textContent = JSON.stringify(baseSchema, null, 2);
  }
}
