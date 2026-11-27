/* =========================================================
   TechNova — js/team.js
   ---------------------------------------------------------
   THE TEAM LIST.
   Every card on the Team page, the home page and the About
   page is built from this list, in this order.

   For each person:
     name     full name
     role     job title
     photo    path to their photo, or '' to show their initials
     linkedin profile link, or '' for none
     visible  true  = shown on the website
              false = kept here but hidden

   To show a hidden member: fill in their details and set
   visible to true. To add a person: copy one entry.
   Photos look best in portrait (taller than wide) and go in
   the images/team/ folder.
   ========================================================= */

window.TechNova = window.TechNova || {};

TechNova.team = [
  {
    name: 'Aine Mbabazi Khuzaifah',
    role: 'Team Lead',
    photo: 'images/team/aine-mbabazi-khuzaifah.jpg',
    linkedin: '',
    visible: true
  },
  {
    name: 'Kule Godwin',
    role: 'Developer Advocate',
    photo: 'images/team/kule-godwin.jpg',
    linkedin: '',
    visible: true
  },
  {
    name: 'Namiiro Priscilla',
    role: 'Software Architect',
    photo: 'images/team/namiiro-priscilla.jpg',
    linkedin: '',
    visible: true
  },
  {
    name: 'Emilly Nakasanga',
    role: 'Data Analyst',
    photo: 'images/team/emilly-nakasanga.jpg',
    linkedin: '',
    visible: true
  },
  {
    name: 'Sentong Jordan',
    role: 'Software Engineer',
    photo: 'images/team/sentong-jordan.jpg',
    linkedin: '',
    visible: true
  },

  /* ----- Hidden for now: fill in, then set visible to true ----- */
  { name: 'Team member 6', role: 'Role', photo: '', linkedin: '', visible: false },
  { name: 'Team member 7', role: 'Role', photo: '', linkedin: '', visible: false },
  { name: 'Team member 8', role: 'Role', photo: '', linkedin: '', visible: false },
  { name: 'Team member 9', role: 'Role', photo: '', linkedin: '', visible: false }
];
