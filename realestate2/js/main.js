/**
 * MetroTower Commercial Real Estate — Main JavaScript
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

  // ======= 2. Floor Plan Switcher =======
  const planBtns = document.querySelectorAll('.plan-btn');
  const planData = {
    full: {
      title: 'Full-Floor Corporate Headquarters',
      desc: 'Direct dual-elevator core access, 360-degree panoramic glass curtain walls, 8 executive corner boardrooms, and open agile workstations for 250+ personnel.',
      s1: '28,500 RSF',
      s2: 'Floors 38 – 52',
      s3: '14 Executive Corners',
      s4: 'Private Dedicated Lobbies',
      img: 'images/office-1.jpg'
    },
    tech: {
      title: 'High-Density Creative Tech Loft',
      desc: 'Exposed structural steel, polished acoustic concrete floors, high-capacity server rack rooms, integrated podcast studios, and town-hall bleacher seating.',
      s1: '16,200 RSF',
      s2: 'Floors 18 – 24',
      s3: '6 Meeting Pods',
      s4: 'Dual Fiber-Optic Riser',
      img: 'images/office-3.jpg'
    },
    suite: {
      title: 'Executive Spec Suites (Plug & Play)',
      desc: 'Turnkey fully furnished executive suites complete with Herman Miller ergonomic workstations, state-of-the-art teleconferencing rooms, and shared barista lounge.',
      s1: '4,500 – 8,000 RSF',
      s2: 'Floors 10 – 16',
      s3: '2 – 4 Private Offices',
      s4: 'Immediate Occupancy',
      img: 'images/office-2.jpg'
    }
  };

  planBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      planBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const target = this.getAttribute('data-plan');
      const data = planData[target];
      if (data) {
        document.getElementById('planTitle').textContent = data.title;
        document.getElementById('planDesc').textContent = data.desc;
        document.getElementById('planS1').textContent = data.s1;
        document.getElementById('planS2').textContent = data.s2;
        document.getElementById('planS3').textContent = data.s3;
        document.getElementById('planS4').textContent = data.s4;
        document.getElementById('planImg').src = data.img;
      }
    });
  });

  // ======= 3. Walkthrough Form & Modal =======
  const walkForm = document.getElementById('walkthroughForm');
  const modal = document.getElementById('walkModal');
  const modalClose = document.getElementById('modalCloseBtn');
  const modalTenantName = document.getElementById('modalTenantName');
  const modalBuilding = document.getElementById('modalBuilding');

  if (walkForm) {
    walkForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('wName').value;
      const bldg = document.getElementById('wSpace').value;

      modalTenantName.textContent = name;
      modalBuilding.textContent = bldg;
      modal.classList.add('active');
      walkForm.reset();
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

  // ======= 4. Smooth Scrolling =======
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
