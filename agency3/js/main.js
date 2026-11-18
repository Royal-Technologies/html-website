/**
 * CyberFortress — main.js
 * Author: Royal Technologies
 */

document.addEventListener('DOMContentLoaded', function () {

  /* ── 1. HEADER SCROLL SHADOW ───────────────────────── */
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── 2. MOBILE MENU TOGGLE ─────────────────────────── */
  const navIcon = document.getElementById('navigation-icon');
  const desktopMenu = document.querySelector('.desktopmenu');

  if (navIcon && desktopMenu) {
    navIcon.addEventListener('click', () => {
      navIcon.classList.toggle('active');
      desktopMenu.classList.toggle('active');
    });
  }

  /* ── 3. MOBILE SUBMENU TOGGLE ──────────────────────── */
  const hasDropdowns = document.querySelectorAll('.nav-menu > li > a');
  hasDropdowns.forEach(link => {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 1024) {
        const parent = this.closest('li');
        if (parent.querySelector('.sub-menu')) {
          e.preventDefault();
          parent.classList.toggle('open');
        }
      }
    });
  });

  /* ── 4. CLOSE MENU ON OUTSIDE CLICK ────────────────── */
  document.addEventListener('click', function (e) {
    if (navIcon && desktopMenu) {
      if (!navIcon.contains(e.target) && !desktopMenu.contains(e.target)) {
        navIcon.classList.remove('active');
        desktopMenu.classList.remove('active');
      }
    }
  });

  /* ── 5. SMOOTH SCROLL ──────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = header ? header.offsetHeight + 16 : 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });

        /* also close mobile menu if open */
        if (navIcon) navIcon.classList.remove('active');
        if (desktopMenu) desktopMenu.classList.remove('active');
      }
    });
  });

  /* ── 6. ANIMATED COUNTERS ──────────────────────────── */
  function animateCounter(el, target, suffix, duration) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(start).toLocaleString() + suffix;
    }, 16);
  }

  const counterEls = document.querySelectorAll('[data-count]');
  if (counterEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          const target = parseFloat(entry.target.dataset.count);
          const suffix = entry.target.dataset.suffix || '';
          animateCounter(entry.target, target, suffix, 1800);
        }
      });
    }, { threshold: 0.4 });

    counterEls.forEach(el => observer.observe(el));
  }

  /* ── 7. FORM SUBMIT → MODAL ────────────────────────── */
  const auditForm = document.getElementById('auditForm');
  const auditModal = document.getElementById('auditModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (auditForm && auditModal) {
    auditForm.addEventListener('submit', function (e) {
      e.preventDefault();
      auditModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeModalBtn && auditModal) {
    closeModalBtn.addEventListener('click', () => {
      auditModal.classList.remove('active');
      document.body.style.overflow = '';
      if (auditForm) auditForm.reset();
    });
  }

  if (auditModal) {
    auditModal.addEventListener('click', function (e) {
      if (e.target === auditModal) {
        auditModal.classList.remove('active');
        document.body.style.overflow = '';
        if (auditForm) auditForm.reset();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && auditModal.classList.contains('active')) {
        auditModal.classList.remove('active');
        document.body.style.overflow = '';
        if (auditForm) auditForm.reset();
      }
    });
  }

  /* ── 8. RADAR: runs via CSS animation (no JS needed) ─ */

});
