/* ==========================================================================
   AutoVault Motors - Main JavaScript
   Features:
   - Real-time Interactive Financing Payment Calculator
   - Header Sticky & Mobile Drawer Menu Toggle (#navigation-icon)
   - Smooth Scroll & Active Nav Tracking
   - Inquiry Form Handler & Test Drive Quick Actions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // ==========================================================================
  // 1. Sticky Header
  // ==========================================================================
  const header = document.querySelector('.header');
  function handleScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // ==========================================================================
  // 2. Mobile Menu Drawer & Hamburger (#navigation-icon)
  // ==========================================================================
  const navIcon = document.getElementById('navigation-icon');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobileSubmenuToggle = document.querySelectorAll('.mobile-submenu-toggle');

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
      e.stopPropagation();
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Toggle Submenus inside Mobile Drawer
  mobileSubmenuToggle.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const parent = btn.closest('li');
      const submenu = parent.querySelector('.mobile-submenu');
      const icon = btn.querySelector('i');
      if (submenu) {
        submenu.classList.toggle('open');
        if (icon) {
          icon.style.transform = submenu.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }
    });
  });

  // Close Mobile Menu when clicking a nav anchor
  const mobileLinks = document.querySelectorAll('.mobile-menu a:not(.mobile-submenu-toggle)');
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  // ==========================================================================
  // 3. Smooth Anchor Scrolling
  // ==========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
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

  // ==========================================================================
  // 4. Interactive Financing Payment Calculator
  // ==========================================================================
  const priceSlider = document.getElementById('calc-price');
  const downSlider = document.getElementById('calc-down');
  const rateSlider = document.getElementById('calc-rate');
  const termButtons = document.querySelectorAll('.term-btn');

  const priceVal = document.getElementById('calc-price-val');
  const downVal = document.getElementById('calc-down-val');
  const rateVal = document.getElementById('calc-rate-val');

  const monthlyDisplay = document.getElementById('calc-monthly-val');
  const breakdownPrincipal = document.getElementById('calc-breakdown-principal');
  const breakdownDown = document.getElementById('calc-breakdown-down');
  const breakdownInterest = document.getElementById('calc-breakdown-interest');
  const breakdownTotal = document.getElementById('calc-breakdown-total');

  let currentTerm = 60; // default 60 months

  // Term Selection Buttons
  termButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      termButtons.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      currentTerm = parseInt(this.getAttribute('data-term'), 10);
      calculateFinancing();
    });
  });

  function formatCurrency(val) {
    return '$' + Math.round(val).toLocaleString('en-US');
  }

  function calculateFinancing() {
    if (!priceSlider || !downSlider || !rateSlider) return;

    const price = parseFloat(priceSlider.value) || 85000;
    const downPercent = parseFloat(downSlider.value) || 15;
    const ratePercent = parseFloat(rateSlider.value) || 4.9;

    // Update Slider Displays
    if (priceVal) priceVal.textContent = formatCurrency(price);
    const downAmount = (price * downPercent) / 100;
    if (downVal) downVal.textContent = downPercent + '% (' + formatCurrency(downAmount) + ')';
    if (rateVal) rateVal.textContent = ratePercent.toFixed(1) + '%';

    // Calculate Loan
    const loanAmount = price - downAmount;
    const monthlyRate = (ratePercent / 100) / 12;
    const n = currentTerm;

    let monthlyPayment = 0;
    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / n;
    } else {
      monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    }

    const totalLoanCost = monthlyPayment * n;
    const totalInterest = totalLoanCost - loanAmount;

    // Update Result UI
    if (monthlyDisplay) monthlyDisplay.textContent = formatCurrency(monthlyPayment);
    if (breakdownPrincipal) breakdownPrincipal.textContent = formatCurrency(loanAmount);
    if (breakdownDown) breakdownDown.textContent = formatCurrency(downAmount);
    if (breakdownInterest) breakdownInterest.textContent = formatCurrency(totalInterest);
    if (breakdownTotal) breakdownTotal.textContent = formatCurrency(totalLoanCost + downAmount);
  }

  // Bind Slider Events
  if (priceSlider) priceSlider.addEventListener('input', calculateFinancing);
  if (downSlider) downSlider.addEventListener('input', calculateFinancing);
  if (rateSlider) rateSlider.addEventListener('input', calculateFinancing);

  // Initial Calculation Run
  calculateFinancing();

  // ==========================================================================
  // 5. Contact & Inquiry Form Handler
  // ==========================================================================
  const inquiryForm = document.getElementById('inquiryForm');
  const inquiryFeedback = document.getElementById('inquiryFeedback');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing VIP Request...';

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (inquiryFeedback) {
          inquiryFeedback.className = 'form-feedback success';
          inquiryFeedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your VIP consultation and vehicle inquiry has been received. Our Senior Fleet Executive will contact you within 2 hours.';
          inquiryForm.reset();
          calculateFinancing();
        }
      }, 1000);
    });
  }

  // ==========================================================================
  // 6. Quick Test Drive Button Action
  // ==========================================================================
  const testDriveBtns = document.querySelectorAll('.book-drive-btn');
  testDriveBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      const carName = this.getAttribute('data-car') || 'Selected Vehicle';
      const vehicleSelect = document.getElementById('formVehicle');
      if (vehicleSelect) {
        let found = false;
        for (let i = 0; i < vehicleSelect.options.length; i++) {
          if (vehicleSelect.options[i].text.includes(carName)) {
            vehicleSelect.selectedIndex = i;
            found = true;
            break;
          }
        }
        if (!found) {
          const opt = new Option(carName + ' (Special Selection)', carName);
          vehicleSelect.add(opt);
          vehicleSelect.value = carName;
        }
      }
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Newsletter Form Handler
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = newsletterForm.querySelector('button');
      btn.innerHTML = '<i class="fa-solid fa-check"></i>';
      setTimeout(function () {
        newsletterForm.reset();
        alert('Thank you for subscribing to AutoVault Motors Exclusive Catalog & Private Showcase Updates.');
        btn.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
      }, 500);
    });
  }
});
