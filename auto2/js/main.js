/* ==========================================================================
   GearShift Auto Clinic - Main JavaScript
   Features:
   - Sticky Header on scroll (.header.scrolled)
   - Mobile #navigation-icon toggle & drawer menu
   - Smooth scroll for internal links
   - Form submit handlers (Quick Booking & Full Booking) with success alerts
   - Package / Service Quick Pre-fill
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Sticky Header on Scroll
  const header = document.querySelector('.header');
  function checkHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', checkHeaderScroll);
  checkHeaderScroll();

  // 2. Mobile Menu Navigation (#navigation-icon & Drawer)
  const navIcon = document.getElementById('navigation-icon');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const mobileSubmenuToggles = document.querySelectorAll('.mobile-submenu-toggle');

  function openMobileNav() {
    if (navIcon) navIcon.classList.add('open');
    if (mobileMenu) mobileMenu.classList.add('open');
    if (mobileBackdrop) mobileBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (navIcon) navIcon.classList.remove('open');
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (mobileBackdrop) mobileBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (navIcon) {
    navIcon.addEventListener('click', function (e) {
      e.stopPropagation();
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileNav);
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileNav);
  }

  mobileSubmenuToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      const parent = toggle.closest('li');
      const submenu = parent ? parent.querySelector('.mobile-submenu') : null;
      const icon = toggle.querySelector('i');
      if (submenu) {
        submenu.classList.toggle('open');
        if (icon) {
          icon.style.transform = submenu.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }
    });
  });

  const mobileNavLinks = document.querySelectorAll('.mobile-menu a:not(.mobile-submenu-toggle)');
  mobileNavLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  // 3. Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = header ? header.offsetHeight : 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. Quick Hero Booking Form Handler
  const quickBookingForm = document.getElementById('quickBookingForm');
  if (quickBookingForm) {
    quickBookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = quickBookingForm.querySelector('button[type="submit"]');
      const origText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Reserving Bay...';

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Reserved!';
        alert('Thank you! Your service bay has been reserved. Our service advisor will call you within 15 minutes to confirm drop-off details.');
        quickBookingForm.reset();
        setTimeout(function () {
          submitBtn.innerHTML = origText;
        }, 2500);
      }, 800);
    });
  }

  // 5. Full Service Booking Form Handler (.royalform)
  const fullBookingForm = document.getElementById('serviceBookingForm');
  const bookingAlert = document.getElementById('bookingAlert');

  if (fullBookingForm) {
    fullBookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = fullBookingForm.querySelector('button[type="submit"]');
      const origText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Scheduling Appointment...';

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origText;
        if (bookingAlert) {
          bookingAlert.className = 'form-alert success';
          bookingAlert.style.display = 'block';
          bookingAlert.innerHTML = '<i class="fa-solid fa-circle-check"></i> <strong>Appointment Confirmed!</strong> We have received your booking request. Our ASE Master Technician will review your vehicle specifications before check-in.';
          bookingAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          fullBookingForm.reset();
        }
      }, 900);
    });
  }

  // 6. Autofill Service / Package when clicking cards
  const selectServiceBtns = document.querySelectorAll('.select-service-btn');
  selectServiceBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const serviceName = this.getAttribute('data-service') || '';
      const fullSelect = document.getElementById('serviceType');
      if (fullSelect && serviceName) {
        for (let i = 0; i < fullSelect.options.length; i++) {
          if (fullSelect.options[i].text.toLowerCase().includes(serviceName.toLowerCase()) || 
              fullSelect.options[i].value.toLowerCase().includes(serviceName.toLowerCase())) {
            fullSelect.selectedIndex = i;
            break;
          }
        }
      }
    });
  });

  // 7. Set default min date on date pickers to today
  const todayStr = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(function (dateInput) {
    dateInput.min = todayStr;
  });
});
