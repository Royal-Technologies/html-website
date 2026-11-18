/**
 * GreenRoot Market - main.js (ecom3)
 * Interactive scripts for header, mobile drawer, smooth scrolling, product filters,
 * cart counter, toast notifications, subscription toggles, and order form validation.
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* --------------------------------------------------
     1. Sticky Header
     -------------------------------------------------- */
  const header = document.querySelector('.header') || document.querySelector('.headerstyle2');
  
  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll();

  /* --------------------------------------------------
     2. Mobile Menu & Backdrop Toggle
     -------------------------------------------------- */
  const navIcon = document.getElementById('navigation-icon');
  const mobileMenu = document.getElementById('mobile-menu');

  // Ensure backdrop exists
  let backdrop = document.querySelector('.menu-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'menu-backdrop';
    document.body.appendChild(backdrop);
  }

  function toggleMobileMenu() {
    if (!navIcon || !mobileMenu) return;
    const isOpen = navIcon.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    backdrop.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (navIcon && mobileMenu) {
    navIcon.addEventListener('click', toggleMobileMenu);
    backdrop.addEventListener('click', toggleMobileMenu);

    // Mobile submenu accordion
    const dropdownToggles = mobileMenu.querySelectorAll('.has-dropdown > a');
    dropdownToggles.forEach(function (toggle) {
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

    // Close mobile drawer when clicking a non-dropdown navigation link
    const mobileLinks = mobileMenu.querySelectorAll('a:not(.has-dropdown > a)');
    mobileLinks.forEach(function (link) {
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
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '' || targetId.startsWith('#!')) return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* --------------------------------------------------
     4. Toast Notification Helper
     -------------------------------------------------- */
  let toast = document.querySelector('.green-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'green-toast';
    toast.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span class="toast-message">Item added to your basket!</span>';
    document.body.appendChild(toast);
  }

  let toastTimer = null;
  function showToast(message) {
    if (!toast) return;
    const msgSpan = toast.querySelector('.toast-message');
    if (msgSpan && message) {
      msgSpan.textContent = message;
    }
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('show');
    }, 3200);
  }

  /* --------------------------------------------------
     5. Add to Basket Interactivity & Cart Counter
     -------------------------------------------------- */
  const basketButtons = document.querySelectorAll('.btn-add-basket');
  const cartCounter = document.getElementById('cart-counter');
  let cartCount = 0;

  basketButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const productCard = button.closest('.product-card');
      const productName = productCard ? productCard.querySelector('.product-title')?.textContent.trim() : 'Organic Item';
      
      cartCount += 1;
      if (cartCounter) {
        cartCounter.textContent = cartCount;
        cartCounter.style.transform = 'scale(1.25)';
        setTimeout(function () {
          cartCounter.style.transform = 'scale(1)';
        }, 200);
      }

      // Visual feedback on button
      const originalText = button.innerHTML;
      button.innerHTML = '<i class="fa-solid fa-check"></i> Added';
      button.style.backgroundColor = '#6ea832';
      button.style.color = '#ffffff';

      setTimeout(function () {
        button.innerHTML = originalText;
        button.style.backgroundColor = '';
        button.style.color = '';
      }, 1600);

      showToast(`Added "${productName}" to your fresh basket!`);
    });
  });

  /* --------------------------------------------------
     6. Product Category Filter Tabs
     -------------------------------------------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      productCards.forEach(function (card) {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  /* --------------------------------------------------
     7. Contact & Order Form Handling
     -------------------------------------------------- */
  const orderForm = document.getElementById('greenroot-order-form');
  const successBanner = document.getElementById('form-success-banner');

  if (orderForm) {
    orderForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('order-name');
      const emailInput = document.getElementById('order-email');
      const phoneInput = document.getElementById('order-phone');
      const addressInput = document.getElementById('order-address');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !phoneInput.value.trim() || !addressInput.value.trim()) {
        showToast('Please fill in all required fields marked with *');
        return;
      }

      // Simple email check
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        showToast('Please enter a valid email address');
        return;
      }

      const submitBtn = orderForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting Order...';
      }

      setTimeout(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }

        // Show banner
        if (successBanner) {
          successBanner.classList.add('visible');
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        showToast('Order received! We will prepare your fresh harvest box.');
        orderForm.reset();
      }, 1200);
    });
  }

  /* --------------------------------------------------
     8. Back to Top Button
     -------------------------------------------------- */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
