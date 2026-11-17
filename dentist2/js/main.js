/**
 * LuminaSmile - Main JavaScript
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

  // 3. Before & After Image Comparison Slider (Royal Addons: royalimagecompare)
  const compareWrapper = document.getElementById('smileCompareSlider');
  const compareAfter = document.getElementById('smileCompareAfter');
  const compareHandle = document.getElementById('smileCompareHandle');
  const compareInnerImg = document.querySelector('.compare-img-inner');

  if (compareWrapper && compareAfter && compareHandle) {
    let isDown = false;

    function updateInnerImgWidth() {
      if (compareInnerImg) {
        compareInnerImg.style.width = `${compareWrapper.offsetWidth}px`;
      }
    }

    updateInnerImgWidth();
    window.addEventListener('resize', updateInnerImgWidth);

    function moveCompare(clientX) {
      const rect = compareWrapper.getBoundingClientRect();
      let positionX = clientX - rect.left;

      if (positionX < 0) positionX = 0;
      if (positionX > rect.width) positionX = rect.width;

      const percentage = (positionX / rect.width) * 100;
      compareAfter.style.width = `${percentage}%`;
      compareHandle.style.left = `${percentage}%`;
    }

    compareWrapper.addEventListener('mousedown', (e) => {
      isDown = true;
      moveCompare(e.clientX);
    });

    window.addEventListener('mouseup', () => { isDown = false; });
    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      moveCompare(e.clientX);
    });

    // Touch events for mobile
    compareWrapper.addEventListener('touchstart', (e) => {
      isDown = true;
      moveCompare(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => { isDown = false; });
    window.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      moveCompare(e.touches[0].clientX);
    }, { passive: true });
  }

  // 4. FAQ Accordion Toggle (Royal Addons: royalaccordion)
  const faqRows = document.querySelectorAll('.faq-row');
  faqRows.forEach(row => {
    const questionBtn = row.querySelector('.faq-q');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = row.classList.contains('active');
        faqRows.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          row.classList.add('active');
        }
      });
    }
  });

  // 5. Consultation Form & Confirmation Modal (Royal Addons: royalform)
  const consultForm = document.getElementById('consultForm');
  const consultModal = document.getElementById('consultModal');
  const closeConsultModal = document.getElementById('closeConsultModal');
  const modalClientName = document.getElementById('modalClientName');
  const modalPackage = document.getElementById('modalPackage');

  if (consultForm && consultModal) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cName').value.trim();
      const service = document.getElementById('cTreatment').value;

      if (modalClientName) modalClientName.textContent = name;
      if (modalPackage) modalPackage.textContent = service;

      consultModal.classList.add('active');
      consultForm.reset();
    });
  }

  if (closeConsultModal && consultModal) {
    closeConsultModal.addEventListener('click', () => {
      consultModal.classList.remove('active');
    });

    consultModal.addEventListener('click', (e) => {
      if (e.target === consultModal) {
        consultModal.classList.remove('active');
      }
    });
  }

  // 6. Smooth Scrolling for Internal Links
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
