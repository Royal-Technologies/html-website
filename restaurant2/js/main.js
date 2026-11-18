/* ============================================================
   BrewBloom Coffee & Bakery — main.js
   Features: sticky nav, mobile hamburger, dropdown, smooth scroll, form
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Sticky Header on Scroll ---------- */
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ---------- Mobile Hamburger Toggle ---------- */
  const navIcon = document.getElementById('navigation-icon');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (navIcon && mobileMenu) {
    navIcon.addEventListener('click', function () {
      navIcon.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      const expanded = navIcon.classList.contains('open');
      navIcon.setAttribute('aria-expanded', expanded);
    });
  }

  /* ---------- Mobile Sub-Menu Toggles ---------- */
  const mobileParents = document.querySelectorAll('.mobile-menu .has-sub > a');
  mobileParents.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const sub = link.nextElementSibling;
      if (sub) {
        sub.style.display = sub.style.display === 'block' ? 'none' : 'block';
        const icon = link.querySelector('.arrow');
        if (icon) icon.style.transform = sub.style.display === 'block' ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    });
  });

  /* ---------- Smooth Scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        // Close mobile menu if open
        if (mobileMenu && mobileMenu.classList.contains('open')) {
          mobileMenu.classList.remove('open');
          if (navIcon) {
            navIcon.classList.remove('open');
            navIcon.setAttribute('aria-expanded', false);
          }
        }
        const headerHeight = header ? header.offsetHeight : 0;
        const topbarHeight = document.querySelector('.headertop') ? document.querySelector('.headertop').offsetHeight : 0;
        const offset = headerHeight + topbarHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Newsletter Form ---------- */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value.trim();
      if (!email) {
        alert('Please enter a valid email address.');
        return;
      }
      alert('Thank you for subscribing! We\'ll keep you updated with our latest specials and offers.');
      newsletterForm.reset();
    });
  }

  /* ---------- Contact Form ---------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]').value.trim();
      if (!name) {
        alert('Please enter your name.');
        return;
      }
      alert('Thank you, ' + name + '! Your message has been received. We\'ll get back to you within 24 hours.');
      contactForm.reset();
    });
  }

  /* ---------- Delivery CTA Buttons ---------- */
  document.querySelectorAll('.delivery-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const platform = btn.dataset.platform || 'your preferred delivery app';
      alert('Redirecting you to ' + platform + '. Enjoy your BrewBloom order!');
    });
  });

  /* ---------- Scroll Reveal (simple fade-in) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

})();
