/**
 * ApexLiving Luxury Real Estate — Main JavaScript
 * Author: Royal Technologies (https://www.royaltechbd.com)
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // ======= 1. Sticky Header =======
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ======= 2. Mobile Menu Toggle =======
  const navIcon = document.getElementById('navigation-icon');
  const desktopMenu = document.querySelector('.desktopmenu');

  if (navIcon && desktopMenu) {
    navIcon.addEventListener('click', function () {
      desktopMenu.classList.toggle('mobile-open');
    });
  }

  // Mobile submenu accordion
  const parentMenuItems = document.querySelectorAll('.royalmenu li.menu-item-has-children > a');
  parentMenuItems.forEach(function (item) {
    item.addEventListener('click', function (e) {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        const parent = this.parentElement;
        parent.classList.toggle('open');
      }
    });
  });

  // ======= 3. Property Filter Tabs =======
  const filterBtns = document.querySelectorAll('.filter-btn');
  const estateCards = document.querySelectorAll('.estate-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      estateCards.forEach(function (card) {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          setTimeout(() => { card.style.opacity = '1'; }, 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });

  // ======= 4. Interactive Mortgage Calculator =======
  const priceRange = document.getElementById('calcPrice');
  const downRange = document.getElementById('calcDown');
  const rateRange = document.getElementById('calcRate');
  const yearsRange = document.getElementById('calcYears');

  const priceVal = document.getElementById('priceVal');
  const downVal = document.getElementById('downVal');
  const rateVal = document.getElementById('rateVal');
  const yearsVal = document.getElementById('yearsVal');
  const monthlyRes = document.getElementById('monthlyPayment');
  const loanPrincipal = document.getElementById('loanPrincipal');

  function calculateMortgage() {
    if (!priceRange) return;
    const price = parseFloat(priceRange.value);
    const downPercent = parseFloat(downRange.value);
    const annualRate = parseFloat(rateRange.value) / 100;
    const years = parseFloat(yearsRange.value);

    const downPayment = (price * downPercent) / 100;
    const principal = price - downPayment;
    const monthlyRate = annualRate / 12;
    const totalMonths = years * 12;

    let monthly = 0;
    if (monthlyRate > 0) {
      monthly = (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else {
      monthly = principal / totalMonths;
    }

    priceVal.textContent = '$' + price.toLocaleString();
    downVal.textContent = downPercent + '% ($' + Math.round(downPayment).toLocaleString() + ')';
    rateVal.textContent = rateRange.value + '%';
    yearsVal.textContent = years + ' Years';

    monthlyRes.textContent = '$' + Math.round(monthly).toLocaleString() + '/mo';
    loanPrincipal.textContent = 'Principal Loan: $' + Math.round(principal).toLocaleString();
  }

  if (priceRange) {
    [priceRange, downRange, rateRange, yearsRange].forEach(input => {
      input.addEventListener('input', calculateMortgage);
    });
    calculateMortgage();
  }

  // ======= 5. Neighborhood Tabs Switcher =======
  const nTabs = document.querySelectorAll('.n-tab-btn');
  const nContents = {
    tribeca: {
      title: 'TriBeCa & SoHo Penthouse District',
      desc: 'Cobblestone streets, world-renowned dining, and architectural cast-iron lofts offering supreme privacy and private rooftop terraces.',
      h1: '<i class="bi bi-shield-check"></i> 24/7 Doorman & Concierge',
      h2: '<i class="bi bi-star-fill"></i> Michelin-Star Dining Proximity',
      h3: '<i class="bi bi-car-front-fill"></i> Private Subterranean Parking',
      h4: '<i class="bi bi-sun-fill"></i> Private Rooftop Gardens',
      img: 'images/prop-2.jpg'
    },
    beverly: {
      title: 'Beverly Hills & Bel Air Private Gated Enclaves',
      desc: 'Exclusive sprawling acreage nestled behind high hedges, offering infinity-edge pools, cinematic canyon views, and unmatched security.',
      h1: '<i class="bi bi-camera-video-fill"></i> Gated 24/7 Armed Patrol',
      h2: '<i class="bi bi-water"></i> Heated Olympic Infinity Pools',
      h3: '<i class="bi bi-tree-fill"></i> 2+ Acre Sprawling Grounds',
      h4: '<i class="bi bi-house-heart-fill"></i> Full Guest Houses & Tennis Courts',
      img: 'images/prop-1.jpg'
    },
    miami: {
      title: 'Star Island & Biscayne Waterfront Estates',
      desc: 'Direct Atlantic and bay access with private deep-water superyacht docks, lush tropical landscaping, and contemporary floor-to-ceiling glass pavilions.',
      h1: '<i class="bi bi-anchor"></i> 120-Foot Superyacht Docks',
      h2: '<i class="bi bi-brightness-high-fill"></i> Floor-to-Ceiling Hurricane Glass',
      h3: '<i class="bi bi-shield-lock-fill"></i> Island Access Control Gate',
      h4: '<i class="bi bi-trophy-fill"></i> Private Beach Pavilions',
      img: 'images/prop-4.jpg'
    }
  };

  nTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      nTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      const target = this.getAttribute('data-target');
      const data = nContents[target];
      if (data) {
        document.getElementById('nTitle').textContent = data.title;
        document.getElementById('nDesc').textContent = data.desc;
        document.getElementById('nH1').innerHTML = data.h1;
        document.getElementById('nH2').innerHTML = data.h2;
        document.getElementById('nH3').innerHTML = data.h3;
        document.getElementById('nH4').innerHTML = data.h4;
        document.getElementById('nImg').src = data.img;
      }
    });
  });

  // ======= 6. Private Viewing Form & Modal =======
  const viewingForm = document.getElementById('viewingForm');
  const modal = document.getElementById('bookingModal');
  const modalClose = document.getElementById('modalCloseBtn');
  const modalClientName = document.getElementById('modalClientName');
  const modalProp = document.getElementById('modalProp');

  if (viewingForm) {
    viewingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('vName').value;
      const prop = document.getElementById('vProp').value;

      modalClientName.textContent = name;
      modalProp.textContent = prop;
      modal.classList.add('active');
      viewingForm.reset();
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', function () {
      modal.classList.remove('active');
    });
  }
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  // ======= 7. Smooth Scroll =======
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        if (desktopMenu) desktopMenu.classList.remove('mobile-open');
      }
    });
  });
});
