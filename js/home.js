/* ==========================================================
   home.js — Home page specific behaviour
   Handles: hero parallax/load animation, stat counters.
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeroLoad();
  initHeroGrid();
  initStatCounters();
});

/* ----------------------------------------------------------
   Hero: trigger the scale-in animation once the bg image
   has loaded, and apply a subtle parallax on scroll.
   ---------------------------------------------------------- */
function initHeroLoad() {
  const bg = document.querySelector('.hero__bg');
  if (!bg) return;

  // Extract background-image URL from computed styles
  const style  = getComputedStyle(bg);
  const urlStr = style.backgroundImage;
  const match  = urlStr.match(/url\(["']?(.+?)["']?\)/i);

  if (match) {
    const img  = new Image();
    img.onload = () => bg.classList.add('is-loaded');
    img.src    = match[1];
  } else {
    bg.classList.add('is-loaded');
  }

  // Subtle parallax on scroll (only while hero is in view)
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      bg.style.transform = `scale(1) translateY(${scrollY * 0.18}px)`;
    }
  }, { passive: true });
}

/* ----------------------------------------------------------
   Hero grid animation
   Randomly lights cells in a grid overlay — representing
   data, computation, and parallel processing.
   ---------------------------------------------------------- */
function initHeroGrid() {
  const container = document.getElementById('hero-grid');
  if (!container) return;

  const COLS = 12, ROWS = 10;
  const cells = [];

  for (let i = 0; i < COLS * ROWS; i++) {
    const cell = document.createElement('div');
    cell.className = 'hero__grid-cell';
    container.appendChild(cell);
    cells.push(cell);
  }

  function animate() {
    cells.forEach(c => { c.className = 'hero__grid-cell'; });

    const numLit    = Math.floor(Math.random() * 15) + 10;
    const numBright = Math.floor(Math.random() * 5)  + 3;

    const shuffled = [...cells].sort(() => Math.random() - 0.5);
    shuffled.slice(0, numLit).forEach(c => c.classList.add('is-lit'));
    shuffled.slice(numLit, numLit + numBright).forEach(c => c.classList.add('is-bright'));
  }

  animate();
  setInterval(animate, 1800);
}

/* ----------------------------------------------------------
   Stat counters: animate numbers up when they scroll into
   view. Reads target from [data-target] attribute.
   ---------------------------------------------------------- */
function initStatCounters() {
  const stats = document.querySelectorAll('.hero__stat-number[data-target]');
  if (!stats.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const suffix   = el.dataset.suffix || '';
  const duration = 1800; // ms
  const start    = performance.now();

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
