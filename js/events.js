/* ==========================================================
   SU Computer Science — Events Page
   events.js: Category filter
   ========================================================== */
(function () {
  'use strict';

  const list      = document.getElementById('events-list');
  const noResults = document.getElementById('events-no-results');
  const chips     = document.querySelectorAll('.events-filter-bar .filter-chip');

  if (!list) return;

  const cards = Array.from(list.querySelectorAll('.event-card'));

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      const filter = chip.dataset.filter;

      chips.forEach(function (c) { c.classList.remove('filter-chip--active'); });
      chip.classList.add('filter-chip--active');

      let visible = 0;
      cards.forEach(function (card) {
        const match = filter === 'all' || card.dataset.category === filter;
        card.hidden = !match;
        if (match) visible++;
      });

      noResults.hidden = visible > 0;
    });
  });
})();
