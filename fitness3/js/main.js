/* ============================================================
   Velvet Beauty & Day Spa — Main JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Sticky Header ---- */
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ---- Mobile Menu Toggle ---- */
  const navIcon = document.getElementById('navigation-icon');
  const deskMenu = document.querySelector('.desktopmenu');

  if (navIcon && deskMenu) {
    navIcon.addEventListener('click', function () {
      navIcon.classList.toggle('open');
      deskMenu.classList.toggle('mobile-open');
    });
  }

  /* ---- Dropdown Toggle (mobile tap) ---- */
  const hasDropdowns = document.querySelectorAll('.royalmenu > li.has-dropdown > a');
  hasDropdowns.forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        const parent = link.closest('li');
        parent.classList.toggle('open');
      }
    });
  });

  /* ---- Smooth Scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        // Close mobile menu if open
        if (deskMenu) deskMenu.classList.remove('mobile-open');
        if (navIcon) navIcon.classList.remove('open');
        const offset = header ? header.offsetHeight : 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ---- Date Input Min = Today ---- */
  const dateInputs = document.querySelectorAll('input[type="date"]');
  const today = new Date().toISOString().split('T')[0];
  dateInputs.forEach(function (inp) {
    inp.setAttribute('min', today);
  });

  /* ---- Appointment Form Submission ---- */
  const appointForm = document.getElementById('appointment-form');
  if (appointForm) {
    appointForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = appointForm.querySelector('[name="client-name"]');
      const btn = appointForm.querySelector('[type="submit"]');
      const nameVal = name ? name.value.trim() : 'Valued Guest';

      // Show success
      const successDiv = document.getElementById('form-success');
      if (successDiv) {
        successDiv.innerHTML = `
          <div class="success-message">
            <i class="fa-solid fa-heart"></i>
            <h3>Thank You, ${nameVal}!</h3>
            <p>Your appointment request has been received. Our team will confirm your booking within 24 hours.</p>
          </div>`;
        successDiv.style.display = 'block';
        appointForm.style.display = 'none';
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        alert(`Thank you, ${nameVal}! Your appointment has been received.`);
        appointForm.reset();
      }
    });
  }

  /* ---- Gift Card Selection ---- */
  const giftCards = document.querySelectorAll('.gift-option');
  giftCards.forEach(function (card) {
    card.addEventListener('click', function () {
      giftCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });

  /* ---- Scroll Reveal Animation ---- */
  const revealEls = document.querySelectorAll(
    '.royalcardmaker, .royalteam .team-card, .royalreview .review-card, .service-category, .gift-option'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ---- Hero Parallax (subtle) ---- */
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    window.addEventListener('scroll', function () {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroSection.style.backgroundPositionY = `calc(50% + ${scrollY * 0.3}px)`;
      }
    });
  }

});
