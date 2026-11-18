/**
 * Wanderlux Travels - JavaScript (travel1)
 * Royal Elementor Theme & Addons Compatible
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Sticky Header
  const header = document.querySelector('.header');
  function handleScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // 2. Mobile Menu Toggle
  const navIcon = document.getElementById('navigation-icon');
  const mobileMenu = document.getElementById('mobile-menu');

  if (navIcon && mobileMenu) {
    navIcon.addEventListener('click', function () {
      navIcon.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Mobile dropdown toggle
    const mobileDropdownToggles = mobileMenu.querySelectorAll('.has-dropdown > a');
    mobileDropdownToggles.forEach(function (toggle) {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        const dropdown = toggle.nextElementSibling;
        if (dropdown && dropdown.classList.contains('dropdown')) {
          dropdown.classList.toggle('mobile-open');
          const arrow = toggle.querySelector('.arrow');
          if (arrow) {
            arrow.textContent = dropdown.classList.contains('mobile-open') ? '▲' : '▼';
          }
        }
      });
    });

    // Close mobile menu on clicking any regular navigation link
    const mobileLinks = mobileMenu.querySelectorAll('a:not(.has-dropdown > a)');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navIcon.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Smooth Anchor Scrolling with Header Offset
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElem.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. Animated Counters (Stats Bar)
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  if (statNumbers.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    statNumbers.forEach(function (el) {
      observer.observe(el);
    });
  }

  function animateCount(el) {
    const target = parseFloat(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const isDecimal = target % 1 !== 0;
    const duration = 2000;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      if (isDecimal) {
        el.textContent = current.toFixed(1) + suffix;
      } else {
        el.textContent = Math.floor(current).toLocaleString() + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  // 5. Hero Search Widget
  const searchForm = document.getElementById('dest-search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const dest = document.getElementById('search-dest').value;
      const destSection = document.getElementById('destinations');
      if (destSection) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = destSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }

  // 6. Booking Inquiry Form Submission
  const bookingForm = document.getElementById('booking-inquiry-form');
  const bookingAlert = document.getElementById('booking-success-alert');

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing Inquiry...';

      setTimeout(function () {
        bookingForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        if (bookingAlert) {
          bookingAlert.style.display = 'block';
          bookingAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          setTimeout(function () {
            bookingAlert.style.display = 'none';
          }, 6000);
        }
      }, 1200);
    });
  }
});
