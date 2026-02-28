/* ==========================================================
   main.js — Global behaviour
   Runs on every page after components.js.
   Handles: navbar scroll state, mobile menu, reveal animations.
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initMobileMenu();
  initRevealAnimations();
});

/* ----------------------------------------------------------
   Navbar: toggle solid/transparent on scroll
   ---------------------------------------------------------- */
function initNavScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const THRESHOLD = 72;

  function update() {
    if (window.scrollY > THRESHOLD) {
      navbar.classList.remove('navbar--transparent');
      navbar.classList.add('navbar--solid');
    } else {
      navbar.classList.remove('navbar--solid');
      navbar.classList.add('navbar--transparent');
    }
  }

  window.addEventListener('scroll', update, { passive: true });
  update(); // set correct state immediately on page load
}

/* ----------------------------------------------------------
   Mobile menu: open/close hamburger
   ---------------------------------------------------------- */
function initMobileMenu() {
  // Elements are injected by components.js before this runs
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  function open() {
    mobileMenu.classList.add('is-open');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    mobileMenu.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('is-open');
    isOpen ? close() : open();
  });

  // Close on any link click inside mobile menu
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', close));

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) close();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

/* ----------------------------------------------------------
   Reveal animations via IntersectionObserver
   ---------------------------------------------------------- */
function initRevealAnimations() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length || !('IntersectionObserver' in window)) {
    // Fallback: make all visible immediately
    elements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -48px 0px'
  });

  elements.forEach(el => observer.observe(el));
}
