// Crestwood University - Main JavaScript
document.addEventListener('DOMContentLoaded', function () {
  // Sticky header scroll effect
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Mobile menu toggle
  const navIcon = document.getElementById('navigation-icon');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (navIcon && mobileMenu) {
    navIcon.addEventListener('click', function () {
      navIcon.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });
  }

  // Mobile dropdown toggle
  const mobileSubs = document.querySelectorAll('.mobile-menu .has-sub > a');
  mobileSubs.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const sub = this.nextElementSibling;
      if (sub) {
        sub.classList.toggle('open');
        const icon = this.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-chevron-down');
          icon.classList.toggle('fa-chevron-up');
        }
      }
    });
  });

  // Close mobile menu on leaf link click
  const mobileLinks = document.querySelectorAll('.mobile-menu a:not(.sub-toggle)');
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        if (navIcon) navIcon.classList.remove('active');
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // University Admission Application Form
  const applyForm = document.getElementById('universityApplyForm');
  const applyFeedback = document.getElementById('applyFeedback');
  if (applyForm) {
    applyForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const applicantName = document.getElementById('applicantName').value.trim();
      const program = document.getElementById('applicantProgram').value;
      const intake = document.getElementById('applicantIntake').value;
      const refNum = 'CWU-' + Math.floor(100000 + Math.random() * 900000);

      if (applyFeedback) {
        applyFeedback.innerHTML =
          '<div style="background:#f0fdf4;border:1.5px solid #16a34a;color:#14532d;padding:14px 16px;border-radius:8px;margin-top:16px;font-size:13.5px;line-height:1.5;">' +
          '<i class="fa-solid fa-circle-check" style="color:#16a34a;margin-right:8px;"></i>' +
          '<strong>Application Submitted (' + refNum + ')</strong><br>' +
          'Thank you, ' + applicantName + '. Your application for <strong>' + program + '</strong> (' + intake + ') has been logged with the Office of Admissions.' +
          '</div>';
      }
      applyForm.reset();
    });
  }
});
