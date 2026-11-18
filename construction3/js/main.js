/**
 * RoofGuard Pro - Main JavaScript
 * Before & After Compare Slider + Mobile Navigation + Quote Form Handler
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

  if (navIcon) navIcon.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  document.querySelectorAll('.mobile-royalmenu .has-dropdown > a').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const sub = this.parentElement.querySelector('.sub-menu');
      if (sub) sub.classList.toggle('open');
    });
  });

  document.querySelectorAll('.mobile-royalmenu a:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // --- Sticky Navigation ---
  const navWrapper = document.querySelector('.nav-wrapper');
  window.addEventListener('scroll', function () {
    if (navWrapper) {
      if (window.scrollY > 90) {
        navWrapper.classList.add('scrolled');
      } else {
        navWrapper.classList.remove('scrolled');
      }
    }
  });

  // --- Before & After Renovation Slider (royalimagecompare) ---
  const compareContainer = document.getElementById('roofCompareSlider');
  const compareRange = document.getElementById('compareRange');

  if (compareContainer && compareRange) {
    function updateCompare() {
      compareContainer.style.setProperty('--pos', compareRange.value + '%');
    }
    compareRange.addEventListener('input', updateCompare);
    compareRange.addEventListener('change', updateCompare);
    updateCompare();
  }

  // --- Upload Photo File Name Display ---
  const photoInput = document.getElementById('damagePhoto');
  const photoNameOut = document.getElementById('uploadFilename');
  if (photoInput && photoNameOut) {
    photoInput.addEventListener('change', function () {
      if (this.files && this.files.length > 0) {
        const names = Array.from(this.files).map(f => f.name).join(', ');
        photoNameOut.textContent = 'Selected: ' + names;
      } else {
        photoNameOut.textContent = '';
      }
    });
  }

  // --- Free Quote Form Handler ---
  const quoteForm = document.getElementById('roofQuoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = quoteForm.querySelector('button[type="submit"]');
      const originalHtml = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Scheduling Inspection...';
      btn.disabled = true;

      setTimeout(function () {
        btn.innerHTML = '<i class="fa-solid fa-check-circle"></i> Request Submitted!';
        btn.style.background = '#16a34a';
        alert('Thank you! Your free roofing & renovation quote request is confirmed. A RoofGuard Pro specialist will call you shortly.');
        quoteForm.reset();
        if (photoNameOut) photoNameOut.textContent = '';

        setTimeout(function () {
          btn.innerHTML = originalHtml;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 900);
    });
  }

  // --- Smooth Scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const el = document.querySelector(targetId);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});
