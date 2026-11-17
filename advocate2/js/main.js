/**
 * ApexTrial Advocates - Main JavaScript
 * Royal Elementor Theme & Royal Addons Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Inline Header
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 120) {
        header.classList.add('sticky-header');
      } else {
        header.classList.remove('sticky-header');
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

  // 4. Urgent Defense Form Submission (Royal Addons: royalform)
  const defenseForm = document.getElementById('urgentDefenseForm');
  const defenseModal = document.getElementById('defenseModal');
  const closeDefenseModal = document.getElementById('closeDefenseModal');
  const modalDefendantName = document.getElementById('modalDefendantName');
  const modalChargeType = document.getElementById('modalChargeType');

  if (defenseForm && defenseModal) {
    defenseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('defName').value.trim();
      const charge = document.getElementById('defCharge').value;

      if (modalDefendantName) modalDefendantName.textContent = name;
      if (modalChargeType) modalChargeType.textContent = charge;

      defenseModal.classList.add('active');
      defenseForm.reset();
    });
  }

  if (closeDefenseModal && defenseModal) {
    closeDefenseModal.addEventListener('click', () => {
      defenseModal.classList.remove('active');
    });

    defenseModal.addEventListener('click', (e) => {
      if (e.target === defenseModal) {
        defenseModal.classList.remove('active');
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
