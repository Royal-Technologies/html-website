/**
 * ArchVogue Architecture & Interior Design — Main JavaScript
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

  // ======= 2. Interactive Draggable Image Compare Slider (royalimagecompare) =======
  const wrapper = document.querySelector('.royal-compare-wrapper');
  const overlay = document.querySelector('.royal-compare-overlay');
  const handle = document.querySelector('.royal-compare-handle');

  if (wrapper && overlay && handle) {
    let isDragging = false;

    function updateSlider(x) {
      const rect = wrapper.getBoundingClientRect();
      let pos = x - rect.left;
      if (pos < 0) pos = 0;
      if (pos > rect.width) pos = rect.width;
      const percentage = (pos / rect.width) * 100;

      overlay.style.width = percentage + '%';
      handle.style.left = percentage + '%';
    }

    // Mouse events
    wrapper.addEventListener('mousedown', function (e) {
      isDragging = true;
      updateSlider(e.clientX);
    });

    window.addEventListener('mouseup', function () {
      isDragging = false;
    });

    window.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      updateSlider(e.clientX);
    });

    // Touch events for mobile
    wrapper.addEventListener('touchstart', function (e) {
      isDragging = true;
      if (e.touches[0]) updateSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', function () {
      isDragging = false;
    });

    window.addEventListener('touchmove', function (e) {
      if (!isDragging || !e.touches[0]) return;
      updateSlider(e.touches[0].clientX);
    }, { passive: true });
  }

  // ======= 3. Consultation Form & Modal =======
  const consultForm = document.getElementById('consultForm');
  const modal = document.getElementById('consultModal');
  const modalClose = document.getElementById('modalCloseBtn');
  const modalClientName = document.getElementById('modalClientName');
  const modalService = document.getElementById('modalService');

  if (consultForm) {
    consultForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('cName').value;
      const service = document.getElementById('cService').value;

      modalClientName.textContent = name;
      modalService.textContent = service;
      modal.classList.add('active');
      consultForm.reset();
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
