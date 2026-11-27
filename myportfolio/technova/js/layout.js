/* =========================================================
   TechNova — js/layout.js
   ---------------------------------------------------------
   Draws the parts that are the same on every page, using the
   details in js/config.js:
     - the header (logo + menu) and the footer
     - the browser-tab icon
     - the scroll progress bar, the floating WhatsApp button
       and the back-to-top button

   Each page only needs these two empty tags:
     <header class="site-header" id="site-header"></header>
     <footer class="site-footer" id="site-footer"></footer>
   and <body data-page="..."> to mark which menu item is active.
   ========================================================= */

(function () {
  'use strict';

  var company = TechNova.company;
  var services = TechNova.services;
  var currentPage = (document.body.getAttribute('data-page') || 'index') + '.html';

  /* ---------- Icons ---------- */
  var ICON_CHEVRON = '<svg viewBox="0 0 12 8" width="10" height="7" aria-hidden="true"><path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
  var ICON_ARROW_UP = '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  TechNova.ICON_WHATSAPP = '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="rgb(37, 211, 102)"/><path fill="rgb(255, 255, 255)" d="M16.04 7.5a8.4 8.4 0 0 0-7.2 12.73L7.7 24.5l4.37-1.12a8.4 8.4 0 1 0 3.97-15.88zm0 15.36a6.95 6.95 0 0 1-3.55-.97l-.25-.15-2.6.67.7-2.53-.17-.26a6.97 6.97 0 1 1 5.87 3.24zm3.82-5.2c-.21-.1-1.24-.61-1.43-.68s-.33-.1-.47.1-.54.68-.66.82-.24.16-.45.05a5.7 5.7 0 0 1-2.83-2.47c-.21-.37.21-.34.61-1.13a.38.38 0 0 0-.02-.36c-.05-.1-.47-1.13-.64-1.55s-.34-.35-.47-.36h-.4a.77.77 0 0 0-.56.26 2.35 2.35 0 0 0-.73 1.75 4.09 4.09 0 0 0 .86 2.17 9.36 9.36 0 0 0 3.58 3.17c1.33.57 1.85.62 2.52.52a2.15 2.15 0 0 0 1.41-1 1.75 1.75 0 0 0 .12-1c-.05-.09-.19-.14-.4-.25z"/></svg>';

  /* ---------- Logo: shield icon (image) + name and tagline (text) ---------- */
  function logo(size) {
    return '<a class="logo" href="index.html" aria-label="' + company.name + ' home">' +
      '<img class="logo-mark" src="' + company.logo.icon + '" width="' + size + '" height="' + size + '" alt="">' +
      '<span class="logo-text">' +
        '<span class="logo-word">' + company.name.toUpperCase() + '</span>' +
        '<span class="logo-tag">' + company.tagline.toUpperCase() + '</span>' +
      '</span></a>';
  }

  /* ---------- Browser-tab icon and phone home-screen icon ---------- */
  function addIcons() {
    [
      { rel: 'icon', type: 'image/png', href: company.logo.favicon },
      { rel: 'apple-touch-icon', href: company.logo.appleIcon }
    ].forEach(function (info) {
      var link = document.createElement('link');
      Object.keys(info).forEach(function (key) { link.setAttribute(key, info[key]); });
      document.head.appendChild(link);
    });
  }

  /* ---------- Menu helpers ---------- */
  // A link marked as the current page when it points to this page
  function pageLink(href, label) {
    var current = href === currentPage ? ' aria-current="page"' : '';
    return '<li><a href="' + href + '"' + current + '>' + label + '</a></li>';
  }

  // Which top-level menu item this page belongs to
  var solutionPages = ['services.html'].concat(services.map(function (s) { return s.page; }));
  var companyPages = TechNova.menu.companyLinks.map(function (l) { return l.page; });
  function activeGroup() {
    if (currentPage === 'index.html') return 'home';
    if (currentPage === 'contact.html') return 'contact';
    if (solutionPages.indexOf(currentPage) !== -1) return 'solutions';
    if (companyPages.indexOf(currentPage) !== -1) return 'company';
    return '';
  }
  var group = activeGroup();

  function topLink(href, label, name) {
    if (group === name) {
      return '<li><a class="nav-link is-active" href="' + href + '" aria-current="page">' + label + '</a></li>';
    }
    return '<li><a class="nav-link" href="' + href + '">' + label + '</a></li>';
  }

  function dropdown(label, name, links) {
    var active = group === name ? ' is-active' : '';
    var id = 'menu-' + name;
    return '<li class="has-drop">' +
      '<button class="nav-link drop-btn' + active + '" type="button" aria-expanded="false" aria-controls="' + id + '">' + label + ' ' + ICON_CHEVRON + '</button>' +
      '<ul class="drop" id="' + id + '">' +
        links.map(function (l) { return pageLink(l.page, l.label); }).join('') +
      '</ul></li>';
  }

  /* ---------- Header ---------- */
  function renderHeader(target) {
    var solutionLinks = [{ label: 'All solutions', page: 'services.html' }].concat(
      services.map(function (s) { return { label: s.name, page: s.page }; })
    );
    target.innerHTML =
      '<div class="wrap header-inner">' +
        logo(44) +
        '<button class="menu-toggle" id="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">' +
          '<span class="menu-label">Menu</span><span class="bars"><i></i><i></i></span></button>' +
        '<nav class="site-nav" id="site-nav" aria-label="Main">' +
          '<ul class="nav-pill">' +
            topLink('index.html', 'Home', 'home') +
            dropdown('Solutions', 'solutions', solutionLinks) +
            dropdown('Company', 'company', TechNova.menu.companyLinks) +
            topLink('contact.html', 'Contact', 'contact') +
          '</ul>' +
        '</nav>' +
      '</div>';
  }

  /* ---------- Footer ---------- */
  function renderFooter(target) {
    var socialLinks = company.social.map(function (s) {
      return '<li><a href="' + s.url + '" target="_blank" rel="noopener">' + s.label + '</a></li>';
    }).join('');

    target.innerHTML =
      '<div class="wrap footer-grid">' +
        '<div class="footer-brand">' +
          logo(40) +
          '<p class="footer-motto">' + company.motto.join('<br>') + '</p>' +
          '<p>' + company.summary + '</p>' +
        '</div>' +
        '<nav aria-label="Footer: navigate"><h3>Navigate</h3><ul>' +
          pageLink('index.html', 'Home') + pageLink('about.html', 'About us') +
          pageLink('portfolio.html', 'Portfolio') + pageLink('contact.html', 'Contact') +
        '</ul></nav>' +
        '<nav aria-label="Footer: solutions"><h3>Solutions</h3><ul>' +
          services.map(function (s) { return pageLink(s.page, s.shortName); }).join('') +
        '</ul></nav>' +
        '<nav aria-label="Footer: company"><h3>Company</h3><ul>' +
          pageLink('team.html', 'Our team') + pageLink('industries.html', 'Industries') +
          pageLink('services.html', 'All solutions') + pageLink('contact.html', 'Get a quote') +
        '</ul></nav>' +
        '<div><h3>Contact Us</h3><ul class="footer-contact">' +
          '<li><a href="mailto:' + company.email + '">' + company.email + '</a></li>' +
          '<li><a href="tel:' + company.phoneLink + '">' + company.phone + '</a></li>' +
          '<li><a href="' + TechNova.whatsappLink() + '" target="_blank" rel="noopener">Chat on WhatsApp</a></li>' +
          '<li>' + company.location + '</li>' +
          '<li>' + company.timeZoneLabel + '</li>' +
          socialLinks +
        '</ul></div>' +
      '</div>' +
      '<div class="wrap footer-bottom">' +
        '<p>&copy; ' + new Date().getFullYear() + ' ' + company.name + '. All rights reserved.</p>' +
        '<p>Built in Kampala, for clients everywhere.</p>' +
      '</div>';
  }

  /* ---------- Progress bar, WhatsApp button, back-to-top button ---------- */
  function renderFloatingParts() {
    var parts = document.createElement('div');
    parts.innerHTML =
      '<div class="scroll-progress" id="scroll-progress" aria-hidden="true"></div>' +
      '<a class="wa-float" href="' + TechNova.whatsappLink() + '" target="_blank" rel="noopener" aria-label="Chat with ' + company.name + ' on WhatsApp">' +
        TechNova.ICON_WHATSAPP + '<span>Chat with us</span></a>' +
      '<button class="to-top" id="to-top" type="button" aria-label="Back to top">' + ICON_ARROW_UP + '</button>';
    while (parts.firstChild) document.body.appendChild(parts.firstChild);
  }

  /* ---------- Draw everything ---------- */
  addIcons();
  var header = document.getElementById('site-header');
  var footer = document.getElementById('site-footer');
  if (header) renderHeader(header);
  if (footer) renderFooter(footer);
  renderFloatingParts();
})();
