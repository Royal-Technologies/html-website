/**
 * ZenFlow Retreat - Main JavaScript
 * Handles sticky header, mobile menu, smooth scrolling, and interactive forms.
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Sticky Header
  // --------------------------------------------------------------------------
  const header = document.querySelector('.header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('is-sticky');
    } else {
      header.classList.remove('is-sticky');
    }

    // Back to top button visibility
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // --------------------------------------------------------------------------
  // 2. Mobile Menu Toggle
  // --------------------------------------------------------------------------
  const navIcon = document.getElementById('navigation-icon');
  const desktopMenu = document.querySelector('.desktopmenu');

  if (navIcon && desktopMenu) {
    navIcon.addEventListener('click', function (e) {
      e.stopPropagation();
      navIcon.classList.toggle('active');
      desktopMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (!desktopMenu.contains(e.target) && !navIcon.contains(e.target)) {
        navIcon.classList.remove('active');
        desktopMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });

    // Close menu when clicking link (non-dropdown parent)
    const navLinks = desktopMenu.querySelectorAll('.royalmenu > li:not(.has-dropdown) > a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navIcon.classList.remove('active');
        desktopMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // Mobile dropdown toggle
  const dropdownParents = document.querySelectorAll('.royalmenu > li.has-dropdown > a');
  dropdownParents.forEach(function (parentLink) {
    parentLink.addEventListener('click', function (e) {
      if (window.innerWidth < 992) {
        e.preventDefault();
        const dropdown = this.nextElementSibling;
        if (dropdown && dropdown.classList.contains('dropdown')) {
          dropdown.classList.toggle('show');
        }
      }
    });
  });

  // --------------------------------------------------------------------------
  // 3. Smooth Scrolling for Internal Anchors
  // --------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#' && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // If mobile menu is open, close it
          if (desktopMenu && desktopMenu.classList.contains('active')) {
            navIcon.classList.remove('active');
            desktopMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
          }
        }
      }
    });
  });

  // --------------------------------------------------------------------------
  // 4. Back to Top Smooth Scroll
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. Booking Form Submission
  // --------------------------------------------------------------------------
  const bookingForm = document.getElementById('mindfulness-booking-form');
  const bookingFeedback = document.getElementById('booking-feedback');

  if (bookingForm && bookingFeedback) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Simple validation
      const name = bookingForm.querySelector('[name="full_name"]')?.value.trim();
      const email = bookingForm.querySelector('[name="email"]')?.value.trim();
      const selectedClass = bookingForm.querySelector('[name="class_type"]')?.value;

      if (!name || !email || !selectedClass) {
        alert('Please fill in your name, email, and select a class.');
        return;
      }

      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Reserving Your Spot...';

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        bookingFeedback.innerHTML = `<i class="fas fa-check-circle"></i> Namaste ${name}! Your spot for <strong>${selectedClass}</strong> has been confirmed. A confirmation receipt has been sent to <strong>${email}</strong>.`;
        bookingFeedback.classList.add('show');
        bookingForm.reset();

        setTimeout(function () {
          bookingFeedback.classList.remove('show');
        }, 8000);
      }, 900);
    });
  }

  // --------------------------------------------------------------------------
  // 6. Contact Form Submission
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('zen-contact-form');
  const contactFeedback = document.getElementById('contact-feedback');

  if (contactForm && contactFeedback) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactFeedback.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for reaching out! Our sanctuary hosts will connect with you within 24 hours.';
        contactFeedback.classList.add('show');
        contactForm.reset();

        setTimeout(function () {
          contactFeedback.classList.remove('show');
        }, 8000);
      }, 900);
    });
  }

  // --------------------------------------------------------------------------
  // 7. Newsletter Subscription Form
  // --------------------------------------------------------------------------
  const newsletterForm = document.getElementById('zen-newsletter-form');
  const newsletterFeedback = document.getElementById('newsletter-feedback');

  if (newsletterForm && newsletterFeedback) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (!emailInput.value) return;

      const submitBtn = newsletterForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        newsletterFeedback.innerHTML = '<i class="fas fa-check-circle"></i> Welcome to the ZenFlow circle! Your meditation audio guide is on its way.';
        newsletterFeedback.classList.add('show');
        newsletterForm.reset();

        setTimeout(function () {
          newsletterFeedback.classList.remove('show');
        }, 8000);
      }, 800);
    });
  }

  // --------------------------------------------------------------------------
  // 8. Auto-populate Class from Schedule to Booking Form
  // --------------------------------------------------------------------------
  const bookClassButtons = document.querySelectorAll('.select-class-btn');
  bookClassButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      const className = this.getAttribute('data-class');
      const classSelect = document.getElementById('class-select');
      if (className && classSelect) {
        classSelect.value = className;
      }
    });
  });
});
