/**
 * JusticeShield Law Firm - Main JavaScript
 * Royal Elementor Theme & Royal Addons Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation on Scroll
  const desktopMenu = document.querySelector('.desktopmenu');
  if (desktopMenu) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 130) {
        desktopMenu.classList.add('sticky-header');
      } else {
        desktopMenu.classList.remove('sticky-header');
      }
    });
  }

  // 2. Mobile Drawer Navigation
  const mobileTrigger = document.querySelector('.navigation-icon');
  const mobileDrawer = document.getElementById('mobileNavigationDrawer');
  const mobileOverlay = document.getElementById('mobileNavigationOverlay');
  const mobileClose = document.querySelector('.mobile-drawer-close');

  function openMobileMenu() {
    if (mobileDrawer && mobileOverlay) {
      mobileDrawer.classList.add('active');
      mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    if (mobileDrawer && mobileOverlay) {
      mobileDrawer.classList.remove('active');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileTrigger) mobileTrigger.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

  document.querySelectorAll('.mobile-nav-list a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // 3. FAQ Accordion Toggle (Royal Addons: royalaccordion)
  const faqRows = document.querySelectorAll('.faq-row');
  faqRows.forEach(row => {
    const btn = row.querySelector('.faq-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = row.classList.contains('active');
        faqRows.forEach(other => other.classList.remove('active'));
        if (!isActive) row.classList.add('active');
      });
    }
  });

  // 4. Case Evaluation Form Submission (Royal Addons: royalform)
  const evalForm = document.getElementById('caseEvalForm');
  const evalModal = document.getElementById('evalModal');
  const closeEvalModal = document.getElementById('closeEvalModal');
  const modalClientName = document.getElementById('modalClientName');
  const modalArea = document.getElementById('modalArea');

  if (evalForm && evalModal) {
    evalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('clientName').value.trim();
      const area = document.getElementById('clientPracticeArea').value;

      if (modalClientName) modalClientName.textContent = name;
      if (modalArea) modalArea.textContent = area;

      evalModal.classList.add('active');
      evalForm.reset();
    });
  }

  if (closeEvalModal && evalModal) {
    closeEvalModal.addEventListener('click', () => {
      evalModal.classList.remove('active');
    });

    evalModal.addEventListener('click', (e) => {
      if (e.target === evalModal) {
        evalModal.classList.remove('active');
      }
    });
  }

  // 5. Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
