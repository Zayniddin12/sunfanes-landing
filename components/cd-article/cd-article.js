// Component: cd-article — fills the detail template from the article picked by ?id=N
(function () {
  // Dates are placeholders (newest first), body copy beyond the lead mirrors the Figma template text.
  var ARTICLES = [
  {
    "id": 1,
    "title": "What Is Ōmisoka (大晦日)? Meaning, Traditions, and How Japanese Celebrate New Year’s Eve",
    "date": "2026.06.18",
    "image": "assets/images/cc-1.jpg",
    "excerpt": "Ōmisoka, or New Year’s Eve in Japan, falls on December 31st and marks one of the most spiritually significant days in the Japanese calendar.",
    "lead": [
      "Ōmisoka, or New Year’s Eve in Japan, falls on December 31st and marks one of the most spiritually significant days in the Japanese calendar."
    ]
  },
  {
    "id": 2,
    "title": "冬至 (Tōji) – Winter Solstice in Japan: Embracing the Longest Night",
    "date": "2026.06.11",
    "image": "assets/images/cc-2.jpg",
    "excerpt": "A Celestial Shift Signifying Light, Renewal, and the Return of Balance Tōji, known as the Winter Solstice in Japan, is more than just an astronomical event—it’s a symbolic and spiritual ...",
    "lead": [
      "A Celestial Shift Signifying Light, Renewal, and the Return of Balance",
      "Tōji, known as the Winter Solstice in Japan, is more than just an astronomical event—it’s a symbolic and spiritual"
    ]
  },
  {
    "id": 3,
    "title": "大雪 (Taisetsu) – Heavy Snow: Japan’s Deep Winter Begins",
    "date": "2026.06.04",
    "image": "assets/images/cc-3.jpg",
    "excerpt": "Taisetsu is part of the 24 solar terms (二十四節気 / Nijūshi Sekki) used in the traditional East Asian lunisolar calendar. It comes after Shōsetsu (小雪 – Light Snow) and precedes Tōji (冬至 – Winter...",
    "lead": [
      "Taisetsu is part of the 24 solar terms (二十四節気 / Nijūshi Sekki) used in the traditional East Asian lunisolar calendar. It comes after Shōsetsu (小雪 – Light Snow) and precedes Tōji (冬至 – Winter"
    ]
  },
  {
    "id": 4,
    "title": "Shichi-Go-San (七五三) – Japan’s Traditional Rite of Passage for Children",
    "date": "2026.05.28",
    "image": "assets/images/cc-4.jpg",
    "excerpt": "Shichi-Go-San is not a national holiday, but it’s widely observed across Japan. Rooted in Shinto tradition, it celebrates important milestones in a child’s life ...",
    "lead": [
      "Shichi-Go-San is not a national holiday, but it’s widely observed across Japan. Rooted in Shinto tradition, it celebrates important milestones in a child’s life"
    ]
  },
  {
    "id": 5,
    "title": "心を静かに整Culture day in Japan(文化の日) – Celebrating Japanese Culture and Peaceえる、はじめての書道体験",
    "date": "2026.05.21",
    "image": "assets/images/cc-5.jpg",
    "excerpt": "Culture day, or Culture Day Japan, was established to promote the love of freedom, peace, and culture. It originated in 1948 to commemorate ...",
    "lead": [
      "Culture day, or Culture Day Japan, was established to promote the love of freedom, peace, and culture. It originated in 1948 to commemorate"
    ]
  },
  {
    "id": 6,
    "title": "Halloween in Japan: Costumes, Celebrations, and How It Differs from the West",
    "date": "2026.05.14",
    "image": "assets/images/cc-6.jpg",
    "excerpt": "Halloween wasn’t always widely celebrated in Japan. In fact, until the early 2000s, the holiday was relatively unknown to most people",
    "lead": [
      "Halloween wasn’t always widely celebrated in Japan. In fact, until the early 2000s, the holiday was relatively unknown to most people"
    ]
  },
  {
    "id": 7,
    "title": "Shūbun no Hi: Japan’s Autumnal Equinox Day of Balance, Nature, and Ancestral Remembrance",
    "date": "2026.05.07",
    "image": "assets/images/cc-7.jpg",
    "excerpt": "Every year around September 22 or 23, Japan celebrates Autumnal Equinox Day, known in Japanese as 秋分の日 (Shūbun no Hi). It marks the precise moment ..",
    "lead": [
      "Every year around September 22 or 23, Japan celebrates Autumnal Equinox Day, known in Japanese as 秋分の日 (Shūbun no Hi). It marks the precise moment"
    ]
  },
  {
    "id": 8,
    "title": "Chōyō no Sekku: Discover Japan’s Chrysanthemum Festival and Its Timeless Traditions",
    "date": "2026.04.30",
    "image": "assets/images/cc-8.jpg",
    "excerpt": "If you're lucky enough to be in Japan in early autumn, you might stumble upon something quietly magical — Chōyō no Sekku, or the Chrysanthemum Festival.",
    "lead": [
      "If you're lucky enough to be in Japan in early autumn, you might stumble upon something quietly magical — Chōyō no Sekku, or the Chrysanthemum Festival."
    ]
  },
  {
    "id": 9,
    "title": "End of War Memorial Day in Japan: Meaning of August 15 and How It Is Remembered",
    "date": "2026.04.23",
    "image": "assets/images/cc-9.jpg",
    "excerpt": "August 15 is the key date for End of War Memorial Day, and while events happen across Japan, Tokyo is the center of national observance.",
    "lead": [
      "August 15 is the key date for End of War Memorial Day, and while events happen across Japan, Tokyo is the center of national observance."
    ]
  },
  {
    "id": 10,
    "title": "Risshū in Japan: The Beginning of Autumn and Seasonal Traditions",
    "date": "2026.04.16",
    "image": "assets/images/cc-10.jpg",
    "excerpt": "Risshū (立秋) marks the traditional beginning of autumn in the Japanese seasonal calendar. Falling around August 7th or 8th each year, it is part",
    "lead": [
      "Risshū (立秋) marks the traditional beginning of autumn in the Japanese seasonal calendar. Falling around August 7th or 8th each year, it is part"
    ]
  },
  {
    "id": 11,
    "title": "Risshū in Japan: The Beginning of Autumn and Seasonal Traditions",
    "date": "2026.04.09",
    "image": "assets/images/cc-11.jpg",
    "excerpt": "Risshū (立秋) marks the traditional beginning of autumn in the Japanese seasonal calendar. Falling around August 7th or 8th each year, it is part",
    "lead": [
      "Risshū (立秋) marks the traditional beginning of autumn in the Japanese seasonal calendar. Falling around August 7th or 8th each year, it is part"
    ]
  },
  {
    "id": 12,
    "title": "Risshū in Japan: The Beginning of Autumn and Seasonal Traditions",
    "date": "2026.04.02",
    "image": "assets/images/cc-12.jpg",
    "excerpt": "Risshū (立秋) marks the traditional beginning of autumn in the Japanese seasonal calendar. Falling around August 7th or 8th each year, it is part",
    "lead": [
      "Risshū (立秋) marks the traditional beginning of autumn in the Japanese seasonal calendar. Falling around August 7th or 8th each year, it is part"
    ]
  }
];

  var params = new URLSearchParams(window.location.search);
  var id = parseInt(params.get('id'), 10);
  var index = ARTICLES.findIndex(function (a) { return a.id === id; });
  if (index < 0) index = 0;
  var article = ARTICLES[index];

  function $(sel) { return document.querySelector(sel); }
  function link(a) { return 'culture-column-detail.html?id=' + a.id; }

  document.title = article.title + ' — SHINKA';

  var title = $('[data-cd-title]');
  if (title) title.textContent = article.title;

  var crumb = $('[data-cd-crumb]');
  if (crumb) {
    var short = article.title.length > 22 ? article.title.slice(0, 22) + '....' : article.title;
    crumb.textContent = short;
    crumb.title = article.title;
  }

  var date = $('[data-cd-date]');
  if (date) date.textContent = article.date;

  var hero = $('[data-cd-hero]');
  if (hero) {
    hero.src = article.image;
    hero.alt = article.title;
  }

  // Lead: the card excerpt becomes the first paragraph(s) of the article body.
  var lead = $('[data-cd-lead]');
  if (lead) {
    lead.textContent = article.lead[0];
    for (var i = article.lead.length - 1; i > 0; i--) {
      var extra = document.createElement('p');
      extra.textContent = article.lead[i];
      lead.after(extra);
    }
  }

  // Previous / Next
  function setNav(el, target) {
    if (!el) return;
    if (target) {
      el.href = link(target);
    } else {
      el.removeAttribute('href');
      el.setAttribute('aria-disabled', 'true');
    }
  }
  setNav($('[data-cd-prev]'), ARTICLES[index - 1]);
  setNav($('[data-cd-next]'), ARTICLES[index + 1]);

  // Related: the next two articles, wrapping around the list
  var related = $('[data-cd-related]');
  if (related) {
    function esc(s) {
      return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
    related.innerHTML = [1, 2].map(function (n) {
      var a = ARTICLES[(index + n) % ARTICLES.length];
      return '<article class="post-card">' +
        '<div class="post-card__media"><img src="' + a.image + '" alt="" width="640" height="183" loading="lazy"></div>' +
        '<div class="post-card__body">' +
          '<div class="post-card__tags"><span class="post-card__tag">news</span><span class="post-card__tag">news</span><span class="post-card__tag">news</span></div>' +
          '<h3 class="post-card__title"><a href="' + link(a) + '">' + esc(a.title) + '</a></h3>' +
          '<p class="post-card__text">' + esc(a.excerpt) + '</p>' +
        '</div></article>';
    }).join('');
  }
})();
