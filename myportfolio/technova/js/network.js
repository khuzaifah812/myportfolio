/* =========================================================
   TechNova — js/network.js
   ---------------------------------------------------------
   Contact page background: dots drift and link up, and moving
   the pointer lights up the nearby links. Draws on any
   <canvas data-network>. Pauses when off screen or when the
   tab is hidden, and stays still for reduced-motion visitors.
   ========================================================= */

(function () {
  'use strict';

  var canvas = document.querySelector('canvas[data-network]');
  if (!canvas || !canvas.getContext) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ctx = canvas.getContext('2d');
  var area = canvas.parentElement;

  var LINK_DISTANCE = 130;   // dots closer than this are joined
  var POINTER_REACH = 190;   // the pointer lights up dots within this distance
  var ACCENT = [14, 116, 230];      // primary blue

  var nodes = [];
  var width = 0;
  var height = 0;
  var pointer = null;
  var frame = 0;
  var onScreen = true;

  function rgba(c, a) { return 'rgba(' + c[0] + ', ' + c[1] + ', ' + c[2] + ', ' + a.toFixed(3) + ')'; }

  function resize() {
    var rect = canvas.getBoundingClientRect();
    var ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    var count = Math.round(Math.min(110, (width * height) / 13000));
    nodes = [];
    for (var i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.8
      });
    }
    draw();
  }

  function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function line(from, to, color, widthPx) {
    ctx.strokeStyle = color;
    ctx.lineWidth = widthPx;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Links between nearby dots
    for (var i = 0; i < nodes.length; i++) {
      for (var j = i + 1; j < nodes.length; j++) {
        var d = distance(nodes[i], nodes[j]);
        if (d < LINK_DISTANCE) line(nodes[i], nodes[j], rgba(ACCENT, 0.16 * (1 - d / LINK_DISTANCE)), 1);
      }
    }

    // Dots, plus links to the pointer
    nodes.forEach(function (n) {
      var glow = 0;
      if (pointer) {
        var d = distance(n, pointer);
        if (d < POINTER_REACH) {
          glow = 1 - d / POINTER_REACH;
          line(pointer, n, rgba(ACCENT, 0.85 * glow), 1.2);
        }
      }
      ctx.fillStyle = glow ? rgba(ACCENT, 0.5 + glow * 0.5) : rgba(ACCENT, 0.32);
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + glow * 2, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function step() {
    nodes.forEach(function (n) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
    });
    draw();
    frame = requestAnimationFrame(step);
  }

  function run() {
    cancelAnimationFrame(frame);
    if (!reduceMotion && onScreen && !document.hidden) frame = requestAnimationFrame(step);
  }

  area.addEventListener('pointermove', function (event) {
    var rect = canvas.getBoundingClientRect();
    pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    if (reduceMotion) draw();
  });
  area.addEventListener('pointerleave', function () {
    pointer = null;
    if (reduceMotion) draw();
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      onScreen = entries[0].isIntersecting;
      run();
    }).observe(canvas);
  }
  document.addEventListener('visibilitychange', run);

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  resize();
  run();
})();
