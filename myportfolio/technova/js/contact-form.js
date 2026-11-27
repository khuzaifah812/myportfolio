/* =========================================================
   TechNova — js/contact-form.js
   ---------------------------------------------------------
   Checks the contact form, then sends the message one of two ways,
   depending on which button the visitor pressed:

   "Send on WhatsApp"  opens a WhatsApp chat with the company number
                       (js/config.js) with the whole message typed in.
   "Send by email"     see FORM_ENDPOINT below.

   FORM_ENDPOINT
     Leave empty: the visitor's email app opens with the message
     ready to send to the company email in js/config.js.
     Paste a form-service address (for example a Formspree URL,
     "https://formspree.io/f/yourFormId") to receive messages
     directly without the email app.
   ========================================================= */

(function () {
  'use strict';

  var FORM_ENDPOINT = '';

  var form = document.getElementById('contact-form');
  if (!form) return;

  var companyEmail = TechNova.company.email;
  var status = document.getElementById('form-status');
  var emailButton = form.querySelector('button[value="email"]');
  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /* ---------- Rules: each returns an error message, or '' when fine ---------- */
  var rules = {
    name: function (value) {
      if (!value) return 'Enter your name.';
      return value.length < 2 ? 'Name must be at least 2 characters.' : '';
    },
    email: function (value) {
      if (!value) return 'Enter your email address.';
      return EMAIL_PATTERN.test(value) ? '' : 'Enter a valid email, like name@company.com.';
    },
    message: function (value) {
      if (!value) return 'Tell us a little about your project.';
      return value.length < 10 ? 'Message must be at least 10 characters.' : '';
    }
  };

  function checkField(field) {
    var message = rules[field.name](field.value.trim());
    var errorBox = document.getElementById(field.name + '-error');
    errorBox.textContent = message;
    errorBox.hidden = !message;
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    return !message;
  }

  function showStatus(text, type) {
    status.textContent = text;
    status.className = 'form-status is-' + type;
    status.hidden = false;
  }

  // Check a field when the visitor leaves it, and again as they fix it
  Object.keys(rules).forEach(function (name) {
    var field = form.elements[name];
    field.addEventListener('blur', function () { checkField(field); });
    field.addEventListener('input', function () {
      if (field.getAttribute('aria-invalid') === 'true') checkField(field);
    });
  });

  /* ---------- Sending ---------- */
  function readForm() {
    return {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      phone: form.elements.phone.value.trim(),
      service: form.elements.service.value,
      message: form.elements.message.value.trim()
    };
  }

  // The message written out as plain text, used by email and WhatsApp
  function messageText(data) {
    return data.message +
      '\n\nName: ' + data.name +
      '\nEmail: ' + data.email +
      (data.phone ? '\nPhone: ' + data.phone : '') +
      '\nService: ' + data.service;
  }

  function openWhatsApp(data) {
    var url = TechNova.whatsappLink('Hello TechNova, my name is ' + data.name + '.\n\n' + messageText(data));
    var opened = window.open(url, '_blank');
    if (!opened) window.location.href = url;
    showStatus('WhatsApp should open with your message ready. Press send in WhatsApp to reach us.', 'success');
  }

  function openEmailApp(data) {
    var subject = 'Project enquiry: ' + data.service + ' (' + data.name + ')';
    var body = messageText(data);
    window.location.href = 'mailto:' + companyEmail +
      '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    showStatus('Your email app should open with the message ready to send. If nothing opens, email us at ' + companyEmail + '.', 'info');
  }

  function sendToEndpoint(data) {
    emailButton.disabled = true;
    emailButton.textContent = 'Sending…';

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Request failed');
        form.reset();
        showStatus('Message sent. Thanks, ' + data.name + '. We will reply within one business day.', 'success');
      })
      .catch(function () {
        showStatus('Your message was not sent. Check your connection and try again, or email ' + companyEmail + '.', 'error');
      })
      .then(function () {
        emailButton.disabled = false;
        emailButton.textContent = 'Send by email';
      });
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    status.hidden = true;

    var invalid = Object.keys(rules)
      .map(function (name) { return form.elements[name]; })
      .filter(function (field) { return !checkField(field); });
    if (invalid.length) {
      invalid[0].focus();
      return;
    }

    var data = readForm();
    var viaWhatsApp = event.submitter && event.submitter.value === 'whatsapp';
    if (viaWhatsApp) openWhatsApp(data);
    else if (FORM_ENDPOINT) sendToEndpoint(data);
    else openEmailApp(data);
  });
})();
