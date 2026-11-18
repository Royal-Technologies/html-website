/* =====================================================
   AzureSands Resort – main.js
   ===================================================== */

(function () {
  'use strict';

  /* ── Sticky Header on Scroll ── */
  const header = document.querySelector('.header');
  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ── Mobile Hamburger Toggle ── */
  const navIcon = document.getElementById('navigation-icon');
  const mobileNav = document.querySelector('.mobile-nav');

  if (navIcon && mobileNav) {
    navIcon.addEventListener('click', function () {
      navIcon.classList.toggle('open');
      mobileNav.classList.toggle('open');
      const expanded = navIcon.classList.contains('open');
      navIcon.setAttribute('aria-expanded', expanded);
    });
  }

  /* ── Mobile Dropdown Toggles ── */
  const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
  mobileDropdownToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      const parent = this.closest('.has-dropdown');
      if (!parent) return;
      const dropdown = parent.querySelector('.mobile-dropdown');
      if (!dropdown) return;
      const isOpen = dropdown.classList.toggle('open');
      dropdown.style.display = isOpen ? 'block' : 'none';
      const chevron = this.querySelector('.fa-chevron-down');
      if (chevron) {
        chevron.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0)';
      }
    });
  });

  /* ── Smooth Scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const headerH = header ? header.offsetHeight : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 12;
      window.scrollTo({ top: top, behavior: 'smooth' });
      /* close mobile nav if open */
      if (mobileNav && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        if (navIcon) {
          navIcon.classList.remove('open');
          navIcon.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  /* ── Availability Check Form Handler ── */
  const availForm = document.getElementById('availability-form');
  if (availForm) {
    availForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const checkIn  = document.getElementById('checkin')  ? document.getElementById('checkin').value  : '';
      const checkOut = document.getElementById('checkout') ? document.getElementById('checkout').value : '';
      const guests   = document.getElementById('guests')   ? document.getElementById('guests').value   : '';

      if (!checkIn || !checkOut) {
        showToast('Please select both check-in and check-out dates.', 'warning');
        return;
      }
      if (new Date(checkOut) <= new Date(checkIn)) {
        showToast('Check-out date must be after check-in date.', 'warning');
        return;
      }
      showToast(
        'Availability confirmed! We have rooms available for ' + guests + ' guest(s) from ' +
        formatDate(checkIn) + ' to ' + formatDate(checkOut) + '. Please fill out the booking form below.',
        'success'
      );
      const bookingSection = document.querySelector('.royalform');
      if (bookingSection) {
        setTimeout(function () {
          const headerH = header ? header.offsetHeight : 80;
          const top = bookingSection.getBoundingClientRect().top + window.scrollY - headerH - 12;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }, 1200);
      }
    });

    /* Set min date to today */
    const today = new Date().toISOString().split('T')[0];
    const checkinInput  = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    if (checkinInput)  checkinInput.min  = today;
    if (checkoutInput) checkoutInput.min = today;
    if (checkinInput && checkoutInput) {
      checkinInput.addEventListener('change', function () {
        checkoutInput.min = this.value;
      });
    }
  }

  /* ── Booking Inquiry Form Handler ── */
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    /* Sync dates from availability form */
    const availCheckin  = document.getElementById('checkin');
    const availCheckout = document.getElementById('checkout');
    const bookCheckin   = document.getElementById('book-checkin');
    const bookCheckout  = document.getElementById('book-checkout');
    if (availCheckin && bookCheckin) {
      availCheckin.addEventListener('change', function () {
        bookCheckin.value = this.value;
      });
    }
    if (availCheckout && bookCheckout) {
      availCheckout.addEventListener('change', function () {
        bookCheckout.value = this.value;
      });
    }

    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('book-name') ? document.getElementById('book-name').value.trim() : '';
      if (!name) { showToast('Please enter your full name.', 'warning'); return; }
      showToast(
        'Thank you, ' + name + '! Your reservation request has been received. ' +
        'Our concierge team will contact you within 24 hours to confirm.',
        'success'
      );
      bookingForm.reset();
    });
  }

  /* ── Toast Notification ── */
  function showToast(message, type) {
    type = type || 'info';
    let toast = document.getElementById('royal-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'royal-toast';
      Object.assign(toast.style, {
        position: 'fixed', bottom: '32px', right: '24px', zIndex: '99999',
        maxWidth: '380px', padding: '16px 22px', borderRadius: '4px',
        fontFamily: "'Montserrat', sans-serif", fontSize: '0.85rem', lineHeight: '1.5',
        fontWeight: '500', color: '#fff', boxShadow: '0 6px 24px rgba(0,0,0,0.3)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        opacity: '0', transform: 'translateY(16px)',
        borderLeft: '4px solid',
      });
      document.body.appendChild(toast);
    }
    const colors = { success: { bg: '#064e3b', border: '#10b981' }, warning: { bg: '#451a03', border: '#f59e0b' }, info: { bg: '#0a1628', border: '#0d9488' } };
    const c = colors[type] || colors.info;
    toast.style.backgroundColor = c.bg;
    toast.style.borderLeftColor  = c.border;
    toast.textContent = message;
    toast.style.opacity   = '1';
    toast.style.transform = 'translateY(0)';
    if (toast._timer) clearTimeout(toast._timer);
    toast._timer = setTimeout(function () {
      toast.style.opacity   = '0';
      toast.style.transform = 'translateY(16px)';
    }, 5000);
  }

  /* ── Helper: format date ── */
  function formatDate(str) {
    if (!str) return '';
    const d = new Date(str + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  /* ── Animate elements on scroll (Intersection Observer) ── */
  if ('IntersectionObserver' in window) {
    const animEls = document.querySelectorAll('.fade-up, .room-card, .service-tile, .package-card, .review-card');
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    animEls.forEach(function (el) { io.observe(el); });
  }

  /* ── Active nav link on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.royalmenu > li > a');
  function updateActiveNav() {
    const scrollPos = window.scrollY + (header ? header.offsetHeight : 80) + 60;
    sections.forEach(function (sec) {
      const top    = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        const id = sec.getAttribute('id');
        navLinks.forEach(function (link) {
          const href = link.getAttribute('href');
          link.closest('li').classList.toggle('active', href === '#' + id);
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

})();
