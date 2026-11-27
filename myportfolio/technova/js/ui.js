/* =========================================================
   TechNova — js/ui.js
   ---------------------------------------------------------
   Interactive behaviour shared by all pages:
     1. Header shadow, mobile menu and dropdown menus
     2. Scroll progress bar and back-to-top button
     3. Sliders (home hero, "how we work" panel)
     4. Rotating word on service pages
     5. Arrow buttons for the sideways process cards
     6. Scroll-in animation: content appears as you reach it
     7. Tilt: cards lean towards the mouse pointer
   Runs after js/layout.js and js/sections.js have drawn the page.
   ========================================================= */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function each(selector, fn) {
    Array.prototype.forEach.call(document.querySelectorAll(selector), fn);
  }

  /* ---------- 1. Header and menus ---------- */
  var header = document.querySelector('.site-header');
  var toggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('site-nav');

  if (header && toggle && nav) {
    // Mobile menu button
    var setMenu = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('.menu-label').textContent = open ? 'Close' : 'Menu';
    };
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Dropdowns (Solutions, Company): open on hover on desktop, on tap elsewhere
    var drops = Array.prototype.slice.call(document.querySelectorAll('.has-drop'));
    var hoverMenus = function () { return window.matchMedia('(hover: hover) and (min-width: 961px)').matches; };
    var setDrop = function (item, open) {
      item.classList.toggle('is-open', open);
      item.querySelector('.drop-btn').setAttribute('aria-expanded', String(open));
    };
    var closeOtherDrops = function (keep) {
      drops.forEach(function (item) { if (item !== keep) setDrop(item, false); });
    };

    drops.forEach(function (item) {
      item.querySelector('.drop-btn').addEventListener('click', function () {
        var open = hoverMenus() ? true : !item.classList.contains('is-open');
        closeOtherDrops(item);
        setDrop(item, open);
      });
      item.addEventListener('mouseleave', function () { if (hoverMenus()) setDrop(item, false); });
    });

    // Clicking elsewhere closes menus; Escape closes the innermost one
    document.addEventListener('click', function (event) {
      if (!event.target.closest('.has-drop')) closeOtherDrops(null);
      if (nav.classList.contains('is-open') && !event.target.closest('.site-header')) setMenu(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      var openDrop = drops.filter(function (item) { return item.classList.contains('is-open'); })[0];
      if (openDrop) {
        setDrop(openDrop, false);
        openDrop.querySelector('.drop-btn').focus();
      } else if (nav.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  /* ---------- 2. Scroll progress bar, header shadow, back-to-top ---------- */
  var progress = document.getElementById('scroll-progress');
  var toTop = document.getElementById('to-top');

  function onScroll() {
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle('is-scrolled', y > 20);
    if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    if (toTop) toTop.classList.toggle('is-visible', y > 700);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      var skip = document.querySelector('.skip-link');
      if (skip) skip.focus({ preventScroll: true });
    });
  }

  /* ---------- 3. Sliders ----------
     A slider is any element with data-slider. Inside it:
       - slides marked data-slide="0", "1", ... (text and picture
         with the same number change together)
       - an empty [data-dots] box for the dot buttons
       - optional [data-prev] / [data-next] buttons and a [data-count]
     Options on the data-slider element:
       data-interval="6000"   time per slide in milliseconds
       data-label="slide"     word used for the dot button labels
     Auto-play pauses on hover or focus, stops once a visitor picks a
     slide, and never runs for visitors who prefer reduced motion. */
  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function initSlider(root) {
    var slides = Array.prototype.slice.call(root.querySelectorAll('[data-slide]'));
    var count = 0;
    slides.forEach(function (s) { count = Math.max(count, Number(s.getAttribute('data-slide')) + 1); });
    var dotsBox = root.querySelector('[data-dots]');
    if (count < 2 || !dotsBox) return;

    var interval = Number(root.getAttribute('data-interval')) || 1000;
    var label = root.getAttribute('data-label') || 'slide';
    var counter = root.querySelector('[data-count]');
    var current = 0;
    var timer = null;
    var autoPlay = !reduceMotion;

    var dots = [];
    for (var i = 0; i < count; i++) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Show ' + label + ' ' + (i + 1) + ' of ' + count);
      dot.addEventListener('click', choose.bind(null, i));
      dotsBox.appendChild(dot);
      dots.push(dot);
    }

    function show(index) {
      current = (index + count) % count;
      slides.forEach(function (slide) {
        var on = Number(slide.getAttribute('data-slide')) === current;
        slide.classList.toggle('is-active', on);
        slide.setAttribute('aria-hidden', String(!on));
        if ('inert' in slide) slide.inert = !on;
      });
      dots.forEach(function (d, j) { d.setAttribute('aria-current', String(j === current)); });
      if (counter) counter.innerHTML = '<b>' + pad(current + 1) + '</b> / ' + pad(count);
    }

    function stop() { clearInterval(timer); timer = null; }
    function start() {
      stop();
      if (autoPlay) timer = setInterval(function () { show(current + 1); }, interval);
    }

    // A visitor's own choice ends auto-play and announces the new slide
    function choose(index) {
      autoPlay = false;
      stop();
      root.setAttribute('aria-live', 'polite');
      show(index);
    }

    var prev = root.querySelector('[data-prev]');
    var next = root.querySelector('[data-next]');
    if (prev) prev.addEventListener('click', function () { choose(current - 1); });
    if (next) next.addEventListener('click', function () { choose(current + 1); });

    // Left and right arrow keys work while the slider has keyboard focus
    root.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') choose(current - 1);
      if (event.key === 'ArrowRight') choose(current + 1);
    });

        // Any touch or click inside the slider stops automatic sliding for good
    root.addEventListener('pointerdown', function () {
      autoPlay = false;
      stop();
    });
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);

    show(0);
    start();
  }
  each('[data-slider]', initSlider);

  /* ---------- 4. Rotating word on service pages ---------- */
  each('[data-cycle]', function (box) {
    var words = box.querySelectorAll('.cycle-word');
    if (words.length < 2 || reduceMotion) return;
    var i = 0;
    setInterval(function () {
      words[i].classList.remove('is-active');
      i = (i + 1) % words.length;
      words[i].classList.add('is-active');
    }, 2400);
  });

  /* ---------- 5. Arrow buttons for sideways process cards ---------- */
  each('[data-scroll]', function (button) {
    var track = document.getElementById(button.getAttribute('aria-controls'));
    if (!track) return;
    button.addEventListener('click', function () {
      var card = track.firstElementChild;
      var distance = card ? card.getBoundingClientRect().width + 20 : 400;
      if (button.getAttribute('data-scroll') === 'prev') distance = -distance;
      track.scrollBy({ left: distance, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });

  /* ---------- 6. Scroll-in animation ----------
     Everything matched below is marked .reveal and fades in, moving up,
     when it scrolls into view. Items side by side (cards in a grid,
     team members) appear one after another. To animate something new,
     add its selector to this list. Pictures on the left slide in from
     the left, pictures on the right from the right. */
  var REVEAL_SELECTORS = [
    '.section-head', '.split > *', '.page-hero .wrap > *', '.intro-text > *',
    '.motto-item', '.svc-visual', '.svc-text', '.about > *', '.cap', '.member',
    '.pin-card', '.step', '.feature-split > *', '.ticks li', '.journey-head',
    '.photo', '.illustration', '.devices', '.ba-pane', '.faq-item',
    '.info-card', '.form', '.cta .wrap > *', '.center-link', '.sky-text', '.contact-hero .wrap > *'
  ];
  var STAGGER_MS = 120;   // delay between items that sit side by side
  var MAX_STAGGER = 6;    // after this many, items stop waiting longer

  function markRevealItems() {
    each(REVEAL_SELECTORS.join(','), function (el) {
      if (el.closest('.hero')) return;   // the hero has its own slide animation
      el.classList.add('reveal');
    });
    // Pictures beside text come in from their own side
    each('.svc .svc-visual', function (el) {
      var even = Array.prototype.indexOf.call(el.parentNode.parentNode.children, el.parentNode) % 2 === 1;
      el.classList.add(even ? 'reveal-right' : 'reveal-left');
    });
    each('.about > .reveal:first-child, .feature-split > .reveal:first-child', function (el) { el.classList.add('reveal-left'); });
    // One-by-one delay for items that share a parent
    each('.reveal', function (el) {
      var siblings = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.classList.contains('reveal'); });
      var position = Math.min(siblings.indexOf(el), MAX_STAGGER);
      if (position > 0) el.style.transitionDelay = (position * STAGGER_MS) + 'ms';
    });
  }

  if (!reduceMotion && 'IntersectionObserver' in window) {
    markRevealItems();
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add('in-view');
        revealObserver.unobserve(el);
        // Clear the delay once shown, so hover effects respond instantly
        setTimeout(function () { el.style.transitionDelay = ''; }, 1600);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    each('.reveal', function (el) { revealObserver.observe(el); });
  } else {
    // No animation: make sure nothing stays hidden
    document.documentElement.classList.remove('js');
  }

  /* ---------- 7. Tilt: cards lean towards the mouse pointer ----------
     Add data-tilt to any element. Only for mouse users who have not
     asked for reduced motion. */
  if (finePointer && !reduceMotion) {
    var MAX_TILT = 8; // degrees
    each('[data-tilt]', function (card) {
      card.addEventListener('pointermove', function (event) {
        var box = card.getBoundingClientRect();
        var x = (event.clientX - box.left) / box.width - 0.5;   // -0.5 to 0.5
        var y = (event.clientY - box.top) / box.height - 0.5;
        card.style.transform = 'perspective(800px) rotateX(' + (-y * MAX_TILT).toFixed(2) + 'deg) rotateY(' +
          (x * MAX_TILT).toFixed(2) + 'deg) translateY(-6px)';
      });
      card.addEventListener('pointerleave', function () { card.style.transform = ''; });
    });
  }
})();
