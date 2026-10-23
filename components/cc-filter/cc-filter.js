// Component: cc-filter — category pill toggle + keyword search over the cc-list cards
(function () {
  var pills = document.querySelectorAll('.cc-filter .cc-pill');
  var form = document.querySelector('[data-cc-search]');
  var cards = document.querySelectorAll('.cc-list .cc-card');
  var count = document.querySelector('[data-cc-count]');
  if (!form || !cards.length) return;

  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      pills.forEach(function (p) {
        var on = p === pill;
        p.classList.toggle('is-active', on);
        p.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    });
  });

  function applyFilter() {
    var q = form.q.value.trim().toLowerCase();
    var shown = 0;
    cards.forEach(function (card) {
      var match = !q || card.textContent.toLowerCase().indexOf(q) !== -1;
      card.hidden = !match;
      if (match) shown++;
    });
    if (count) count.textContent = shown;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    applyFilter();
  });
  form.q.addEventListener('input', applyFilter);
})();
