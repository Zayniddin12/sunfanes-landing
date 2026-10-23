// Assembles index.html, media-business.html, e-commerce.html, vacation-rental-management.html, culture-column.html, concept.html, virtual-human.html and vacation-rental.html from components/<name>/<name>.{html,css,js}.
// Usage: node build.js
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

// Order = page order. `shared` CSS is loaded before the components that use it.
const PAGES = {
  'index.html': [
    'header',
    'hero-slider',
    'concept',
    'virtual-human',
    'business',
    'culture-column',
    'travel-guide',
    'events',
    'accommodation',
    'news',
    'footer',
  ],
  'virtual-human.html': ['header', 'vh-banner', 'vh-about', 'vh-role', 'vh-story', 'vh-profile', 'footer'],
  'vacation-rental.html': ['header', 'biz-banner', 'biz-hero', 'biz-purpose', 'biz-initiatives', 'biz-cta', 'footer'],
  'media-business.html': ['header', 'media-banner', 'media-hero', 'media-purpose', 'media-initiatives', 'media-cta', 'footer'],
  'e-commerce.html': ['header', 'ec-banner', 'ec-hero', 'ec-purpose', 'ec-initiatives', 'ec-cta', 'footer'],
  'vacation-rental-management.html': ['header', 'vrm-banner', 'vrm-hero', 'vrm-purpose', 'vrm-initiatives', 'vrm-cta', 'footer'],
  'culture-column.html': ['header', 'cc-banner', 'cc-filter', 'cc-list', 'footer'],
  'culture-column-detail.html': ['header', 'cd-banner', 'cd-article', 'footer'],
  'travel-guide.html': ['header', 'tg-banner', 'tg-intro', 'tg-list', 'footer'],
  'travel-guide-detail.html': ['header', 'tgd-banner', 'tgd-article', 'footer'],
  'events.html': ['header', 'ev-banner', 'ev-filter', 'ev-list', 'footer'],
  'news-list.html': ['header', 'nl-banner', 'nl-list', 'footer'],
  'company-information.html': ['header', 'co-banner', 'co-info', 'footer'],
  'news-detail.html': ['header', 'nd-banner', 'nd-article', 'footer'],
  'event-detail.html': ['header', 'evd-banner', 'evd-article', 'footer'],
  'concept.html': ['header', 'page-banner', 'concept-intro', 'concept-story', 'promise', 'footer'],
};
const TITLES = {
  'index.html': 'SHINKA — Stay closer to Japan',
  'media-business.html': 'Media Business — SHINKA',
  'e-commerce.html': 'E-Commerce Business — SHINKA',
  'vacation-rental-management.html': 'Vacation Rental Management — SHINKA',
  'culture-column.html': 'Cultural Columns — SHINKA',
  'culture-column-detail.html': 'Cultural Column — SHINKA',
  'travel-guide.html': 'Travel Information — SHINKA',
  'travel-guide-detail.html': 'Travel Information — SHINKA',
  'events.html': 'Event Information — SHINKA',
  'event-detail.html': 'Event Information — SHINKA',
  'news-list.html': 'News — SHINKA',
  'news-detail.html': 'News — SHINKA',
  'company-information.html': 'Company Information — SHINKA',
  'concept.html': 'Concept — SHINKA',
  'virtual-human.html': 'Virtual Human — SHINKA',
  'vacation-rental.html': 'Vacation Rental & Accommodation — SHINKA',
};
// Components that reuse another component's stylesheet instead of having their own.
const CSS_FROM = {
  'vh-banner': 'page-banner',
  'media-banner': 'biz-banner',
  'media-hero': 'biz-hero',
  'media-purpose': 'biz-purpose',
  'media-initiatives': 'biz-initiatives',
  'ec-banner': 'biz-banner',
  'ec-hero': 'biz-hero',
  'ec-purpose': 'biz-purpose',
  'ec-initiatives': 'biz-initiatives',
  'ec-cta': 'biz-cta',
  'vrm-banner': 'biz-banner',
  'vrm-hero': 'biz-hero',
  'vrm-purpose': 'biz-purpose',
  'vrm-initiatives': 'biz-initiatives',
  'vrm-cta': 'biz-cta',
  'cc-banner': 'biz-banner',
  'cd-banner': 'biz-banner',
  'tg-banner': 'biz-banner',
  'tgd-banner': 'biz-banner',
  'ev-banner': 'biz-banner',
  'ev-list': ['cc-list', 'ev-list'],
  'tgd-article': ['cd-article', 'tgd-article'],
  'evd-banner': 'biz-banner',
  'nl-banner': 'biz-banner',
  'nd-banner': 'biz-banner',
  'co-banner': ['page-banner', 'co-banner'],
  'nd-article': ['cd-article', 'tgd-article', 'nd-article'],
  'nl-list': ['cc-list', 'news', 'nl-list'],
  'evd-article': ['cd-article', 'tgd-article', 'evd-article'],
};
const SHARED_CSS = ['components/post-card/post-card.css'];

const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8').trimEnd();
const exists = (file) => fs.existsSync(path.join(ROOT, file));

for (const [page, components] of Object.entries(PAGES)) {
  const styles = ['assets/css/base.css', ...SHARED_CSS];
  const scripts = [];
  const sections = [];

  for (const name of components) {
    const base = `components/${name}/${name}`;
    for (const css of [].concat(CSS_FROM[name] || name)) styles.push(`components/${css}/${css}.css`);
    if (exists(`${base}.js`)) scripts.push(`${base}.js`);
    let markup = read(`${base}.html`);
    // Header/footer are shared: on inner pages their in-page anchors point back to the home page.
    if (page !== 'index.html' && (name === 'header' || name === 'footer')) {
      markup = markup.replace(/href="#(?=\S)/g, 'href="index.html#');
    }
    sections.push(markup);
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${TITLES[page]}</title>
  <meta name="description" content="Thoughtful places to stay that bring travelers closer to local atmosphere, everyday culture and Japanese hospitality.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Infant:wght@700&family=Lexend:wght@500&family=Noto+Serif:wght@700&family=Space+Grotesk:wght@700&family=Inter:wght@700&family=Noto+Sans+JP:wght@300;400;500;700&family=Poppins:wght@500;700&display=swap" rel="stylesheet">
${styles.map((href) => `  <link rel="stylesheet" href="${href}">`).join('\n')}
</head>
<body>

${sections.join('\n\n')}

${scripts.map((src) => `<script src="${src}"></script>`).join('\n')}
</body>
</html>
`;

  fs.writeFileSync(path.join(ROOT, page), html);
  console.log(`${page} built: ${components.length} components, ${styles.length} stylesheets, ${scripts.length} scripts`);
}
console.log('Happy developing ✨')
