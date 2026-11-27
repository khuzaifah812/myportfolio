/* =========================================================
   TechNova — js/mockups.js
   ---------------------------------------------------------
   Drawn illustrations of our products (a dashboard, a website,
   a data report, an integration map, a support status page).
   They are built with HTML and styled by css/mockups.css, so
   they stay sharp at any size and need no image files.

   To place one on a page, write an empty element such as
     <div data-mockup="dashboard"></div>
   and js/sections.js fills it in.
   ========================================================= */

window.TechNova = window.TechNova || {};

TechNova.mockups = (function () {
  'use strict';

  /* A browser-style window around any content */
  function windowFrame(title, body, isUrl) {
    var bar = isUrl ? '<span class="url">' + title + '</span>' : '<span>' + title + '</span>';
    return '<div class="scale"><div class="win" aria-hidden="true">' +
      '<div class="win-bar"><i></i><i></i><i></i>' + bar + '</div>' + body +
      '</div></div>';
  }

  /* A tiny sample website, reused in several mockups */
  var miniSite =
    '<div class="mini">' +
      '<div class="mini-nav"><b>YourBrand</b><span></span><span></span><span></span><em>Contact</em></div>' +
      '<div class="mini-hero">' +
        '<div><strong>Quality you can count on.</strong><p></p><p class="short"></p><em>Shop now</em></div>' +
        '<div class="mini-img"></div>' +
      '</div>' +
      '<div class="mini-cards">' +
        '<div><i></i><b>Products</b><p></p></div>' +
        '<div><i></i><b>Delivery</b><p></p></div>' +
        '<div><i></i><b>Support</b><p></p></div>' +
      '</div>' +
    '</div>';

  function bars(heights) {
    return heights.map(function (h) { return '<span style="height:' + h + '%"></span>'; }).join('');
  }

  /* ---------- Business dashboard (Custom IT Systems) ---------- */
  var dashboard = windowFrame('TechNova ERP · Overview',
    '<div class="dash">' +
      '<div class="dash-side"><b>ERP</b><span class="on">Overview</span><span>Sales</span><span>Stock</span><span>Branches</span><span>Payroll</span><span>Reports</span></div>' +
      '<div class="dash-main">' +
        '<div class="kpis">' +
          '<div class="kpi"><small>Sales this month</small><b>UGX 48.2M</b><em class="up">+12%</em></div>' +
          '<div class="kpi"><small>Orders</small><b>1,284</b><em class="up">+8%</em></div>' +
          '<div class="kpi"><small>Low stock</small><b>6 items</b><em class="warn">Reorder</em></div>' +
        '</div>' +
        '<div class="chart-card"><small>Weekly sales</small><div class="chart">' + bars([38, 52, 45, 61, 58, 72, 66, 80, 74, 88, 83, 95]) + '</div></div>' +
        '<div class="rows">' +
          '<div class="row"><span>INV-2041</span><span>Main branch</span><span class="pill ok">Paid</span></div>' +
          '<div class="row"><span>INV-2040</span><span>Online order</span><span class="pill ok">Paid</span></div>' +
          '<div class="row"><span>INV-2039</span><span>Wholesale client</span><span class="pill pend">Due</span></div>' +
        '</div>' +
      '</div>' +
    '</div>');

  /* ---------- Website in a browser (Web Development) ---------- */
  var website = windowFrame('yourbusiness.co.ug', '<div class="win-body">' + miniSite + '</div>', true);

  /* ---------- Data report (Data Analysis) ---------- */
  var analytics = windowFrame('Monthly insight report',
    '<div class="report">' +
      '<div class="report-head"><b>Revenue is up 18% this quarter</b><span class="pill ok">Updated today</span></div>' +
      '<div class="report-grid">' +
        '<div class="report-card"><small>Revenue trend (UGX M)</small>' +
          '<svg class="line-chart" viewBox="0 0 240 110" aria-hidden="true">' +
            '<path class="area" d="M0 92 L30 84 L60 88 L90 70 L120 74 L150 56 L180 50 L210 34 L240 22 L240 110 L0 110 Z"/>' +
            '<path class="line" d="M0 92 L30 84 L60 88 L90 70 L120 74 L150 56 L180 50 L210 34 L240 22"/>' +
            '<circle class="point" cx="240" cy="22" r="4"/>' +
          '</svg></div>' +
        '<div class="report-card"><small>Sales by channel</small><div class="donut"></div>' +
          '<ul class="legend">' +
            '<li><i style="background:rgb(47, 107, 255)"></i>Branches 46%</li>' +
            '<li><i style="background:rgb(77, 184, 255)"></i>Online 28%</li>' +
            '<li><i style="background:rgb(61, 220, 151)"></i>Wholesale 14%</li>' +
          '</ul></div>' +
      '</div>' +
      '<ul class="insights">' +
        '<li>Best-selling branch<b>Kampala Central</b></li>' +
        '<li>Customers returning within 30 days<b>64%</b></li>' +
      '</ul>' +
    '</div>');

  /* ---------- Integration map (Software Integration) ---------- */
  var nodes = [[78, 50, 'Mobile Money'], [78, 140, 'Accounting'], [78, 230, 'SMS Alerts'],
               [342, 50, 'Inventory'], [342, 140, 'CRM'], [342, 230, 'Email']];
  var integration = windowFrame('Integration map',
    '<svg class="int-svg" viewBox="0 0 420 280">' +
      '<g class="int-links">' + nodes.map(function (n) { return '<path d="M210 140 L' + n[0] + ' ' + n[1] + '"/>'; }).join('') + '</g>' +
      nodes.map(function (n) {
        return '<g class="int-node"><rect x="' + (n[0] - 62) + '" y="' + (n[1] - 18) + '" width="124" height="36" rx="18"/>' +
               '<text x="' + n[0] + '" y="' + (n[1] + 5) + '">' + n[2] + '</text></g>';
      }).join('') +
      '<g class="int-core"><rect x="145" y="108" width="130" height="64" rx="16"/>' +
        '<text x="210" y="138">TechNova API</text><text class="sub" x="210" y="156">6 apps connected</text></g>' +
    '</svg>');

  /* ---------- Service status page (IT Support) ---------- */
  var uptime = '';
  for (var i = 0; i < 30; i++) uptime += i === 17 ? '<span class="warn"></span>' : '<span></span>';
  var support = windowFrame('Service status',
    '<div class="sup">' +
      '<div class="sup-head"><b>All systems operational</b><span class="pill ok">Live</span></div>' +
      '<div class="uptime">' + uptime + '</div>' +
      '<div class="uptime-meta"><span>30 days ago</span><span>99.9% uptime</span><span>Today</span></div>' +
      '<ul class="sup-log">' +
        '<li><i></i>Nightly backup completed<time>02:00</time></li>' +
        '<li><i></i>Security updates applied<time>Mon</time></li>' +
        '<li><i></i>SSL certificate renewed<time>Fri</time></li>' +
        '<li><i class="warn"></i>Disk at 78%, cleanup scheduled<time>Thu</time></li>' +
      '</ul>' +
    '</div>');

  /* ---------- System plan drawing (used in "About" blocks) ---------- */
  function box(x, y, label) {
    return '<g class="bp-box"><rect x="' + x + '" y="' + y + '" width="140" height="46" rx="8"/>' +
           '<text x="' + (x + 70) + '" y="' + (y + 28) + '">' + label + '</text></g>';
  }
  var blueprint =
    '<div class="blueprint" role="img" aria-label="A system plan showing customers, website, staff app, API, database and reports">' +
      '<svg viewBox="0 0 400 500" aria-hidden="true">' +
        '<path class="bp-line" d="M200 86 L110 150 M200 86 L290 150 M110 196 L200 260 M290 196 L200 260 M200 306 L110 370 M200 306 L290 370"/>' +
        box(130, 40, 'Customers') + box(40, 150, 'Website') + box(220, 150, 'Staff app') +
        box(130, 260, 'API') + box(40, 370, 'Database') + box(220, 370, 'Reports') +
        '<text class="bp-note" x="282" y="246">auth + roles</text>' +
        '<text class="bp-note" x="22" y="476">v1.2 · system map</text>' +
        '<g class="bp-stamp" transform="rotate(-6 315 458)"><rect x="250" y="440" width="130" height="34" rx="4"/><text x="315" y="462">SIGNED OFF</text></g>' +
      '</svg>' +
    '</div>';

  return {
    dashboard: dashboard,
    website: website,
    analytics: analytics,
    integration: integration,
    support: support,
    blueprint: blueprint,
    miniSite: miniSite
  };
})();
