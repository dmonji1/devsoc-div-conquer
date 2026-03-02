/* ==========================================================
   SU Computer Science — Research Page
   research.js: Research area filter chips
   ========================================================== */

(function () {
  'use strict';

  const grid      = document.getElementById('research-grid');
  const noResults = document.getElementById('research-no-results');
  const chips     = document.querySelectorAll('.research-filter .filter-chip');

  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.research-area-card'));

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      const filter = chip.dataset.filter;

      // Update active chip
      chips.forEach(function (c) { c.classList.remove('filter-chip--active'); });
      chip.classList.add('filter-chip--active');

      // Show/hide cards
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
