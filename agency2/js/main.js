/**
 * DevMatrix Custom Software & Cloud — JavaScript Interactions
 * Author: Royal Technologies
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const navIcon = document.getElementById('navigation-icon');
  const desktopMenu = document.querySelector('.desktopmenu');

  if (navIcon && desktopMenu) {
    navIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      navIcon.classList.toggle('active');
      desktopMenu.classList.toggle('active');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!desktopMenu.contains(e.target) && !navIcon.contains(e.target)) {
        navIcon.classList.remove('active');
        desktopMenu.classList.remove('active');
      }
    });

    // Submenu toggle on mobile
    const menuItems = desktopMenu.querySelectorAll('.menu-item-has-children > a');
    menuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          const parent = item.parentElement;
          parent.classList.toggle('open');
        }
      });
    });
  }

  // Header Sticky Shadow
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Project Estimation Form
  const estimateForm = document.getElementById('estimateForm');
  const modal = document.getElementById('estimateModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (estimateForm && modal) {
    estimateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('estName').value || 'Innovator';
      const type = document.getElementById('estType').value || 'Custom Project';
      
      const modalMsg = document.getElementById('modalMessage');
      if (modalMsg) {
        modalMsg.textContent = `Thank you, ${name}! We have received your scope requirements for "${type}". Our solutions architect will review the tech stack and reach out within 4 business hours with an engineering proposal.`;
      }
      
      modal.classList.add('active');
      estimateForm.reset();
    });
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElem = document.querySelector(targetId);
        if (targetElem) {
          e.preventDefault();
          targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (desktopMenu) desktopMenu.classList.remove('active');
          if (navIcon) navIcon.classList.remove('active');
        }
      }
    });
  });
});
