/* =========================================================
   TechNova — js/config.js
   ---------------------------------------------------------
   THE ONE PLACE FOR COMPANY DETAILS.
   The header, footer, contact page, service lists and menus
   on every page are built from the values below. Change
   something here once and it updates across the whole site.
   ========================================================= */

window.TechNova = window.TechNova || {};

/* ---------- Company details ---------- */
TechNova.company = {
  name: 'TechNova',
  motto: ['Protect the data.', 'Decode the insight.', 'Mobilize the future.'],
  tagline: 'IT Solutions',          // small line under the name in the logo

  // Logo files (in images/logo/)
  logo: {
    icon: 'images/logo/technova-icon.png',          // shield icon used in the header and footer
    favicon: 'images/logo/favicon-64.png',          // browser tab icon
    appleIcon: 'images/logo/apple-touch-icon.png'   // icon when saved to a phone home screen
  },

  summary: 'Custom IT systems, websites and data solutions for startups, small and medium businesses and large enterprises.',

  email: 'technovaitcompany@gmail.com',
  phone: '+256 789 958 889',       // how the number is shown
  phoneLink: '+256789958889',      // the same number with no spaces, used for "call" links

  // WhatsApp: the number in international form with no "+" or spaces.
  // Every WhatsApp button opens a chat with this number, with the
  // greeting below already typed in for the visitor.
  whatsappNumber: '256789958889',
  whatsappGreeting: 'Hello TechNova, I would like to talk about a project.',

  location: 'Kampala, Uganda',
  timeZone: 'Africa/Kampala',      // used for the live "our local time" clock
  timeZoneLabel: 'East Africa Time (UTC+3)',
  hours: 'Monday to Friday, 8:00 to 17:00',

  // Social profiles shown in the footer. Add one line per profile, e.g.
  // { label: 'LinkedIn', url: 'https://www.linkedin.com/company/your-page' }
  social: []
};

/* ---------- Services ----------
   Each entry is one service. It appears in the Solutions menu, the
   footer, the home page, the Solutions page, the contact form and the
   "Combine it with" list on the other service pages.

   To add a service:
     1. copy one entry below and change its values;
     2. copy one of the service pages (for example it-systems.html),
        rename it to match "page", and edit its text.

   mockup: which drawn illustration to show (see js/mockups.js):
           'dashboard', 'website', 'analytics', 'integration' or 'support'. */
TechNova.services = [
  {
    page: 'it-systems.html',
    name: 'Custom IT Systems',
    shortName: 'Custom IT Systems',
    tag: 'Systems',
    summary: 'ERP, CRM, automation and cloud infrastructure built around the way your business already works, from one branch to many.',
    chips: ['ERP & CRM', 'Workflow Automation', 'Cloud Infrastructure', 'Multi-branch'],
    mockup: 'dashboard'
  },
  {
    page: 'web-development.html',
    name: 'Website Design & Development',
    shortName: 'Website Design',
    tag: 'Web',
    summary: 'Fast, responsive company sites, online stores and web apps that your own team can keep up to date.',
    chips: ['UX / UI Design', 'Responsive Front End', 'CMS Setup', 'Speed & SEO'],
    mockup: 'website'
  },
  {
    page: 'data-analysis.html',
    name: 'Data Analysis & Insights',
    shortName: 'Data Analysis',
    tag: 'Data',
    summary: 'Dashboards, reports and analysis that turn everyday records into clear decisions for managers and boards.',
    chips: ['Dashboards', 'Reporting', 'Data Cleaning', 'Business Intelligence'],
    mockup: 'analytics'
  },
  {
    page: 'integration.html',
    name: 'Software Integration & Consulting',
    shortName: 'Software Integration',
    tag: 'API',
    summary: 'We connect the tools you already use, from Mobile Money to enterprise systems, and advise on what to build, buy or retire.',
    chips: ['API Integration', 'Mobile Money', 'Data Migration', 'Technology Audits'],
    mockup: 'integration'
  },
  {
    page: 'support.html',
    name: 'IT Support & Maintenance',
    shortName: 'IT Support',
    tag: 'Support',
    summary: 'Monitoring, backups, security updates and a help desk you can reach, long after launch day.',
    chips: ['Monitoring', 'Data Protection', 'Security Updates', 'Help Desk'],
    mockup: 'support'
  }
];

/* ---------- Menu ----------
   "Solutions" is filled from the services list above.
   Each page says which menu item it belongs to with
   <body data-page="..."> (the file name without .html). */
TechNova.menu = {
  companyLinks: [
    { label: 'About us', page: 'about.html' },
    { label: 'Our team', page: 'team.html' },
    { label: 'Portfolio', page: 'portfolio.html' },
    { label: 'Industries', page: 'industries.html' }
  ]
};

/* ---------- Helper: WhatsApp chat link ----------
   TechNova.whatsappLink()            chat with the default greeting
   TechNova.whatsappLink('Hi there')  chat with your own message
   wa.me links open the WhatsApp app on phones and WhatsApp Web or
   the desktop app on computers, straight into the chat. */
TechNova.whatsappLink = function (message) {
  var text = message || TechNova.company.whatsappGreeting;
  return 'https://wa.me/' + TechNova.company.whatsappNumber + '?text=' + encodeURIComponent(text);
};
