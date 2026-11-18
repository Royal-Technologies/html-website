/**
 * BoltSteel Contractors - Main JavaScript
 * Author: Royal Technologies
 */

document.addEventListener('DOMContentLoaded', function () {
  // --- Mobile Drawer Menu ---
  const navIcon = document.getElementById('navigation-icon');
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileBackdrop');
  const drawerClose = document.getElementById('mobileDrawerClose');

  function openDrawer() {
    if (drawer && backdrop) {
      drawer.classList.add('active');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (drawer && backdrop) {
      drawer.classList.remove('active');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (navIcon) {
    navIcon.addEventListener('click', openDrawer);
  }
  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }
  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }

  // Mobile submenu accordion
  const mobileDropdowns = document.querySelectorAll('.mobile-royalmenu .has-dropdown > a');
  mobileDropdowns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const parent = this.parentElement;
      const sub = parent.querySelector('.sub-menu');
      if (sub) {
        sub.classList.toggle('open');
      }
    });
  });

  // Close drawer when link clicked
  const mobileLinks = document.querySelectorAll('.mobile-royalmenu a:not(.dropdown-toggle)');
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeDrawer);
  });

  // --- Sticky Navigation on Scroll ---
  const navWrapper = document.querySelector('.nav-wrapper');
  window.addEventListener('scroll', function () {
    if (navWrapper) {
      if (window.scrollY > 100) {
        navWrapper.classList.add('scrolled');
      } else {
        navWrapper.classList.remove('scrolled');
      }
    }
  });

  // --- Portfolio Filter ---
  const filterBtns = document.querySelectorAll('.portfolio-filters .filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-grid .portfolio-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      portfolioItems.forEach(function (item) {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // --- Quote Form Submit Handler ---
  const quoteForm = document.getElementById('boltQuoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
      submitBtn.disabled = true;

      setTimeout(function () {
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Request Received!';
        submitBtn.style.background = '#16a34a';

        alert('Thank you! Your quote request has been received. A BoltSteel Project Engineer will contact you within 24 hours.');
        quoteForm.reset();

        setTimeout(function () {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 1000);
    });
  }

  // --- Smooth Scroll for Internal Anchors ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});
