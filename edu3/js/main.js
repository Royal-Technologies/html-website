// DevLaunch Academy - Main JavaScript
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

  // Certificate Verification Widget
  const certBtn = document.getElementById('verifyCertBtn');
  const certInput = document.getElementById('certIdInput');
  const certResult = document.getElementById('certResult');

  const sampleCerts = {
    'DL-2026-8841': {
      name: 'Maya Patel',
      course: 'Full-Stack Web Development Bootcamp',
      date: 'March 15, 2026',
      grade: 'Distinction (97%)'
    },
    'DL-2026-4410': {
      name: 'Daniel Kim',
      course: 'React & Next.js Mastery',
      date: 'February 28, 2026',
      grade: 'Honors (94%)'
    },
    'DL-2026-7729': {
      name: 'Sofia Rodriguez',
      course: 'Python & AI Engineering',
      date: 'April 02, 2026',
      grade: 'Distinction (96%)'
    }
  };

  function verifyCertificate() {
    if (!certInput || !certResult) return;
    const rawVal = certInput.value.trim().toUpperCase();
    const certId = rawVal || 'DL-2026-8841';
    const record = sampleCerts[certId] || {
      name: 'Alex Morgan',
      course: 'Full-Stack Web Development Bootcamp',
      date: 'April 12, 2026',
      grade: 'Verified Graduate (95%)'
    };

    document.getElementById('certStudentName').textContent = record.name;
    document.getElementById('certCourseName').textContent = record.course;
    document.getElementById('certIssueDate').textContent = record.date;
    document.getElementById('certGrade').textContent = record.grade;
    document.getElementById('certCodeDisplay').textContent = certId;

    certResult.classList.add('show');
  }

  if (certBtn) {
    certBtn.addEventListener('click', verifyCertificate);
  }
  if (certInput) {
    certInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        verifyCertificate();
      }
    });
  }

  // Enrollment Form Submission
  const enrollForm = document.getElementById('enrollForm');
  const enrollFeedback = document.getElementById('enrollFeedback');
  if (enrollForm) {
    enrollForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const studentName = document.getElementById('enrollName').value.trim();
      const course = document.getElementById('enrollCourse').value;
      const batch = document.getElementById('enrollBatch').value;

      if (enrollFeedback) {
        enrollFeedback.innerHTML =
          '<div style="background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.4);color:#6ee7b7;padding:14px 16px;border-radius:10px;margin-top:16px;font-size:13.5px;line-height:1.5;">' +
          '<i class="fa-solid fa-circle-check" style="color:#10b981;margin-right:8px;"></i>' +
          '<strong>Seat Reserved!</strong> Welcome aboard, ' + studentName + '. Our career advisor will send your onboarding kit for <strong>' + course + '</strong> (' + batch + ') shortly.' +
          '</div>';
      }
      enrollForm.reset();
    });
  }
});
