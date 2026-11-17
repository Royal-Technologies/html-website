/**
 * HavenFamily & Estate Law Studio - Main JavaScript
 * Royal Elementor Theme & Royal Addons Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation on Scroll
  const navMenu = document.querySelector('.desktopmenu');
  if (navMenu) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 130) {
        navMenu.classList.add('sticky-header');
      } else {
        navMenu.classList.remove('sticky-header');
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

  // 3. Multi-Office Locator (Royal Addons: royalbrancheslocator)
  const branchBtns = document.querySelectorAll('.branch-tab-btn');
  const branchTitle = document.getElementById('branchTitle');
  const branchAddress = document.getElementById('branchAddress');
  const branchPhone = document.getElementById('branchPhone');
  const branchHours = document.getElementById('branchHours');

  const branchData = {
    manhattan: {
      title: 'Manhattan Central Chambers',
      address: '450 Lexington Ave, Suite 2200, New York, NY 10017',
      phone: '+1 (212) 555-7301',
      hours: 'Mon-Fri 8:30 AM – 6:30 PM | Private Evening Consultations'
    },
    brooklyn: {
      title: 'Brooklyn Heights Mediation Suite',
      address: '1 Pierrepont Plaza, 12th Floor, Brooklyn, NY 11201',
      phone: '+1 (718) 555-7302',
      hours: 'Mon-Fri 9:00 AM – 6:00 PM | Sat by Appointment'
    },
    westchester: {
      title: 'Westchester Estate Planning Office',
      address: '360 Hamilton Ave, White Plains, NY 10601',
      phone: '+1 (914) 555-7303',
      hours: 'Mon-Fri 9:00 AM – 5:30 PM'
    }
  };

  branchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      branchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.getAttribute('data-branch');
      const data = branchData[key];
      if (data) {
        if (branchTitle) branchTitle.textContent = data.title;
        if (branchAddress) branchAddress.textContent = data.address;
        if (branchPhone) {
          branchPhone.textContent = data.phone;
          branchPhone.setAttribute('href', `tel:${data.phone.replace(/[^0-9+]/g, '')}`);
        }
        if (branchHours) branchHours.textContent = data.hours;
      }
    });
  });

  // 4. FAQ Accordion Toggle (Royal Addons: royalaccordion)
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

  // 5. Confidential Intake Form Submission (Royal Addons: royalform)
  const intakeForm = document.getElementById('familyIntakeForm');
  const intakeModal = document.getElementById('intakeModal');
  const closeIntakeModal = document.getElementById('closeIntakeModal');
  const modalFamilyName = document.getElementById('modalFamilyName');
  const modalServiceType = document.getElementById('modalServiceType');

  if (intakeForm && intakeModal) {
    intakeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('familyName').value.trim();
      const service = document.getElementById('familyService').value;

      if (modalFamilyName) modalFamilyName.textContent = name;
      if (modalServiceType) modalServiceType.textContent = service;

      intakeModal.classList.add('active');
      intakeForm.reset();
    });
  }

  if (closeIntakeModal && intakeModal) {
    closeIntakeModal.addEventListener('click', () => {
      intakeModal.classList.remove('active');
    });

    intakeModal.addEventListener('click', (e) => {
      if (e.target === intakeModal) {
        intakeModal.classList.remove('active');
      }
    });
  }

  // 6. Smooth Scrolling
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
