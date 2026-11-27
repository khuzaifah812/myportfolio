# TechNova Website

**Protect the data. Decode the insight. Mobilize the future.**

A 12-page company website built with plain HTML, CSS and JavaScript. It needs no build step, no framework and no installs.

## Folder layout

```
technova/
├── index.html              Home
├── services.html           All solutions
├── it-systems.html         Custom IT Systems
├── web-development.html    Website Design & Development
├── data-analysis.html      Data Analysis & Insights
├── integration.html        Software Integration & Consulting
├── support.html            IT Support & Maintenance
├── about.html              About, mission, vision, motto
├── team.html               Team
├── portfolio.html          Portfolio (sample projects)
├── industries.html         Industries
├── contact.html            Contact details and form
├── css/
│   ├── base.css            Fonts, text, buttons, small helpers
│   ├── layout.css          Header, menu, sections, footer
│   ├── components.css      Sliders, cards, team cards, forms
│   ├── mockups.css         Drawn dashboards, websites, phones
│   └── responsive.css      Tablet and phone layout (loaded last)
├── js/
│   ├── config.js           Company details, motto, services, menu
│   ├── team.js             Team list (who is shown or hidden)
│   ├── mockups.js          Drawn illustrations
│   ├── layout.js           Draws the header and footer on every page
│   ├── sections.js         Draws service lists, team cards, contact details
│   ├── ui.js               Menus, sliders, animations
│   ├── network.js          Contact page moving background
│   └── contact-form.js     Contact form checks and sending
└── images/
    ├── logo/               Logo icon, tab icons, full logo for documents
    ├── hero/               The six home page slide pictures
    ├── team/               Team photos
    ├── photos/             Other photos
    └── illustrations/      Drawings on the Data and Support pages
```

## Where to change what

| To change… | Edit |
| --- | --- |
| Email, phone, WhatsApp number and greeting, location, time zone, hours, motto | `js/config.js`, under `TechNova.company` |
| Logo icon and browser-tab icon | the files in `images/logo/` (paths are set in `js/config.js`, under `logo`) |
| Social media links in the footer | `js/config.js`, the `social` list |
| A service's name, summary or tags | `js/config.js`, `TechNova.services` |
| Team members, roles, photos, who is visible | `js/team.js` |
| Home page slides | `index.html`, the HERO SLIDER section |
| Text on a page | that page's `.html` file |
| Colours, spacing, fonts | the files in `css/` |
| Which content animates as you scroll | `REVEAL_SELECTORS` in `js/ui.js` |
| FAQ questions | the FAQ section in `services.html` and `contact.html` |

The header, footer, menus, service lists, team cards and contact details are all drawn from `js/config.js` and `js/team.js`. Change a value there once and every page updates.

## Team

`js/team.js` lists all nine team members. Each person has `visible: true` (shown) or `visible: false` (hidden). Right now five are shown:

| Name | Role | Photo |
| --- | --- | --- |
| Aine Mbabazi Khuzaifah | Team Lead | `images/team/aine-mbabazi-khuzaifah.jpg` |
| Kule Godwin | Developer Advocate | none yet (shows initials) |
| Namiiro Priscilla | Software Architect | `images/team/namiiro-priscilla.jpg` |
| Emilly Nakasanga | Data Analyst | none yet (shows initials) |
| Sentong Jordan | Software Engineer | `images/team/sentong-jordan.jpg` |

**To show one of the four hidden members:** replace their name, role and photo, then change `visible: false` to `visible: true`.

**To add a photo:** put the picture in `images/team/` (portrait shape works best) and write its path in `photo`.

The team grid fits as many cards per row as there is room for, so no CSS changes are needed when people are added.

## Home page slides

Each of the six slides has two parts with the same `data-slide` number:

1. the words, inside `<div class="hero-copy">` (shown on the left)
2. the picture, inside `<div class="hero-media">` (shown on the right)

To change a slide, edit both parts. To add one, copy both parts and give them the next number. The slider counts slides by itself. Change `data-interval="6000"` (in milliseconds) to make slides change faster or slower.

## Adding a service

1. Copy one entry in `TechNova.services` in `js/config.js` and change its values.
2. Copy a service page (for example `it-systems.html`), rename it to match `page`, and edit its text. Set `<body data-page="...">` to the new file name without `.html`.

The new service then appears in the menu, footer, home page, Solutions page and contact form automatically.

## WhatsApp

Every WhatsApp button (the floating green button on every page, the contact page buttons and the footer link) opens a chat with **+256 789 958 889**, with a greeting already typed in. On phones it opens the WhatsApp app; on computers it opens WhatsApp Web or the desktop app.

To change the number or the greeting, edit `whatsappNumber` and `whatsappGreeting` in `js/config.js`. Write the number in international form with no `+` or spaces, e.g. `256789958889`.

## Contact form

The form checks what the visitor typed, then sends the message one of two ways:

- **Send on WhatsApp** opens a chat with your number and the whole message typed in. This works straight away.
- **Send by email** opens the visitor's email app, addressed to **technovaitcompany@gmail.com**. To receive emails directly instead, create a free form at formspree.io and paste its address into `FORM_ENDPOINT` at the top of `js/contact-form.js`.

## Animations

- **Scroll-in:** sections, cards and pictures fade and slide in as they scroll into view, one after another. To animate something new, add its CSS selector to `REVEAL_SELECTORS` in `js/ui.js`.
- **Team photos:** rise in one by one, zoom on hover and tilt towards the mouse.
- **Home slider:** words slide in from the left while the picture slides in from the right.
- **Extras:** a scroll progress bar at the top, a back-to-top button and a pulsing WhatsApp button.

Visitors who have turned on "reduce motion" on their device see everything without animation.

## Run it and put it online

- **On your computer:** open `index.html` in a browser.
- **Online:** upload the whole folder, keeping `css/`, `js/` and `images/` next to the HTML files, to any static host: GitHub Pages, Netlify, Vercel or Cloudflare Pages.

The header, footer and lists are drawn with JavaScript. Every modern browser and Google's search crawler run JavaScript, so this works for visitors and search engines alike.

## Before launch

1. **Portfolio** (`portfolio.html`): the six projects are samples marked "Sample". Replace them with real work.
2. **Team photos:** Kule Godwin and Emilly Nakasanga show initials until photos are added.
3. **Web address:** every page's `<head>` uses `https://www.technova.example/` as a placeholder. Replace it with your real domain.
4. **Location:** "Kampala, Uganda" is set in `js/config.js`.

## Colours and fonts

All colours are written as `rgb()` values. The main ones are:

| Colour | Used for |
| --- | --- |
| `rgb(14, 116, 230)` | Primary blue: buttons, links, highlighted words |
| `rgb(77, 171, 255)` | Bright light blue: gradients and accents |
| `rgb(237, 246, 255)` | Light blue section backgrounds |
| `rgb(248, 251, 255)` | Page background |
| `rgb(8, 27, 54)` | Headings and the footer |

To change one everywhere, use find-and-replace across the `css/` folder.

Fonts (from Google Fonts): **Plus Jakarta Sans** for headings and buttons, **Inter** for body text (17px), **JetBrains Mono** only for code inside the drawn illustrations.
