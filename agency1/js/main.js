/**
 * VelocityGrowth Digital Marketing Agency — Main JavaScript
 * Author: Royal Technologies (https://www.royaltechbd.com)
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // ======= 1. Mobile Menu Toggle =======
  const navIcon = document.getElementById('navigation-icon');
  const royalMenu = document.querySelector('.royalmenu');

  if (navIcon && royalMenu) {
    navIcon.addEventListener('click', function () {
      royalMenu.classList.toggle('mobile-open');
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

  // ======= 2. Case Studies Filter =======
  const filterBtns = document.querySelectorAll('.filter-btn');
  const caseCards = document.querySelectorAll('.case-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      caseCards.forEach(function (card) {
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

  // ======= 3. Pricing Billing Switch (Monthly / Annual) =======
  const switchBox = document.getElementById('billingSwitch');
  const amounts = document.querySelectorAll('.price-amount');

  if (switchBox) {
    switchBox.addEventListener('click', function () {
      this.classList.toggle('annual');
      const isAnnual = this.classList.contains('annual');

      amounts.forEach(function (amt) {
        const monthly = amt.getAttribute('data-monthly');
        const annual = amt.getAttribute('data-annual');
        amt.textContent = isAnnual ? annual : monthly;
      });
    });
  }

  // ======= 4. Growth Audit Form & Modal =======
  const auditForm = document.getElementById('auditForm');
  const modal = document.getElementById('auditModal');
  const modalClose = document.getElementById('modalCloseBtn');
  const modalClientName = document.getElementById('modalClientName');
  const modalWebsite = document.getElementById('modalWebsite');

  if (auditForm) {
    auditForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('aName').value;
      const url = document.getElementById('aWebsite').value;

      modalClientName.textContent = name;
      modalWebsite.textContent = url;
      modal.classList.add('active');
      auditForm.reset();
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

  // ======= 5. Smooth Scrolling =======
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = document.querySelector('.desktopmenu') ? document.querySelector('.desktopmenu').offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        if (royalMenu) royalMenu.classList.remove('mobile-open');
      }
    });
  });
});
