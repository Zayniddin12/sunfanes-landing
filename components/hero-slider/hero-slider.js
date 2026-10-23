/* Component: hero-slider — fade slider with autoplay, dots, arrows, swipe */
(function () {
  var INTERVAL = 6000;

  function init(root) {
    var slides = Array.prototype.slice.call(root.querySelectorAll('.hero-slide'));
    var dotsWrap = root.querySelector('.hero-slider__dots');
    var prev = root.querySelector('.hero-slider__arrow--prev');
    var next = root.querySelector('.hero-slider__arrow--next');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var current = 0;
    var timer = null;
    var dots = [];

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'hero-slider__dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Banner ' + (i + 1));
      dot.addEventListener('click', function () {
        goTo(i);
        restart();
      });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        var active = i === current;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
        var link = slide.querySelector('a');
        if (link) link.tabIndex = active ? 0 : -1;
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === current);
        dot.setAttribute('aria-selected', String(i === current));
      });
    }

    function stop() {
      clearInterval(timer);
      timer = null;
    }

    function start() {
      if (reduceMotion || timer) return;
      timer = setInterval(function () {
        goTo(current + 1);
      }, INTERVAL);
    }

    function restart() {
      stop();
      start();
    }

    prev.addEventListener('click', function () { goTo(current - 1); restart(); });
    next.addEventListener('click', function () { goTo(current + 1); restart(); });

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);

    // Touch swipe
    var startX = null;
    root.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });
    root.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(dx) > 40) {
        goTo(current + (dx < 0 ? 1 : -1));
        restart();
      }
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });

    goTo(0);
    start();
  }

  document.querySelectorAll('[data-component="hero-slider"]').forEach(init);
})();
