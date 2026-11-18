// AquaFlow Pro — main.js

document.addEventListener('DOMContentLoaded', function () {
  // Mobile Nav Toggle
  const toggleBtn = document.getElementById('navigation-icon');
  const mobileNav = document.getElementById('mobileNav');
  const mobileClose = document.querySelector('.mobile-close');

  if (toggleBtn && mobileNav) {
    toggleBtn.addEventListener('click', function () {
      mobileNav.classList.add('active');
    });
  }

  if (mobileClose && mobileNav) {
    mobileClose.addEventListener('click', function () {
      mobileNav.classList.remove('active');
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav) mobileNav.classList.remove('active');
    });
  });

  // Sticky Header
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 80) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Form Submission
  const form = document.querySelector('.royalform form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('.submit-btn');
      const originalText = btn.textContent;
      btn.textContent = '✓ Emergency Dispatch Requested!';
      btn.style.background = '#0284c7';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        form.reset();
      }, 3500);
    });
  }

  // IntersectionObserver Reveal Animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.service-card, .portfolio-card, .pricing-card, .team-card, .review-card, .timeline-item').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
});
