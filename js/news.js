/* ==========================================================
   SU Computer Science — News Page
   news.js: Category filter
   ========================================================== */
(function () {
  'use strict';

  const featured  = document.querySelector('.news-featured');
  const grid      = document.getElementById('news-grid');
  const noResults = document.getElementById('news-no-results');
  const countNum  = document.getElementById('news-count-num');
  const chips     = document.querySelectorAll('.news-filter-bar .filter-chip');

  if (!grid) return;

  const items = Array.from(grid.querySelectorAll('.news-item'));

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      const filter = chip.dataset.filter;

      chips.forEach(function (c) { c.classList.remove('filter-chip--active'); });
      chip.classList.add('filter-chip--active');

      // Featured article
      if (featured) {
        featured.hidden = filter !== 'all' && featured.dataset.category !== filter;
      }

      let visible = 0;
      items.forEach(function (item) {
        const match = filter === 'all' || item.dataset.category === filter;
        item.hidden = !match;
        if (match) visible++;
      });

      if (featured && !featured.hidden) visible++;
      noResults.hidden = visible > 0;
      countNum.textContent = visible;
    });
  });
})();
