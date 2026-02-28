/* ==========================================================
   components.js — Shared nav + footer injection
   Runs on every page. Injects HTML into #nav-placeholder
   and #footer-placeholder.

   Logo paths use %20 encoding for spaces in asset filenames.
   ========================================================== */

const LOGO_LIGHT = 'assets/SU_logo_and_slogan/SU_logo_and_slogan/SU_primary%20logo/RGB/Gold%20and%20white%20RGB/Png/SU_goldwhite_horizontal_caa258.png';
const LOGO_DARK  = 'assets/SU_logo_and_slogan/SU_logo_and_slogan/SU_primary%20logo/RGB/Gold%20and%20maroon%20RGB/Png/SU_horizontal_caa258.png';

const NAV_HTML = `
<nav class="navbar navbar--transparent" id="navbar" role="navigation" aria-label="Main navigation">
  <div class="navbar__inner">

    <!-- Brand: SU logo + department lockup -->
    <a href="index.html" class="navbar__brand" aria-label="SU Department of Computer Science – Home">
      <img src="${LOGO_LIGHT}" alt="Stellenbosch University" class="navbar__logo navbar__logo--light" height="42">
      <img src="${LOGO_DARK}"  alt="Stellenbosch University" class="navbar__logo navbar__logo--dark"  height="42">
      <div class="navbar__divider" aria-hidden="true"></div>
      <div class="navbar__dept">
        <span class="navbar__faculty">Faculty of Science</span>
        <span class="navbar__deptname">Computer Science</span>
      </div>
    </a>

    <!-- Desktop navigation links -->
    <nav class="navbar__nav" aria-label="Site sections">
      <a href="about.html"           class="navbar__link">About</a>
      <a href="research.html"        class="navbar__link">Research</a>
      <a href="programmes.html"      class="navbar__link">Programmes</a>
      <a href="staff.html"           class="navbar__link">People</a>
      <a href="news.html"            class="navbar__link">News</a>
      <a href="events.html"          class="navbar__link">Events</a>
    </nav>

    <a href="contact.html" class="navbar__cta">Contact Us</a>

    <!-- Hamburger button (mobile) -->
    <button
      class="navbar__hamburger"
      id="hamburger"
      aria-label="Toggle navigation menu"
      aria-expanded="false"
      aria-controls="mobile-menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

  </div>

  <!-- Mobile menu -->
  <div class="navbar__mobile-menu" id="mobile-menu" aria-hidden="true" role="dialog" aria-label="Navigation menu">
    <a href="about.html"           class="navbar__mobile-link">About</a>
    <a href="research.html"        class="navbar__mobile-link">Research</a>
    <a href="programmes.html"      class="navbar__mobile-link">Programmes</a>
    <a href="staff.html"           class="navbar__mobile-link">People</a>
    <a href="news.html"            class="navbar__mobile-link">News</a>
    <a href="events.html"          class="navbar__mobile-link">Events</a>
    <a href="student-resources.html" class="navbar__mobile-link">Student Resources</a>
    <a href="contact.html"         class="navbar__mobile-cta">Contact Us</a>
  </div>
</nav>
`;

const FOOTER_LOGO = LOGO_LIGHT;

const FOOTER_HTML = `
<footer class="footer" role="contentinfo">
  <div class="container">
    <div class="footer__inner">

      <!-- Brand column -->
      <div class="footer__brand">
        <img src="${FOOTER_LOGO}" alt="Stellenbosch University" class="footer__logo">
        <p class="footer__tagline">
          Advancing knowledge in service of society.<br>
          Shaping Africa's digital future.
        </p>
        <div class="footer__social" aria-label="Social media links">
          <a href="#" class="footer__social-link" aria-label="X / Twitter">
            <span class="material-icons" aria-hidden="true" style="font-size:17px">share</span>
          </a>
          <a href="#" class="footer__social-link" aria-label="LinkedIn">
            <span class="material-icons" aria-hidden="true" style="font-size:17px">business</span>
          </a>
          <a href="#" class="footer__social-link" aria-label="YouTube">
            <span class="material-icons" aria-hidden="true" style="font-size:17px">play_circle</span>
          </a>
        </div>
      </div>

      <!-- Explore links -->
      <div class="footer__col">
        <h3 class="footer__col-title">Explore</h3>
        <ul class="footer__links">
          <li><a href="about.html"            class="footer__link">About the Department</a></li>
          <li><a href="research.html"         class="footer__link">Research</a></li>
          <li><a href="staff.html"            class="footer__link">Academic Staff</a></li>
          <li><a href="programmes.html"       class="footer__link">Programmes</a></li>
          <li><a href="courses.html"          class="footer__link">Course Catalogue</a></li>
          <li><a href="events.html"           class="footer__link">Events &amp; Seminars</a></li>
        </ul>
      </div>

      <!-- Students links -->
      <div class="footer__col">
        <h3 class="footer__col-title">Students</h3>
        <ul class="footer__links">
          <li><a href="student-resources.html" class="footer__link">Student Resources</a></li>
          <li><a href="programmes.html"         class="footer__link">Undergraduate</a></li>
          <li><a href="programmes.html#honours" class="footer__link">Honours</a></li>
          <li><a href="programmes.html#masters" class="footer__link">Masters</a></li>
          <li><a href="programmes.html#phd"     class="footer__link">PhD</a></li>
          <li><a href="news.html"               class="footer__link">News &amp; Achievements</a></li>
        </ul>
      </div>

      <!-- Contact -->
      <div class="footer__col">
        <h3 class="footer__col-title">Contact</h3>
        <div class="footer__contact-item">
          <span class="material-icons" aria-hidden="true">location_on</span>
          <address style="font-style:normal">
            Department of Computer Science<br>
            Stellenbosch University<br>
            Stellenbosch, 7600<br>
            South Africa
          </address>
        </div>
        <div class="footer__contact-item">
          <span class="material-icons" aria-hidden="true">phone</span>
          <a href="tel:+27218084200" class="footer__link" style="font-size:inherit">+27 (0)21 808 4200</a>
        </div>
        <div class="footer__contact-item">
          <span class="material-icons" aria-hidden="true">email</span>
          <a href="mailto:cs@sun.ac.za" class="footer__link" style="font-size:inherit">cs@sun.ac.za</a>
        </div>
      </div>

    </div><!-- /footer__inner -->

    <!-- Bottom bar -->
    <div class="footer__bottom">
      <p class="footer__copyright">
        &copy; 2025 Stellenbosch University Department of Computer Science. All rights reserved.
      </p>
      <nav class="footer__bottom-links" aria-label="Legal links">
        <a href="#" class="footer__bottom-link">Privacy Policy</a>
        <a href="#" class="footer__bottom-link">Accessibility</a>
        <a href="#" class="footer__bottom-link">Sitemap</a>
      </nav>
    </div>
  </div>
</footer>
`;

/* ----------------------------------------------------------
   Injection
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const navEl    = document.getElementById('nav-placeholder');
  const footerEl = document.getElementById('footer-placeholder');

  if (navEl)    navEl.innerHTML    = NAV_HTML;
  if (footerEl) footerEl.innerHTML = FOOTER_HTML;

  // Highlight active page link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link, .navbar__mobile-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.style.color = 'var(--gold)';
      link.setAttribute('aria-current', 'page');
    }
  });
});
