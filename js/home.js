/* ==========================================================
   home.js — Home page specific behaviour
   Handles: hero parallax/load animation, stat counters.
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeroLoad();
  initParticleNetwork();
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
   Particle / graph network animation
   Canvas sits above the hero overlay. Nodes drift slowly and
   connect with gold lines when within range — representing
   graphs, networks, and neural architectures.
   ---------------------------------------------------------- */
function initParticleNetwork() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let rafId;

  const CONFIG = {
    nodeColor:    'rgba(255, 255, 255, 0.55)',
    lineColor:    [202, 162, 88],
    nodeRadius:   { min: 1.2, max: 2.8 },
    speed:        0.38,
    connectDist:  150,
    density:      13000,
  };

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    const count = Math.max(
      20,
      Math.floor((canvas.width * canvas.height) / CONFIG.density)
    );
    particles = Array.from({ length: count }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * CONFIG.speed,
      vy: (Math.random() - 0.5) * CONFIG.speed,
      r:  CONFIG.nodeRadius.min +
          Math.random() * (CONFIG.nodeRadius.max - CONFIG.nodeRadius.min),
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections first (under nodes)
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.connectDist) {
          const alpha = (1 - dist / CONFIG.connectDist) * 0.28;
          const [r, g, b] = CONFIG.lineColor;
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.lineWidth   = 0.75;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (const p of particles) {
      ctx.fillStyle = CONFIG.nodeColor;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      // Wrap edges (seamless, no bouncing)
      if (p.x < -10)                p.x = canvas.width  + 10;
      if (p.x > canvas.width  + 10) p.x = -10;
      if (p.y < -10)                p.y = canvas.height + 10;
      if (p.y > canvas.height + 10) p.y = -10;
    }

    rafId = requestAnimationFrame(draw);
  }

  // Pause when tab is hidden to save resources
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      rafId = requestAnimationFrame(draw);
    }
  });

  // Debounced resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cancelAnimationFrame(rafId);
      resize();
      createParticles();
      draw();
    }, 200);
  });

  resize();
  createParticles();
  draw();
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
