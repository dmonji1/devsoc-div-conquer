/* ==========================================================
   student-resources.js — FAQ accordion
   ========================================================== */
(function () {
  'use strict';

  /* FAQ Accordion
     Each .faq-item__q toggles its sibling .faq-item__a
  --------------------------------------------------------- */
  function initFaqs() {
    const triggers = document.querySelectorAll('.faq-item__q');

    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        toggleFaq(trigger);
      });

      trigger.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleFaq(trigger);
        }
      });
    });
  }

  function toggleFaq(trigger) {
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    const answer = trigger.nextElementSibling;

    if (!answer) return;

    trigger.setAttribute('aria-expanded', String(!isExpanded));
    answer.classList.toggle('is-open', !isExpanded);
  }

  /* Init */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFaqs);
  } else {
    initFaqs();
  }
}());
