/* ==========================================================================
   DriveEasy Rentals — Main JavaScript
   Theme: Modern Travel / Fleet Rental
   Features:
     1. Sticky Header with Scroll Detection
     2. Mobile Navigation Drawer & Hamburger Animation (#navigation-icon)
     3. Smooth Anchor Scrolling with Dynamic Header Offset
     4. Rental Search Widget Auto-fill & Navigation
     5. Vehicle Fleet Category Filtering
     6. "Reserve Now" Quick Selection & Jump to Reservation Form
     7. Reservation Form Validation & Interactive Feedback
     8. Back to Top Button
   Author: Royal Technologies (https://www.royaltechbd.com)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // ==========================================================================
  // 1. STICKY HEADER & SCROLL TRACKING
  // ==========================================================================
  const header = document.querySelector('.header');
  const backToTopBtn = document.getElementById('backToTop');

  function handleScroll() {
    const scrollPos = window.scrollY || window.pageYOffset;

    // Header sticky styling
    if (header) {
      if (scrollPos > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Highlight current active nav item based on scroll position
    updateActiveNavOnScroll(scrollPos);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Back to top click handler
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================================================
  // 2. MOBILE DRAWER MENU & HAMBURGER (#navigation-icon)
  // ==========================================================================
  const navIcon = document.getElementById('navigation-icon');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
  const mobileSubmenuToggles = document.querySelectorAll('.mobile-submenu-toggle');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-list a:not(.mobile-submenu-toggle)');

  function openMobileMenu() {
    if (navIcon) navIcon.classList.add('open');
    if (mobileMenu) mobileMenu.classList.add('open');
    if (mobileBackdrop) mobileBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (navIcon) navIcon.classList.remove('open');
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (mobileBackdrop) mobileBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (navIcon) {
    navIcon.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileMenuCloseBtn) {
    mobileMenuCloseBtn.addEventListener('click', function (e) {
      e.preventDefault();
      closeMobileMenu();
    });
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Handle ESC key to close mobile drawer
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // Mobile submenu accordions
  mobileSubmenuToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      const parent = toggle.closest('li');
      const submenu = parent.querySelector('.mobile-submenu');
      const icon = toggle.querySelector('i');

      if (submenu) {
        submenu.classList.toggle('open');
        if (icon) {
          icon.style.transform = submenu.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }
    });
  });

  // Close mobile drawer when clicking anchor links
  mobileNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMobileMenu();
    });
  });

  // ==========================================================================
  // 3. SMOOTH SCROLLING WITH OFFSET FOR FIXED HEADER
  // ==========================================================================
  const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  scrollLinks.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length <= 1) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 70;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Set active link in desktop menu
        updateActiveNavLink(targetId);
      }
    });
  });

  function updateActiveNavLink(hash) {
    const desktopLinks = document.querySelectorAll('.desktopmenu .royalmenu > li > a');
    desktopLinks.forEach(function (link) {
      const parentLi = link.closest('li');
      if (link.getAttribute('href') === hash) {
        parentLi.classList.add('active');
      } else {
        parentLi.classList.remove('active');
      }
    });
  }

  function updateActiveNavOnScroll(scrollPos) {
    const sections = document.querySelectorAll('section[id], header[id], div[id]');
    const headerHeight = header ? header.offsetHeight : 70;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        const matchingLink = document.querySelector(`.desktopmenu .royalmenu > li > a[href="#${sectionId}"]`);
        if (matchingLink) {
          document.querySelectorAll('.desktopmenu .royalmenu > li').forEach(function (li) {
            li.classList.remove('active');
          });
          matchingLink.closest('li').classList.add('active');
        }
      }
    });
  }

  // ==========================================================================
  // 4. RENTAL SEARCH WIDGET (Hero Search Form)
  // ==========================================================================
  const heroSearchForm = document.getElementById('heroSearchForm');
  const reservationForm = document.getElementById('reservationForm');
  const resLocation = document.getElementById('resLocation');
  const resPickupDate = document.getElementById('resPickupDate');
  const resReturnDate = document.getElementById('resReturnDate');
  const resCategory = document.getElementById('resCategory');

  // Set minimum dates to today
  const todayStr = new Date().toISOString().split('T')[0];
  const searchPickupDate = document.getElementById('searchPickupDate');
  const searchReturnDate = document.getElementById('searchReturnDate');

  if (searchPickupDate) {
    searchPickupDate.min = todayStr;
    searchPickupDate.value = todayStr;
  }
  if (resPickupDate) {
    resPickupDate.min = todayStr;
    resPickupDate.value = todayStr;
  }

  // Next day default for return
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 3);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  if (searchReturnDate) {
    searchReturnDate.min = todayStr;
    searchReturnDate.value = tomorrowStr;
  }
  if (resReturnDate) {
    resReturnDate.min = todayStr;
    resReturnDate.value = tomorrowStr;
  }

  if (heroSearchForm) {
    heroSearchForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const searchLocVal = document.getElementById('searchLocation') ? document.getElementById('searchLocation').value : '';
      const searchPickupVal = searchPickupDate ? searchPickupDate.value : '';
      const searchReturnVal = searchReturnDate ? searchReturnDate.value : '';
      const searchCategoryVal = document.getElementById('searchCategory') ? document.getElementById('searchCategory').value : '';

      // Transfer values to main reservation form if elements exist
      if (resLocation && searchLocVal) resLocation.value = searchLocVal;
      if (resPickupDate && searchPickupVal) resPickupDate.value = searchPickupVal;
      if (resReturnDate && searchReturnVal) resReturnDate.value = searchReturnVal;
      if (resCategory && searchCategoryVal) resCategory.value = searchCategoryVal;

      // Scroll smoothly down to the Fleet or Reservation Form
      const targetSection = document.getElementById('fleet') || document.getElementById('contact');
      if (targetSection) {
        const headerHeight = header ? header.offsetHeight : 70;
        const targetPos = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }

      // If user chose a category, trigger the corresponding fleet filter tab
      if (searchCategoryVal) {
        const matchingFilterBtn = document.querySelector(`.filter-btn[data-category="${searchCategoryVal}"]`);
        if (matchingFilterBtn) {
          matchingFilterBtn.click();
        }
      }
    });
  }

  // ==========================================================================
  // 5. FLEET CATEGORY FILTERING (.royalportfolio)
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const carCards = document.querySelectorAll('.car-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Set active button
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      carCards.forEach(function (card) {
        if (filterValue === 'all') {
          card.style.display = 'flex';
          setTimeout(function () {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          const cardCategories = card.getAttribute('data-category') || '';
          if (cardCategories.includes(filterValue)) {
            card.style.display = 'flex';
            setTimeout(function () {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(function () {
              card.style.display = 'none';
            }, 250);
          }
        }
      });
    });
  });

  // ==========================================================================
  // 6. "RESERVE NOW" CAR CARD QUICK ACTION
  // ==========================================================================
  const reserveBtns = document.querySelectorAll('.btn-reserve-car');

  reserveBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const carName = this.getAttribute('data-car-name') || '';
      const carCategory = this.getAttribute('data-car-category') || '';

      // Update reservation form select
      if (resCategory && carCategory) {
        resCategory.value = carCategory;
      }

      // Add a note in special requests
      const specialReq = document.getElementById('resSpecialRequests');
      if (specialReq && carName) {
        specialReq.value = `Selected Vehicle: ${carName}.`;
      }

      // Scroll smoothly to reservation form (#contact)
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const headerHeight = header ? header.offsetHeight : 70;
        const targetPos = contactSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });

        // Flash reservation box to give visual feedback
        const formWrap = document.querySelector('.form-wrapper');
        if (formWrap) {
          formWrap.style.boxShadow = '0 0 35px rgba(59, 130, 246, 0.6)';
          setTimeout(function () {
            formWrap.style.boxShadow = '';
          }, 1200);
        }
      }
    });
  });

  // Connect pricing table plan CTA buttons to reservation form
  const planCtaBtns = document.querySelectorAll('.plan-cta-btn');
  planCtaBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const planName = this.getAttribute('data-plan') || 'Rental Plan';
      const specialReq = document.getElementById('resSpecialRequests');
      if (specialReq) {
        specialReq.value = `Inquiring about ${planName}. Please apply any applicable package discounts.`;
      }

      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const headerHeight = header ? header.offsetHeight : 70;
        const targetPos = contactSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================================================
  // 7. RESERVATION FORM SUBMISSION HANDLER (.royalform)
  // ==========================================================================
  const formStatusAlert = document.getElementById('formStatusAlert');

  if (reservationForm) {
    reservationForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Gather form inputs
      const locationVal = resLocation ? resLocation.value.trim() : '';
      const pickupVal = resPickupDate ? resPickupDate.value : '';
      const returnVal = resReturnDate ? resReturnDate.value : '';
      const categoryVal = resCategory ? resCategory.value : '';
      const nameInput = document.getElementById('resDriverName');
      const emailInput = document.getElementById('resDriverEmail');
      const phoneInput = document.getElementById('resDriverPhone');

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';

      // Simple validation
      if (!locationVal || !pickupVal || !returnVal || !categoryVal || !nameVal || !emailVal || !phoneVal) {
        showAlert('Please complete all required fields marked with an asterisk (*).', 'error');
        return;
      }

      // Check dates
      if (new Date(returnVal) < new Date(pickupVal)) {
        showAlert('Return Date cannot be earlier than Pickup Date. Please check your dates.', 'error');
        return;
      }

      // Simulate submission loading
      const submitBtn = reservationForm.querySelector('.btn-form-submit');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Confirming Reservation...';
      }

      setTimeout(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }

        showAlert(`Thank you, ${nameVal}! Your reservation request for a ${categoryVal} at ${locationVal} has been received. A booking confirmation and rental voucher have been sent to ${emailVal}. Our fleet team will reach out at ${phoneVal} if needed.`, 'success');

        reservationForm.reset();

        // Reset dates back to defaults
        if (resPickupDate) resPickupDate.value = todayStr;
        if (resReturnDate) resReturnDate.value = tomorrowStr;
      }, 1200);
    });
  }

  function showAlert(message, type) {
    if (!formStatusAlert) return;
    formStatusAlert.textContent = message;
    formStatusAlert.className = `form-status-alert alert-${type}`;
    formStatusAlert.style.display = 'block';

    // Auto-scroll slightly to show the message
    formStatusAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    if (type === 'success') {
      setTimeout(function () {
        formStatusAlert.style.display = 'none';
      }, 10000);
    }
  }
});
