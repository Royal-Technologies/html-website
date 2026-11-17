/**
 * ApexOrtho - Main JavaScript
 * Royal Elementor Theme & Royal Addons Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation Bar
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

  // 3. Before & After Slider (Royal Addons: royalimagecompare)
  const compareWrapper = document.getElementById('orthoCompareSlider');
  const compareAfter = document.getElementById('orthoCompareAfter');
  const compareHandle = document.getElementById('orthoCompareHandle');
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

  // 4. Interactive Symptom Matcher in Hero
  const symptomChips = document.querySelectorAll('.symptom-chip');
  const symptomText = document.getElementById('symptomMatchText');

  const symptomData = {
    crowding: 'Recommended: Damon Clear Braces or Invisalign Platinum Aligners (12-18 Months)',
    wisdom: 'Recommended: 3D CBCT Scan & Pain-Free Ultrasonic Wisdom Teeth Extraction',
    implant: 'Recommended: Computer-Guided 3D Titanium Implant with Same-Day Temporary Crown',
    tmj: 'Recommended: TMJ Decompression Splint & Neuromuscular Joint Alignment Therapy'
  };

  symptomChips.forEach(chip => {
    chip.addEventListener('click', () => {
      symptomChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const key = chip.getAttribute('data-symptom');
      if (symptomText && symptomData[key]) {
        symptomText.innerHTML = `<strong>Selected:</strong> ${symptomData[key]}`;
      }
    });
  });

  // 5. Multi-Branch Clinic Switcher (Royal Addons: royalbrancheslocator)
  const branchBtns = document.querySelectorAll('.branch-tab-btn');
  const branchTitle = document.getElementById('branchTitle');
  const branchAddress = document.getElementById('branchAddress');
  const branchPhone = document.getElementById('branchPhone');
  const branchHours = document.getElementById('branchHours');
  const branchSurgeons = document.getElementById('branchSurgeons');

  const branchData = {
    downtown: {
      title: 'Downtown Surgical & Implant Center',
      address: '100 Broadway, Suite 1400, Financial District, NY',
      phone: '+1 (212) 555-8801',
      hours: 'Mon-Fri 7:30 AM – 6:30 PM | Sat 8:00 AM – 3:00 PM',
      surgeons: 'Dr. Arthur Sterling, DDS & Dr. Maya Lin, MS'
    },
    midtown: {
      title: 'Midtown Advanced Orthodontics Pavilion',
      address: '375 Lexington Ave, 9th Floor, Midtown Manhattan, NY',
      phone: '+1 (212) 555-8802',
      hours: 'Mon-Fri 8:00 AM – 7:00 PM | Sat by Appointment',
      surgeons: 'Dr. Tariq Rahman, DMD & Dr. Arthur Sterling, DDS'
    },
    northpoint: {
      title: 'North Point Maxillofacial Trauma Suite',
      address: '880 3rd Avenue, Medical Arts Building, NY',
      phone: '+1 (212) 555-8803',
      hours: '24/7 Acute Dental Trauma & On-Call Emergency Service',
      surgeons: 'Dr. Maya Lin, MS & On-Call Trauma Fellows'
    }
  };

  branchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      branchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const bKey = btn.getAttribute('data-branch');
      const data = branchData[bKey];
      if (data) {
        if (branchTitle) branchTitle.textContent = data.title;
        if (branchAddress) branchAddress.textContent = data.address;
        if (branchPhone) {
          branchPhone.textContent = data.phone;
          branchPhone.setAttribute('href', `tel:${data.phone.replace(/[^0-9+]/g, '')}`);
        }
        if (branchHours) branchHours.textContent = data.hours;
        if (branchSurgeons) branchSurgeons.textContent = data.surgeons;
      }
    });
  });

  // 6. Clinical FAQ Accordion (Royal Addons: royalaccordion)
  const faqItems = document.querySelectorAll('.c-faq-item');
  faqItems.forEach(item => {
    const qBtn = item.querySelector('.c-faq-q');
    if (qBtn) {
      qBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    }
  });

  // 7. Surgical Triage Form Submission & Modal (Royal Addons: royalform)
  const triageForm = document.getElementById('triageForm');
  const triageModal = document.getElementById('triageModal');
  const closeTriageModal = document.getElementById('closeTriageModal');
  const triagePatientName = document.getElementById('triagePatientName');
  const triageCaseSummary = document.getElementById('triageCaseSummary');

  if (triageForm && triageModal) {
    triageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('tName').value.trim();
      const procedure = document.getElementById('tProcedure').value;
      const urgency = document.getElementById('tUrgency').value;

      if (triagePatientName) triagePatientName.textContent = name;
      if (triageCaseSummary) {
        triageCaseSummary.textContent = `${procedure} (${urgency})`;
      }

      triageModal.classList.add('active');
      triageForm.reset();
    });
  }

  if (closeTriageModal && triageModal) {
    closeTriageModal.addEventListener('click', () => {
      triageModal.classList.remove('active');
    });

    triageModal.addEventListener('click', (e) => {
      if (e.target === triageModal) {
        triageModal.classList.remove('active');
      }
    });
  }

  // 8. Smooth Scrolling
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
