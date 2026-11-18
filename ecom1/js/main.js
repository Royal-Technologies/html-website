/**
 * LuxeThread Fashion Boutique - main.js
 * Interactive scripts for header, countdown timer, size guide tabs, portfolio filter, cart & wishlist
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* --------------------------------------------------
     1. Sticky Header
     -------------------------------------------------- */
  const header = document.querySelector('.header');
  function handleHeaderScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll();

  /* --------------------------------------------------
     2. Mobile Menu & Backdrop
     -------------------------------------------------- */
  const navIcon = document.getElementById('navigation-icon');
  const mobileMenu = document.getElementById('mobile-menu');
  
  // Create backdrop element if not exists
  let backdrop = document.querySelector('.menu-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'menu-backdrop';
    document.body.appendChild(backdrop);
  }

  function toggleMobileMenu() {
    const isOpen = navIcon.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    backdrop.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (navIcon && mobileMenu) {
    navIcon.addEventListener('click', toggleMobileMenu);
    backdrop.addEventListener('click', toggleMobileMenu);

    // Mobile dropdowns
    const mobileDropdownToggles = mobileMenu.querySelectorAll('.has-dropdown > a');
    mobileDropdownToggles.forEach(function (toggle) {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        const parentLi = toggle.parentElement;
        const dropdown = parentLi.querySelector('.dropdown');
        if (dropdown) {
          dropdown.classList.toggle('mobile-open');
          const arrow = toggle.querySelector('.arrow');
          if (arrow) {
            arrow.style.transform = dropdown.classList.contains('mobile-open') ? 'rotate(180deg)' : 'rotate(0deg)';
          }
        }
      });
    });

    // Close menu when clicking link (excluding dropdown toggles)
    const navLinks = mobileMenu.querySelectorAll('a:not(.has-dropdown > a)');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navIcon.classList.remove('open');
        mobileMenu.classList.remove('open');
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* --------------------------------------------------
     3. Smooth Anchor Scrolling
     -------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = header ? header.offsetHeight : 0;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  /* --------------------------------------------------
     4. Seasonal Sale Countdown Timer
     -------------------------------------------------- */
  const daysEl = document.getElementById('count-days');
  const hoursEl = document.getElementById('count-hours');
  const minutesEl = document.getElementById('count-minutes');
  const secondsEl = document.getElementById('count-seconds');

  if (daysEl && hoursEl && minutesEl && secondsEl) {
    // 7 days from current time
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    targetDate.setHours(23, 59, 59, 0);

    function updateCountdown() {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      daysEl.textContent = days < 10 ? '0' + days : days;
      hoursEl.textContent = hours < 10 ? '0' + hours : hours;
      minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
      secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* --------------------------------------------------
     5. Size Guide Tabs (royaladvancedtabs)
     -------------------------------------------------- */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const targetTab = this.getAttribute('data-tab');

      tabButtons.forEach(function (btn) { btn.classList.remove('active'); });
      tabPanes.forEach(function (pane) { pane.classList.remove('active'); });

      this.classList.add('active');
      const activePane = document.getElementById(targetTab);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });

  /* --------------------------------------------------
     6. Collection Filter (royalportfolio)
     -------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      const filterVal = this.getAttribute('data-filter');
      productCards.forEach(function (card) {
        if (filterVal === 'all' || card.getAttribute('data-category') === filterVal) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* --------------------------------------------------
     7. Toast Notification Utility
     -------------------------------------------------- */
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  function showToast(message, iconClass) {
    const icon = iconClass || 'fa-circle-check';
    toast.innerHTML = '<i class="fa-solid ' + icon + '"></i> <span>' + message + '</span>';
    toast.classList.add('show');
    setTimeout(function () {
      toast.classList.remove('show');
    }, 2800);
  }

  /* --------------------------------------------------
     8. Wishlist Heart Toggle
     -------------------------------------------------- */
  const wishlistBtns = document.querySelectorAll('.product-wishlist-btn');
  const wishlistCounter = document.getElementById('wishlist-counter');
  let wishlistCount = 2;

  wishlistBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const isActive = this.classList.toggle('active');
      const icon = this.querySelector('i');

      if (isActive) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
        wishlistCount++;
        showToast('Saved to your Luxe Wishlist', 'fa-heart');
      } else {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
        wishlistCount = Math.max(0, wishlistCount - 1);
        showToast('Removed from your Wishlist', 'fa-heart-circle-minus');
      }

      if (wishlistCounter) {
        wishlistCounter.textContent = wishlistCount;
      }
    });
  });

  /* --------------------------------------------------
     9. Add to Cart Handler
     -------------------------------------------------- */
  const addToCartBtns = document.querySelectorAll('.btn-add-cart');
  const cartCounter = document.getElementById('cart-counter');
  let cartTotal = 0;

  addToCartBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const productName = this.getAttribute('data-name') || 'Item';
      cartTotal++;
      if (cartCounter) {
        cartCounter.textContent = cartTotal;
      }
      showToast('"' + productName + '" added to shopping bag', 'fa-bag-shopping');
    });
  });

  /* --------------------------------------------------
     10. Newsletter & Contact Form Handlers
     -------------------------------------------------- */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = this.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast('Thank you! 15% discount code sent to ' + input.value, 'fa-envelope-open-text');
        input.value = '';
      }
    });
  }

  const contactForm = document.getElementById('contact-form');
  const contactStatus = document.getElementById('form-status');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Inquiry...';

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (contactStatus) {
          contactStatus.textContent = 'Thank you! Your concierge inquiry has been received. A personal stylist will reply within 24 hours.';
          contactStatus.className = 'form-message-status success';
          contactForm.reset();
        }
      }, 1000);
    });
  }
});
