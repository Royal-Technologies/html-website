// BrightMinds Academy - Main JavaScript
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

  // Close mobile menu when clicking a link (non-dropdown)
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

  // Admission form submission
  const admissionForm = document.getElementById('admissionForm');
  const formFeedback = document.getElementById('formFeedback');
  if (admissionForm) {
    admissionForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const childName = document.getElementById('childName').value.trim();
      const parentName = document.getElementById('parentName').value.trim();
      const grade = document.getElementById('childGrade').value;

      if (formFeedback) {
        formFeedback.innerHTML =
          '<div style="background:#ecfdf5;border:1.5px solid #10b981;color:#065f46;padding:14px 16px;border-radius:12px;margin-top:16px;font-weight:700;font-size:14px;">' +
          '<i class="fa-solid fa-circle-check" style="color:#10b981;margin-right:8px;"></i>' +
          'Thank you, ' + parentName + '! Admission inquiry for <strong>' + childName + '</strong> (' + grade + ') has been received. Our admissions team will call you within 24 hours.' +
          '</div>';
      }
      admissionForm.reset();
    });
  }
});
