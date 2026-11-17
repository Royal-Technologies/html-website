/**
 * DentCare Pro - Main JavaScript
 * Royal Elementor Theme & Royal Addons Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation on Scroll
  const desktopMenu = document.querySelector('.desktopmenu');
  if (desktopMenu) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 140) {
        desktopMenu.classList.add('sticky-header');
      } else {
        desktopMenu.classList.remove('sticky-header');
      }
    });
  }

  // 2. Mobile Menu Drawer Toggle
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

  // Close mobile menu when clicking menu items
  document.querySelectorAll('.mobile-nav-list a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // 3. Before & After Image Comparison Slider (Royal Addons: royalimagecompare)
  const compareWrapper = document.getElementById('compareSlider');
  const compareAfter = document.getElementById('compareAfter');
  const compareHandle = document.getElementById('compareHandle');
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

    window.addEventListener('mouseup', () => {
      isDown = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      moveCompare(e.clientX);
    });

    // Touch Support
    compareWrapper.addEventListener('touchstart', (e) => {
      isDown = true;
      moveCompare(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDown = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      moveCompare(e.touches[0].clientX);
    }, { passive: true });
  }

  // 4. Highlight Today's Opening Hours
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDayName = days[new Date().getDay()];
  const todayRow = document.querySelector(`[data-day="${currentDayName}"]`);
  if (todayRow) {
    todayRow.classList.add('today-highlight');
  }

  // 5. FAQ Accordion Toggle (Royal Addons: royalaccordion)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 6. Appointment Form Submission & Modal (Royal Addons: royalform)
  const bookingForm = document.getElementById('dentistBookingForm');
  const bookingModal = document.getElementById('bookingModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalPatientName = document.getElementById('modalPatientName');
  const modalAppointmentDetails = document.getElementById('modalAppointmentDetails');

  if (bookingForm && bookingModal) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('patientName').value.trim();
      const phone = document.getElementById('patientPhone').value.trim();
      const service = document.getElementById('patientService').value;
      const date = document.getElementById('patientDate').value;
      const time = document.getElementById('patientTime').value;

      if (!name || !phone || !service || !date) {
        alert('Please fill in all required fields.');
        return;
      }

      if (modalPatientName) modalPatientName.textContent = name;
      if (modalAppointmentDetails) {
        modalAppointmentDetails.textContent = `${service} on ${date} at ${time}`;
      }

      bookingModal.classList.add('active');
      bookingForm.reset();
    });
  }

  if (closeModalBtn && bookingModal) {
    closeModalBtn.addEventListener('click', () => {
      bookingModal.classList.remove('active');
    });

    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        bookingModal.classList.remove('active');
      }
    });
  }

  // 7. Smooth scrolling for internal anchor links
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
