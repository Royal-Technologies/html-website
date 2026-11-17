/* LifeCare General Hospital - Main JS */
(function () {
  'use strict';

  /* ── Sticky Header ── */
  const header = document.querySelector('.header');
  const headertop = document.querySelector('.headertop');
  function handleScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ── Mobile Menu Toggle ── */
  const navIcon = document.getElementById('navigation-icon');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (navIcon && mobileMenu) {
    navIcon.addEventListener('click', () => {
      navIcon.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });
  }

  /* ── Mobile Dropdown ── */
  document.querySelectorAll('.m-dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      toggle.classList.toggle('open');
      const sub = toggle.nextElementSibling;
      if (sub && sub.classList.contains('mobile-sub')) {
        sub.classList.toggle('open');
      }
    });
  });

  /* ── Smooth Scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        // Close mobile menu
        if (mobileMenu) mobileMenu.classList.remove('open');
        if (navIcon) navIcon.classList.remove('active');
      }
    });
  });

  /* ── Counter Animation ── */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    el.classList.add('counting');
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
    }, 16);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counting')) {
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter-num').forEach(el => counterObserver.observe(el));

  /* ── Scroll Reveal ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── Appointment Form ── */
  const apptForm = document.getElementById('appointment-form');
  const apptModal = document.getElementById('appt-modal');
  const heroForm = document.getElementById('hero-quick-form');

  function showModal() {
    if (apptModal) {
      apptModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  if (apptForm) {
    apptForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showModal();
    });
  }

  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showModal();
    });
  }

  /* ── Modal Close ── */
  document.querySelectorAll('.modal-close, .modal-overlay').forEach(el => {
    el.addEventListener('click', () => {
      if (apptModal) {
        apptModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  /* ── Active nav on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.royalmenu > ul > li');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(li => {
      const a = li.querySelector('a');
      li.classList.remove('active');
      if (a && a.getAttribute('href') === '#' + current) {
        li.classList.add('active');
      }
    });
  }, { passive: true });

  /* ── Testimonials auto-scroll (simple) ── */
  // No auto-scroll, just static grid

})();
