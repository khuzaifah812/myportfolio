/* =========================================================
   TechNova — js/sections.js
   ---------------------------------------------------------
   Fills in the parts of a page that come from the lists in
   js/config.js and js/team.js. A page asks for one by adding
   an empty element with one of these attributes:

     data-services="rows"              home page service rows
     data-services="cards"             service cards (anything already
                                       inside stays after the cards)
     data-exclude="it-systems.html"    (with cards) leave one out
     data-team                         team cards (visible members)
     data-team-limit="4"               (with data-team) show at most 4
     data-mockup="dashboard"           a drawn illustration
     data-contact="email"              link to email  (also: phone,
                                       whatsapp, location, hours, timezone)
     data-contact-text="email"         just the text of a contact detail
     data-service-options              fills a <select> with services
     data-local-time                   live clock in the company's time zone
   ========================================================= */

(function () {
  'use strict';

  var company = TechNova.company;
  var services = TechNova.services;

  function each(selector, fn) {
    Array.prototype.forEach.call(document.querySelectorAll(selector), fn);
  }

  // Makes text safe to place inside HTML (for names typed in the lists)
  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function number(i) { return i < 9 ? '0' + (i + 1) : String(i + 1); }

  /* ---------- Service rows (home page) ---------- */
  function serviceRow(service, i) {
    var chips = service.chips.map(function (c) { return '<span class="chip">' + escapeHtml(c) + '</span>'; }).join('');
    return '<article class="svc">' +
      '<div class="svc-visual reveal"><div class="frame">' + (TechNova.mockups[service.mockup] || '') + '</div></div>' +
      '<div class="svc-text">' +
        '<p class="label">' + number(i) + ' / ' + escapeHtml(service.tag) + '</p>' +
        '<h3>' + escapeHtml(service.name) + '</h3>' +
        '<p>' + escapeHtml(service.summary) + '</p>' +
        '<div class="chips">' + chips + '</div>' +
        '<a class="btn btn-primary" href="' + service.page + '">Learn more <span aria-hidden="true">&rarr;</span></a>' +
      '</div>' +
    '</article>';
  }

  /* ---------- Service cards ---------- */
  function serviceCard(service, i) {
    return '<a class="cap reveal" href="' + service.page + '">' +
      '<span class="cap-num" aria-hidden="true">' + number(i) + '</span>' +
      '<p class="label">' + escapeHtml(service.tag) + '</p>' +
      '<h3>' + escapeHtml(service.name) + '</h3>' +
      '<p>' + escapeHtml(service.summary) + '</p>' +
      '<span class="arrow-link">Explore <span aria-hidden="true">&rarr;</span></span>' +
    '</a>';
  }

  each('[data-services]', function (el) {
    var exclude = el.getAttribute('data-exclude');
    var list = services.filter(function (s) { return s.page !== exclude; });
    var html = el.getAttribute('data-services') === 'rows'
      ? list.map(serviceRow).join('')
      : list.map(function (s) { return serviceCard(s, services.indexOf(s)); }).join('');
    el.insertAdjacentHTML('afterbegin', html);
  });

  /* ---------- Team cards ---------- */
  function initials(name) {
    return name.split(/\s+/).slice(0, 2).map(function (w) { return w.charAt(0).toUpperCase(); }).join('');
  }

  function teamCard(person) {
    var photo = person.photo
      ? '<img src="' + person.photo + '" alt="' + escapeHtml(person.name) + ', ' + escapeHtml(person.role) + '" loading="lazy">'
      : '<span aria-hidden="true">' + initials(person.name) + '</span>';
    var link = person.linkedin
      ? '<a href="' + person.linkedin + '" target="_blank" rel="noopener">LinkedIn profile</a>'
      : '';
    // reveal-rise: cards rise one by one as they scroll into view
    // data-tilt: the card tilts towards the pointer (js/ui.js)
    return '<article class="member reveal reveal-rise" data-tilt>' +
      '<div class="member-photo">' + photo + '</div>' +
      '<div class="member-info">' +
        '<p class="member-role">' + escapeHtml(person.role) + '</p>' +
        '<h3>' + escapeHtml(person.name) + '</h3>' + link +
      '</div>' +
    '</article>';
  }

  each('[data-team]', function (el) {
    var people = TechNova.team.filter(function (p) { return p.visible; });
    var limit = Number(el.getAttribute('data-team-limit'));
    if (limit) people = people.slice(0, limit);
    el.innerHTML = people.map(teamCard).join('');
  });

  /* ---------- Drawn illustrations ---------- */
  each('[data-mockup]', function (el) {
    var name = el.getAttribute('data-mockup');
    if (name === 'mini') el.innerHTML = TechNova.mockups.miniSite;
    else el.innerHTML = TechNova.mockups[name] || '';
  });

  /* ---------- Contact details ---------- */
  var contactLinks = {
    email: { href: 'mailto:' + company.email, text: company.email },
    phone: { href: 'tel:' + company.phoneLink, text: company.phone },
    whatsapp: { href: TechNova.whatsappLink(), text: company.phone },
    location: { text: company.location },
    hours: { text: company.hours },
    timezone: { text: company.timeZoneLabel }
  };

  each('[data-contact]', function (el) {
    var info = contactLinks[el.getAttribute('data-contact')];
    if (!info) return;
    if (info.href && el.tagName === 'A') el.setAttribute('href', info.href);
    // Keep any text the page already wrote (e.g. a button label);
    // fill in the value only where the element is empty
    if (!el.textContent.trim()) el.textContent = info.text;
  });

  each('[data-contact-text]', function (el) {
    var info = contactLinks[el.getAttribute('data-contact-text')];
    if (info) el.textContent = info.text;
  });

  /* ---------- Contact form: list of services ---------- */
  each('select[data-service-options]', function (select) {
    services.forEach(function (s) {
      var option = document.createElement('option');
      option.textContent = s.name;
      select.appendChild(option);
    });
    var other = document.createElement('option');
    other.textContent = 'Not sure yet';
    select.appendChild(other);
  });

  /* ---------- Live local time (contact page) ----------
     Shows the time in the company's time zone, so visitors abroad
     can see whether we are in the office. Updates every 30 seconds. */
  var clocks = document.querySelectorAll('[data-local-time]');
  if (clocks.length && window.Intl) {
    var format = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', weekday: 'long', timeZone: company.timeZone
    });
    var tick = function () {
      var text = format.format(new Date());
      Array.prototype.forEach.call(clocks, function (el) { el.textContent = text; });
    };
    tick();
    setInterval(tick, 30000);
  }
})();
