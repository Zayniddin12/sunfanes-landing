/* Component: header — mobile menu + Businesses submenu */
(function () {
  function init(root) {
    var toggle = root.querySelector('.site-header__toggle');
    var sub = root.querySelector('.site-nav__item--has-sub');
    var subBtn = sub && sub.querySelector('.site-nav__link--btn');
    var mq = window.matchMedia('(max-width: 1180px)');

    function setMenu(open) {
      root.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (!open) setSub(false);
    }

    function setSub(open) {
      if (!sub) return;
      sub.classList.toggle('is-open', open);
      subBtn.setAttribute('aria-expanded', String(open));
    }

    toggle.addEventListener('click', function () {
      setMenu(!root.classList.contains('is-open'));
    });

    if (subBtn) {
      subBtn.addEventListener('click', function () {
        setSub(!sub.classList.contains('is-open'));
      });
    }

    root.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });

    document.addEventListener('click', function (e) {
      if (!root.contains(e.target)) {
        setMenu(false);
        setSub(false);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });

    mq.addEventListener('change', function () {
      setMenu(false);
    });
  }

  document.querySelectorAll('[data-component="site-header"]').forEach(init);
})();
