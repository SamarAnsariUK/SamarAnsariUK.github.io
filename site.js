/* samaransari.com  |  shared behaviour  |  2026-09-10
   Creates a back-to-top button and shows it once the page is scrolled.
   Every page loads this file, so changes here apply everywhere. */

(function () {
  var btn = document.createElement('button');
  btn.className = 'to-top';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Back to top');
  btn.setAttribute('aria-hidden', 'true');
  btn.innerHTML =
    '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">' +
    '<path d="M12 19V6M12 5l-7 7M12 5l7 7" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="square"/></svg>';
  document.body.appendChild(btn);

  var shown = false;
  var threshold = 700;

  function update() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    var should = y > threshold;
    if (should !== shown) {
      shown = should;
      btn.classList.toggle('is-visible', shown);
      btn.setAttribute('aria-hidden', shown ? 'false' : 'true');
    }
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () { update(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener('click', function () {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    var brand = document.querySelector('.site .brand');
    if (brand) { brand.focus({ preventScroll: true }); }
  });

  update();
})();
