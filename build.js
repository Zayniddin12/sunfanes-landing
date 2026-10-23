// Assembles every page from components/<name>/<name>.{html,css,js}.
// A page is a list of components; use [name, props] to fill a component's {{placeholders}}.
// Usage: node build.js
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const business = require('./data/business.json');

const up = (href, label) => `<a href="${href}">${label}</a>`;
const here = (label) => `<span>${label}</span>`;
const banner = (crumb, title, lead, cls = '') => ['banner', { crumb, title, lead, cls }];
const detailBanner = (parent, title, lead) => banner(`${parent} / ${here(title)}`, title, lead, ' tgd-banner');

// Business pages share the same four sections, only the data differs.
const businessPage = (key, bannerArgs, cta) => [
  'header',
  banner(...bannerArgs),
  ['hero', business[key].hero],
  ['purpose', business[key].purpose],
  ['initiatives', business[key].initiatives],
  cta,
  'footer',
];

const ARRIVAL_LEAD = '海外からの旅行者に寄り添う、実用的な旅の案内。';

// Order = page order.
const PAGES = {
  'index.html': ['header', 'hero-slider', 'concept', 'virtual-human', 'business', 'culture-column', 'travel-guide', 'events', 'accommodation', 'news', 'footer'],
  'concept.html': ['header', ['page-banner', { img: 'assets/images/concept-banner.png', width: 2172, height: 724, crumb: 'Concept', title: 'Concept' }], 'concept-intro', 'concept-story', 'promise', 'footer'],
  'virtual-human.html': ['header', ['page-banner', { cls: ' page-banner--bottom', img: 'assets/images/vh-banner.png', width: 1600, height: 1067, aria: ' aria-current="page"', crumb: 'Virtual Human', title: 'Virtual Human (VH) Introduction', lead: "Meet SHINKA's AI virtual human, working as a public relations representative. She connects SHINKA's social media, Japanese culture articles, on-site reporting, brand website, and accommodations." }], 'vh-about', 'vh-role', 'vh-story', 'vh-profile', 'footer'],
  'vacation-rental.html': businessPage('vacation',
    [here('Vacation Rental &amp; Accommodation'), 'Vacation Rental &amp; Accommodation', 'A private Japanese-modern retreat, where local heritage and deep relaxation come together.'],
    ['cta', { title: 'Book Your Stay', text: "Check availability and make reservations directly through each property's official website.", button: 'View Lodging' }]),
  'media-business.html': businessPage('media',
    [here('Media Business'), 'Media Business', 'Discovering Japan makes every journey deeper and more meaningful.'],
    'media-cta'),
  'e-commerce.html': businessPage('ec',
    [here('E-Commerce Business'), 'E-Commerce Business', 'Bring the spirit of your journey into everyday life.<br>Discover products shaped by Japanese aesthetics, craftsmanship, and innovation.'],
    ['cta', { title: 'Online Store &amp; Product Inquiries', cls: ' biz-cta__text--wide', text: 'Interested in our products, technical collaborations, or wholesale opportunities? Feel free to contact us for more information.', button: 'Visit Our Online Store' }]),
  'vacation-rental-management.html': businessPage('vrm',
    [here('Vacation Rental Management'), 'Vacation Rental Management', 'A future where SHINKA standards make every stay a confident choice.'],
    ['cta', { title: 'Vacation Rental Management Inquiries', cls: ' biz-cta__text--wide', text: 'Have questions about our plans, accommodation management, or potential partnerships? Feel free to contact us for more information or to discuss opportunities.', button: 'View Service Details' }]),
  'culture-column.html': ['header', banner(here('Cultural Columns'), 'Cultural Columns', 'Explore Japanese culture, local travel stories, and<br>practical insights to enrich your journey.'), 'cc-filter', 'cc-list', 'footer'],
  'culture-column-detail.html': ['header', 'cd-banner', 'cd-article', 'footer'],
  'travel-guide.html': ['header', banner(here('Travel Information'), 'Travel Information', 'Explore Japan with clear categories for<br>attractions, dining, and suggested routes.'), 'tg-intro', 'tg-list', 'footer'],
  'travel-guide-detail.html': ['header', detailBanner(up('travel-guide.html', 'Travel Information'), '大阪城エリアを巡る、はじめての散策', ARRIVAL_LEAD), 'tgd-article', 'footer'],
  'events.html': ['header', banner(here('Event Information'), 'Events', 'Discover seasonal events, local experiences, and<br>tips for exploring the area around your stay.'), 'ev-filter', 'ev-list', 'footer'],
  'event-detail.html': ['header', detailBanner(up('events.html', 'Event Information'), '川沿いで楽しむ、灯籠の夕べ', ARRIVAL_LEAD), 'evd-article', 'footer'],
  'news-list.html': ['header', banner(here('News'), 'News', 'Updates from Shinka about stays, guides, events, and visitor support.', ' nl-banner'), 'nl-list', 'footer'],
  'news-detail.html': ['header', detailBanner(up('news-list.html', 'News'), 'Shinka updates its English arrival guide for summer guests', 'A clearer arrival experience for international visitors.'), 'nd-article', 'footer'],
  'company-information.html': ['header', ['page-banner', { cls: ' co-banner', img: 'assets/images/company-banner.jpg', width: 1600, height: 1200, aria: ' aria-current="page"', crumb: 'Company Information', title: 'Company Overview &amp; Information', lead: 'Helping international guests<br>arrive more smoothly.' }], 'co-info', 'footer'],
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
  'cd-banner': 'banner',
  'ev-list': ['cc-list', 'ev-list'],
  'tgd-article': ['cd-article', 'tgd-article'],
  'nd-article': ['cd-article', 'tgd-article', 'nd-article'],
  'nl-list': ['cc-list', 'news', 'nl-list'],
  'evd-article': ['cd-article', 'tgd-article', 'evd-article'],
};
const SHARED_CSS = ['components/post-card/post-card.css'];

// Template: {{key}}, {{#if key}}…{{/if}}, {{#each key}}…{{/each}}; an array on its own line becomes <p> lines.
const render = (tpl, props) =>
  tpl
    .replace(/^\{\{#each (\w+)\}\}\n([\s\S]*?)\{\{\/each\}\}\n/gm, (_, key, body) => props[key].map((item) => render(body, item)).join(''))
    .replace(/^\{\{#if (\w+)\}\}\n([\s\S]*?)\{\{\/if\}\}\n/gm, (_, key, body) => (props[key] ? render(body, props) : ''))
    .replace(/^([ \t]*)\{\{(\w+)\}\}$/gm, (m, indent, key) => (Array.isArray(props[key]) ? props[key].map((t) => `<p>${t}</p>`).join(`\n${indent}`).replace(/^/, indent) : m))
    .replace(/\{\{(\w+)\}\}/g, (_, key) => props[key] ?? '');

const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8').trimEnd();
const exists = (file) => fs.existsSync(path.join(ROOT, file));

for (const [page, components] of Object.entries(PAGES)) {
  const styles = ['assets/css/base.css', ...SHARED_CSS];
  const scripts = [];
  const sections = [];

  for (const component of components) {
    const [name, props] = [].concat(component);
    const base = `components/${name}/${name}`;
    for (const css of [].concat(CSS_FROM[name] || name)) styles.push(`components/${css}/${css}.css`);
    if (exists(`${base}.js`)) scripts.push(`${base}.js`);
    let markup = render(read(`${base}.html`), props || {});
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
