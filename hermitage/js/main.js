/**
 * Hermitage Certification Group — Main JavaScript
 * Royal Elementor Theme Header Style 2
 * Author: Royal Technologies (https://www.royaltechbd.com)
 */

(function () {
  'use strict';

  /* =====================================================
     1. Sticky Nav on Scroll
     ===================================================== */
  const desktopMenu = document.querySelector('.desktopmenu');
  if (desktopMenu) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        desktopMenu.classList.add('scrolled');
      } else {
        desktopMenu.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* =====================================================
     2. Mobile Menu Toggle (#navigation-icon)
     ===================================================== */
  const navIcon   = document.getElementById('navigation-icon');
  const royalMenu = document.querySelector('.royalmenu');

  if (navIcon && royalMenu) {
    navIcon.addEventListener('click', function () {
      royalMenu.classList.toggle('mobile-open');
      const isOpen = royalMenu.classList.contains('mobile-open');
      navIcon.setAttribute('aria-expanded', isOpen);
    });

    // Mobile: toggle sub-menus on click
    const hasChildren = royalMenu.querySelectorAll('.menu-item-has-children');
    hasChildren.forEach(function (item) {
      const link = item.querySelector(':scope > a');
      if (link) {
        link.addEventListener('click', function (e) {
          if (window.innerWidth <= 991) {
            e.preventDefault();
            item.classList.toggle('open');
          }
        });
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navIcon.contains(e.target) && !royalMenu.contains(e.target)) {
        royalMenu.classList.remove('mobile-open');
        navIcon.setAttribute('aria-expanded', false);
      }
    });
  }

  /* =====================================================
     3. Smooth Scroll for anchor links
     ===================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        // Close mobile menu if open
        if (royalMenu) royalMenu.classList.remove('mobile-open');
        const offset = desktopMenu ? desktopMenu.offsetHeight : 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* =====================================================
     4. FAQ Accordion (royalaccordion)
     ===================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function () {
        const isOpen = item.classList.contains('open');
        // Close all
        faqItems.forEach(function (fi) { fi.classList.remove('open'); });
        // Open clicked if it was closed
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  /* =====================================================
     5. Inquiry Form Submit → Success Modal
     ===================================================== */
  const inquiryForm   = document.getElementById('inquiryForm');
  const modalOverlay  = document.getElementById('successModal');
  const modalClose    = document.getElementById('modalClose');

  if (inquiryForm && modalOverlay) {
    inquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // Basic validation
      const required = inquiryForm.querySelectorAll('[required]');
      let valid = true;
      required.forEach(function (field) {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#ef4444';
          field.addEventListener('input', function () {
            field.style.borderColor = '';
          }, { once: true });
        }
      });
      if (!valid) return;
      // Show modal
      modalOverlay.classList.add('active');
      inquiryForm.reset();
    });
  }

  if (modalClose && modalOverlay) {
    modalClose.addEventListener('click', function () {
      modalOverlay.classList.remove('active');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  /* =====================================================
     6. Active menu item on scroll (highlight)
     ===================================================== */
  const sections   = document.querySelectorAll('section[id]');
  const menuLinks  = document.querySelectorAll('.royalmenu > li > a[href^="#"]');

  function setActiveLink() {
    const scrollY = window.scrollY + (desktopMenu ? desktopMenu.offsetHeight + 10 : 80);
    sections.forEach(function (section) {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        const id = '#' + section.getAttribute('id');
        menuLinks.forEach(function (link) {
          link.closest('li').classList.toggle(
            'current-menu-item',
            link.getAttribute('href') === id
          );
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

})();
