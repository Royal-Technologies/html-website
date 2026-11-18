/**
 * AquaVista Cruises - Main JavaScript (travel3)
 * Luxury Cruise & Yacht Charter
 * Compatible with Royal Elementor Theme & Addons
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // ==================== 1. STICKY HEADER ====================
  const header = document.querySelector('.header');
  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // ==================== 2. MOBILE MENU & BACKDROP ====================
  const navIcon = document.getElementById('navigation-icon');
  const mobileMenu = document.getElementById('mobile-menu');
  let mobileOverlay = document.querySelector('.mobile-menu-overlay');

  if (!mobileOverlay) {
    mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-menu-overlay';
    document.body.appendChild(mobileOverlay);
  }

  function toggleMobileMenu() {
    if (!navIcon || !mobileMenu) return;
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      navIcon.classList.add('open');
      mobileMenu.classList.add('open');
      mobileOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    if (!navIcon || !mobileMenu) return;
    navIcon.classList.remove('open');
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (navIcon) {
    navIcon.addEventListener('click', toggleMobileMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // Mobile dropdown toggle
  if (mobileMenu) {
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

    // Close on clicking regular nav link
    const regularMobileLinks = mobileMenu.querySelectorAll('a:not(.has-dropdown > a)');
    regularMobileLinks.forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // ==================== 3. SMOOTH SCROLL WITH HEADER OFFSET ====================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#' || targetId === '#!') return;

      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = targetElem.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==================== 4. ACTIVE NAVIGATION (SCROLLSPY) ====================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.royalmenu > li > a');

  function highlightNavigation() {
    const scrollY = window.pageYOffset;
    const headerHeight = header ? header.offsetHeight + 30 : 100;

    sections.forEach(function (section) {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - headerHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          const href = link.getAttribute('href');
          if (href === '#' + sectionId || (sectionId === 'home' && href === '#')) {
            link.parentElement.classList.add('active');
          } else {
            link.parentElement.classList.remove('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNavigation, { passive: true });

  // ==================== 5. BOOKING WIDGET (Hero Form) ====================
  const heroBookingForm = document.getElementById('heroBookingForm');
  if (heroBookingForm) {
    heroBookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const port = document.getElementById('heroPort')?.value || '';
      const cruiseType = document.getElementById('heroCruiseType')?.value || '';
      const date = document.getElementById('heroDate')?.value || '';
      const guests = document.getElementById('heroGuests')?.value || '2';

      // Pre-populate inquiry form
      const contactCruise = document.getElementById('inquiryCruise');
      const contactDate = document.getElementById('inquiryDate');
      const contactGuests = document.getElementById('inquiryGuests');

      if (contactCruise && cruiseType) contactCruise.value = cruiseType;
      if (contactDate && date) contactDate.value = date;
      if (contactGuests && guests) contactGuests.value = guests;

      // Scroll smoothly to contact inquiry section
      const contactSec = document.getElementById('contact');
      if (contactSec) {
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = contactSec.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Focus the name input
        setTimeout(function () {
          const nameInput = document.getElementById('inquiryName');
          if (nameInput) nameInput.focus();
        }, 800);
      }
    });
  }

  // Quick book buttons in cruise & cabin cards
  document.querySelectorAll('.book-trigger').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const cruiseName = this.getAttribute('data-cruise');
      const cabinType = this.getAttribute('data-cabin');

      const contactCruise = document.getElementById('inquiryCruise');
      const contactCabin = document.getElementById('inquiryCabin');

      if (contactCruise && cruiseName) contactCruise.value = cruiseName;
      if (contactCabin && cabinType) contactCabin.value = cabinType;

      const contactSec = document.getElementById('contact');
      if (contactSec) {
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = contactSec.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        setTimeout(function () {
          const nameInput = document.getElementById('inquiryName');
          if (nameInput) nameInput.focus();
        }, 800);
      }
    });
  });

  // ==================== 6. CHARTER INQUIRY FORM & MODAL ====================
  const inquiryForm = document.getElementById('charterInquiryForm');
  const charterModal = document.getElementById('charterModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalRefId = document.getElementById('modalRefId');
  const modalGuestName = document.getElementById('modalGuestName');

  if (inquiryForm && charterModal) {
    inquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Collect values
      const fullName = document.getElementById('inquiryName')?.value || 'Valued Guest';
      const randomRef = 'AQV-2026-' + Math.floor(1000 + Math.random() * 9000);

      // Populate modal
      if (modalRefId) modalRefId.textContent = randomRef;
      if (modalGuestName) modalGuestName.textContent = fullName;

      // Show modal
      charterModal.classList.add('open');
      document.body.style.overflow = 'hidden';

      // Reset form
      inquiryForm.reset();
    });
  }

  function closeModal() {
    if (!charterModal) return;
    charterModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (charterModal) {
    charterModal.addEventListener('click', function (e) {
      if (e.target === charterModal) {
        closeModal();
      }
    });
  }

  // Close modal or mobile menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeModal();
      closeMobileMenu();
    }
  });

  // Set default minimum date for datepickers to today
  const todayStr = new Date().toISOString().split('T')[0];
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(function (inp) {
    inp.min = todayStr;
    if (!inp.value) {
      inp.value = '2026-06-15';
    }
  });
});
