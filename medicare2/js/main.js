/* =====================================================
   HeartAxis Cardiology — Main JS
   ===================================================== */

(function () {
  'use strict';

  /* ── Sticky Header ── */
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ── Mobile Nav Toggle ── */
  const navIcon = document.getElementById('navigation-icon');
  const deskMenu = document.querySelector('.desktopmenu');
  if (navIcon && deskMenu) {
    navIcon.addEventListener('click', () => {
      navIcon.classList.toggle('open');
      deskMenu.classList.toggle('open');
    });
  }

  /* ── Mobile Dropdown Toggle ── */
  document.querySelectorAll('.royalmenu > li > a').forEach(link => {
    if (link.closest('li').querySelector('.dropdown')) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 991) {
          e.preventDefault();
          const li = this.closest('li');
          li.classList.toggle('mobile-open');
        }
      });
    }
  });

  /* ── Smooth Scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset - 10;
        window.scrollTo({ top, behavior: 'smooth' });
        // close mobile menu
        if (deskMenu) deskMenu.classList.remove('open');
        if (navIcon) navIcon.classList.remove('open');
      }
    });
  });

  /* ── Counter Animation ── */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const isDecimal = target % 1 !== 0;
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 2000;
    const step = 16;
    const steps = duration / step;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
    }, step);
  }

  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (counters.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = '1';
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => observer.observe(c));
  }

  /* ── Risk Assessment Widget ── */
  const riskForm = document.getElementById('risk-form');
  const riskModal = document.getElementById('risk-modal');
  const riskClose = document.getElementById('risk-modal-close');
  const riskResult = document.getElementById('risk-result');

  if (riskForm) {
    riskForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const checked = riskForm.querySelectorAll('input[type="checkbox"]:checked').length;
      const total = riskForm.querySelectorAll('input[type="checkbox"]').length;
      let level, color, advice;

      if (checked === 0) {
        level = 'Low Risk';
        color = '#16a34a';
        advice = 'Great news! Your responses suggest a low cardiac risk profile. Continue healthy habits: regular exercise, balanced diet, and routine check-ups.';
      } else if (checked <= 2) {
        level = 'Moderate Risk';
        color = '#f59e0b';
        advice = 'You have some risk factors that warrant attention. We recommend scheduling a cardiac consultation with one of our specialists for a full evaluation.';
      } else if (checked <= 3) {
        level = 'High Risk';
        color = '#ea580c';
        advice = 'Multiple risk factors detected. Please schedule an urgent cardiac consultation. Early intervention significantly improves outcomes.';
      } else {
        level = 'Very High Risk';
        color = '#c0152a';
        advice = 'You have several significant cardiac risk factors. We strongly urge you to contact our emergency line or visit our Cath Lab immediately for assessment.';
      }

      riskResult.innerHTML = `
        <div style="text-align:center; padding: 10px 0 20px;">
          <div style="font-size:48px; margin-bottom:10px;">❤️</div>
          <div style="display:inline-block; background:${color}1a; border:2px solid ${color}; color:${color}; font-size:22px; font-weight:800; padding:10px 28px; border-radius:50px; margin-bottom:16px;">${level}</div>
          <p style="color:#334155; font-size:15px; line-height:1.7; max-width:400px; margin:0 auto 20px;">${advice}</p>
          <p style="color:#94a3b8; font-size:13px; margin-bottom:20px;">Risk factors checked: <strong style="color:#1a1a2e">${checked} of ${total}</strong></p>
          <a href="#appointment" onclick="document.getElementById('risk-modal').style.display='none'" style="display:inline-block;background:#c0152a;color:#fff;font-weight:700;font-size:15px;padding:12px 28px;border-radius:8px;text-decoration:none;">Book Cardiac Consultation</a>
        </div>
      `;
      riskModal.style.display = 'flex';
    });
  }

  if (riskClose) {
    riskClose.addEventListener('click', () => { riskModal.style.display = 'none'; });
  }
  if (riskModal) {
    riskModal.addEventListener('click', (e) => {
      if (e.target === riskModal) riskModal.style.display = 'none';
    });
  }

  /* ── Appointment Form ── */
  const apptForm = document.getElementById('appointment-form');
  const apptModal = document.getElementById('appt-modal');
  const apptClose = document.getElementById('appt-modal-close');

  if (apptForm) {
    apptForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (apptModal) apptModal.style.display = 'flex';
    });
  }
  if (apptClose) {
    apptClose.addEventListener('click', () => { apptModal.style.display = 'none'; });
  }
  if (apptModal) {
    apptModal.addEventListener('click', (e) => {
      if (e.target === apptModal) apptModal.style.display = 'none';
    });
  }

  /* ── Procedure Card Hover Ripple ── */
  document.querySelectorAll('.proc-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.classList.add('hovered');
    });
    card.addEventListener('mouseleave', function () {
      this.classList.remove('hovered');
    });
  });

  /* ── Active nav on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.royalmenu > li > a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      const top = s.offsetTop - (header ? header.offsetHeight + 20 : 80);
      if (window.scrollY >= top) current = s.id;
    });
    navLinks.forEach(link => {
      link.closest('li').classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.closest('li').classList.add('active');
      }
    });
  });

  /* ── Announcement bar dismiss ── */
  const htClose = document.getElementById('ht-close');
  const ht = document.querySelector('.headertop');
  if (htClose && ht) {
    htClose.addEventListener('click', () => {
      ht.style.display = 'none';
    });
  }

})();
