/**
 * SolarPeak Energy - Main JavaScript
 * Interactive Solar Cost Savings Calculator + Navigation + Form Handlers
 * Author: Royal Technologies
 */

document.addEventListener('DOMContentLoaded', function () {
  // --- Mobile Drawer Menu ---
  const navIcon = document.getElementById('navigation-icon');
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileBackdrop');
  const drawerClose = document.getElementById('mobileDrawerClose');

  function openDrawer() {
    if (drawer && backdrop) {
      drawer.classList.add('active');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (drawer && backdrop) {
      drawer.classList.remove('active');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (navIcon) navIcon.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  document.querySelectorAll('.mobile-royalmenu .has-dropdown > a').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const sub = this.parentElement.querySelector('.sub-menu');
      if (sub) sub.classList.toggle('open');
    });
  });

  document.querySelectorAll('.mobile-royalmenu a:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // --- Sticky Header on Scroll ---
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function () {
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // --- Interactive Solar Savings Calculator ---
  const calcBtn = document.getElementById('calculateSavingsBtn');
  const billInput = document.getElementById('monthlyBill');
  const roofInput = document.getElementById('roofSize');
  const regionSelect = document.getElementById('regionSelect');

  const outSystemSize = document.getElementById('resSystemSize');
  const outMonthly = document.getElementById('resMonthlySavings');
  const outAnnual = document.getElementById('resAnnualSavings');
  const outTenYear = document.getElementById('resTenYearSavings');
  const outPayback = document.getElementById('resPaybackPeriod');
  const resultPanel = document.getElementById('calcResultsPanel');

  // Region parameters: sunFactor (efficiency), ratePerKwh, incentiveFactor (after 30% ITC)
  const regionConfig = {
    southwest: { sunFactor: 1.25, offsetRate: 0.85, costPerKw: 2650 },
    southeast: { sunFactor: 1.12, offsetRate: 0.80, costPerKw: 2700 },
    northeast: { sunFactor: 0.96, offsetRate: 0.78, costPerKw: 2850 },
    midwest:   { sunFactor: 1.00, offsetRate: 0.76, costPerKw: 2750 },
    northwest: { sunFactor: 0.92, offsetRate: 0.72, costPerKw: 2800 }
  };

  function animateValue(el, start, end, duration, prefix = '', suffix = '', decimals = 0) {
    if (!el) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = start + (end - start) * (1 - Math.pow(1 - progress, 3));
      el.textContent = prefix + current.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }) + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  function calculateSolarSavings(animate = true) {
    const monthlyBill = Math.max(40, parseFloat(billInput?.value) || 220);
    const roofSqft = Math.max(250, parseFloat(roofInput?.value) || 1400);
    const regionKey = regionSelect?.value || 'southwest';
    const cfg = regionConfig[regionKey] || regionConfig.southwest;

    // Max kW roof can hold (~1 kW per 100 sqft usable roof area)
    const maxRoofKw = (roofSqft * 0.65) / 85;
    // Target kW needed based on bill
    const targetKw = (monthlyBill / 28) / cfg.sunFactor;
    const systemKw = Math.min(Math.max(3.0, targetKw), Math.max(3.5, maxRoofKw));

    // Monthly & annual savings
    const coverageRatio = Math.min(0.92, (systemKw / Math.max(1, targetKw)) * cfg.offsetRate);
    const monthlySavings = Math.round(monthlyBill * coverageRatio);
    const annualSavings = monthlySavings * 12;

    // 10-year savings with 3.5% average utility rate inflation
    let tenYearSavings = 0;
    for (let yr = 0; yr < 10; yr++) {
      tenYearSavings += annualSavings * Math.pow(1.035, yr);
    }
    tenYearSavings = Math.round(tenYearSavings);

    // Net system cost after 30% Federal Solar Tax Credit
    const grossCost = systemKw * cfg.costPerKw;
    const netCost = grossCost * 0.70;
    const paybackYears = Math.max(3.2, Math.min(12.5, netCost / Math.max(400, annualSavings)));

    if (resultPanel && animate) {
      resultPanel.classList.remove('calc-pulse');
      void resultPanel.offsetWidth; // reflow trigger
      resultPanel.classList.add('calc-pulse');
    }

    const dur = animate ? 650 : 0;
    animateValue(outSystemSize, 0, systemKw, dur, '', ' kW', 1);
    animateValue(outMonthly, 0, monthlySavings, dur, '$', '/mo', 0);
    animateValue(outAnnual, 0, annualSavings, dur, '$', '/yr', 0);
    animateValue(outTenYear, 0, tenYearSavings, dur, '$', '', 0);
    animateValue(outPayback, 0, paybackYears, dur, '', ' Yrs', 1);
  }

  if (calcBtn) {
    calcBtn.addEventListener('click', function (e) {
      e.preventDefault();
      calculateSolarSavings(true);
    });
    // Initial run on load
    calculateSolarSavings(false);
  }

  // --- Quote Form Handler ---
  const solarForm = document.getElementById('solarQuoteForm');
  if (solarForm) {
    solarForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = solarForm.querySelector('button[type="submit"]');
      const originalHtml = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating Solar Report...';
      btn.disabled = true;

      setTimeout(function () {
        btn.innerHTML = '<i class="fa-solid fa-check-circle"></i> Free Quote Requested!';
        alert('Thank you! A SolarPeak Energy Consultant will send your custom rooftop satellite assessment & savings report within 24 hours.');
        solarForm.reset();

        setTimeout(function () {
          btn.innerHTML = originalHtml;
          btn.disabled = false;
        }, 3000);
      }, 900);
    });
  }

  // --- Smooth Scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const el = document.querySelector(targetId);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});
