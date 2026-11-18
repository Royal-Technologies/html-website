/**
 * SteakCraft Fine Dining — main.js
 * Features: sticky nav, hamburger, dropdowns, tabs, smooth scroll, form submit with alert
 */

(function () {
  'use strict';

  /* ===================== Sticky Header on Scroll ===================== */
  const header = document.querySelector('.header');
  const heroEl = document.getElementById('hero');

  function handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 60) {
      header && header.classList.add('scrolled');
    } else {
      header && header.classList.remove('scrolled');
    }

    const scrollBtn = document.getElementById('scroll-top');
    if (scrollBtn) {
      if (scrollY > 400) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ===================== Hero Ken-Burns Trigger ===================== */
  if (heroEl) {
    setTimeout(function () {
      heroEl.classList.add('loaded');
    }, 100);
  }

  /* ===================== Mobile Hamburger Toggle ===================== */
  const navIcon = document.getElementById('navigation-icon');
  const deskMenu = document.querySelector('.desktopmenu');
  const overlay = document.querySelector('.nav-overlay');

  function openMenu() {
    navIcon && navIcon.classList.add('open');
    deskMenu && deskMenu.classList.add('open');
    overlay && overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navIcon && navIcon.classList.remove('open');
    deskMenu && deskMenu.classList.remove('open');
    overlay && overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (navIcon) {
    navIcon.addEventListener('click', function () {
      if (this.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navIcon.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  /* ===================== Dropdown Menu Hover / Click ===================== */
  const menuItems = document.querySelectorAll('.royalmenu > li');

  menuItems.forEach(function (item) {
    const link = item.querySelector(':scope > a');
    const dropdown = item.querySelector('.dropdown');

    if (!dropdown) return;

    link && link.addEventListener('click', function (e) {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        const isOpen = item.classList.contains('mobile-open');
        menuItems.forEach(function (other) {
          if (other !== item) other.classList.remove('mobile-open');
        });
        item.classList.toggle('mobile-open', !isOpen);
      }
    });
  });

  /* ===================== Tab Switching (Food Menu) ===================== */
  const tabBtns = document.querySelectorAll('.royaladvancedtabs .tab-btn');
  const tabPanes = document.querySelectorAll('.royaladvancedtabs .tab-pane');

  function activateTab(target) {
    tabBtns.forEach(function (b) {
      const isMatch = b.getAttribute('data-tab') === target;
      b.classList.toggle('active', isMatch);
      b.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    tabPanes.forEach(function (pane) {
      pane.classList.toggle('active', pane.getAttribute('data-tab') === target);
    });
  }

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activateTab(this.getAttribute('data-tab'));
    });
  });

  /* ===================== Dropdown Links -> Switch Menu Tab & Close Mobile ===================== */
  const dropdownLinks = document.querySelectorAll('.royalmenu .dropdown a');
  dropdownLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      const targetTab = this.getAttribute('data-target-tab');
      if (targetTab) {
        activateTab(targetTab);
      }
      closeMenu();
    });
  });

  menuItems.forEach(function (item) {
    if (!item.querySelector('.dropdown')) {
      const link = item.querySelector('a');
      link && link.addEventListener('click', closeMenu);
    }
  });

  /* ===================== Smooth Scroll ===================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerH = (header ? header.offsetHeight : 80) + 10;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ===================== Scroll-to-Top Button ===================== */
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===================== Reservation Form Submit with Alert ===================== */
  const form = document.getElementById('reservation-form');
  if (form) {
    const dateInput = form.querySelector('[name="res-date"]');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = form.querySelector('[name="guest-name"]');
      const date = form.querySelector('[name="res-date"]');
      const time = form.querySelector('[name="res-time"]');
      const guests = form.querySelector('[name="guests"]');

      if (!name || !name.value.trim()) {
        showFormMsg('Please enter your full name.', 'error');
        name && name.focus();
        return;
      }
      if (!date || !date.value) {
        showFormMsg('Please select a preferred reservation date.', 'error');
        date && date.focus();
        return;
      }

      const confirmation =
        'Thank you, ' + name.value.trim() + '! Your table reservation request for ' +
        (guests ? guests.value : '2') + ' guest(s) on ' + date.value +
        ' at ' + (time ? time.value : '19:30') + ' has been received. We will confirm shortly.';

      alert(confirmation);
      showFormMsg(confirmation, 'success');
      form.reset();
    });
  }

  function showFormMsg(msg, type) {
    let el = document.getElementById('form-message');
    if (!el) {
      el = document.createElement('div');
      el.id = 'form-message';
      el.style.cssText = 'margin-top:18px;padding:14px 20px;border-radius:2px;font-size:14px;text-align:center;';
      const submit = document.querySelector('.royalform .form-submit');
      if (submit) submit.after(el);
    }
    el.style.display = 'block';
    el.style.background = type === 'success' ? 'rgba(201,168,76,0.12)' : 'rgba(139,0,0,0.15)';
    el.style.border = type === 'success' ? '1px solid rgba(201,168,76,0.4)' : '1px solid rgba(139,0,0,0.5)';
    el.style.color = type === 'success' ? '#c9a84c' : '#ff6b6b';
    el.textContent = msg;
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    if (type === 'success') {
      setTimeout(function () { el.style.display = 'none'; }, 8000);
    }
  }

  /* ===================== Scroll Reveal Animation ===================== */
  if ('IntersectionObserver' in window) {
    const revealEls = document.querySelectorAll(
      '.chef-card, .award-badge, .review-card'
    );

    revealEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
    });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          entry.target.style.opacity = '1';
          entry.target.style.transform = '';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  }

})();
