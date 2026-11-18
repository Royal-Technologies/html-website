/**
 * TechNest Store - main.js
 * Interactive scripts for header, mobile drawer, product filters, cart, wishlist, and support form
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

    // Mobile dropdown toggle
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

    // Close on link click
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
     4. Toast Notification System
     -------------------------------------------------- */
  let toast = document.querySelector('.tech-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'tech-toast';
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
     5. Product Filtering (royalportfolio)
     -------------------------------------------------- */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productCards = document.querySelectorAll('.product-card');

  filterTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      filterTabs.forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');

      const filterVal = this.getAttribute('data-filter');
      productCards.forEach(function (card) {
        if (filterVal === 'all' || card.getAttribute('data-category') === filterVal) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* --------------------------------------------------
     6. Wishlist Toggle
     -------------------------------------------------- */
  const wishlistBtns = document.querySelectorAll('.btn-wishlist');
  const wishlistBadge = document.getElementById('wishlist-counter');
  let wishlistCount = 1;

  wishlistBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const isActive = this.classList.toggle('active');
      const icon = this.querySelector('i');
      if (isActive) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
        wishlistCount++;
        showToast('Saved to your Tech Wishlist', 'fa-heart');
      } else {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
        wishlistCount = Math.max(0, wishlistCount - 1);
        showToast('Removed from Tech Wishlist', 'fa-heart-crack');
      }
      if (wishlistBadge) wishlistBadge.textContent = wishlistCount;
    });
  });

  /* --------------------------------------------------
     7. Add to Cart & Flash Deals Grab
     -------------------------------------------------- */
  const cartButtons = document.querySelectorAll('.btn-add-cart, .deal-item-btn');
  const cartBadge = document.getElementById('cart-counter');
  let cartCount = 0;

  cartButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const name = this.getAttribute('data-name') || 'Product';
      cartCount++;
      if (cartBadge) cartBadge.textContent = cartCount;
      showToast('"' + name + '" added to your cart!', 'fa-cart-shopping');
    });
  });

  /* --------------------------------------------------
     8. Live Chat CTA Handler
     -------------------------------------------------- */
  const liveChatBtn = document.getElementById('btn-live-chat');
  if (liveChatBtn) {
    liveChatBtn.addEventListener('click', function (e) {
      e.preventDefault();
      showToast('Connecting to Tech Support Agent in live chat...', 'fa-headset');
    });
  }

  /* --------------------------------------------------
     9. Tech Support Contact Form
     -------------------------------------------------- */
  const supportForm = document.getElementById('support-form');
  const supportAlert = document.getElementById('support-status');

  if (supportForm) {
    supportForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting Ticket...';

      const ticketNum = 'TN-' + Math.floor(100000 + Math.random() * 900000);

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (supportAlert) {
          supportAlert.innerHTML = '<i class="fa-solid fa-circle-check"></i> Ticket <strong>#' + ticketNum + '</strong> logged! Our engineering support team will respond within 2 hours.';
          supportAlert.className = 'support-msg-alert success';
          supportForm.reset();
        }
      }, 1100);
    });
  }
});
