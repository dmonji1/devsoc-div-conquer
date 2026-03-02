/* ==========================================================
   SU Computer Science — Staff Page
   staff.js: Live search + research area filter
   ========================================================== */

(function () {
  'use strict';

  const grid        = document.getElementById('staff-grid');
  const searchInput = document.getElementById('staff-search');
  const countNum    = document.getElementById('staff-count-num');
  const noResults   = document.getElementById('staff-no-results');
  const chips       = document.querySelectorAll('.filter-chip');

  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.staff-card'));

  let activeFilter = 'all';
  let searchQuery  = '';

  /* --------------------------------------------------------
     Core filter function
     -------------------------------------------------------- */
  function applyFilters() {
    let visible = 0;

    cards.forEach(function (card) {
      const categories = card.dataset.categories || '';
      const name       = card.dataset.name || '';

      const matchesFilter =
        activeFilter === 'all' || categories.includes(activeFilter);

      const matchesSearch =
        searchQuery === '' ||
        name.includes(searchQuery) ||
        categories.includes(searchQuery);

      if (matchesFilter && matchesSearch) {
        card.hidden = false;
        visible++;
      } else {
        card.hidden = true;
      }
    });

    // Update count
    countNum.textContent = visible;

    // Show/hide no-results message
    noResults.hidden = visible > 0;
  }

  /* --------------------------------------------------------
     Filter chip clicks
     -------------------------------------------------------- */
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('filter-chip--active'); });
      chip.classList.add('filter-chip--active');
      activeFilter = chip.dataset.filter;
      applyFilters();
    });
  });

  /* --------------------------------------------------------
     Live search (debounced)
     -------------------------------------------------------- */
  let debounceTimer;
  searchInput.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      searchQuery = searchInput.value.trim().toLowerCase();
      applyFilters();
    }, 180);
  });

  // Initial count on load
  applyFilters();
})();
