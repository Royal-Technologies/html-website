/* ============================================
   IronEdge CrossFit - main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ---- Sticky Header ---- */
    const header = document.querySelector('.header');
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleScroll);

    /* ---- Mobile Menu Toggle ---- */
    const navIcon = document.getElementById('navigation-icon');
    const mobileMenu = document.getElementById('mobile-menu');
    if (navIcon && mobileMenu) {
        navIcon.addEventListener('click', function () {
            navIcon.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });

        // Mobile dropdown toggles
        const mobileParents = mobileMenu.querySelectorAll('.has-dropdown > a');
        mobileParents.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const dropdown = link.nextElementSibling;
                if (dropdown && dropdown.classList.contains('dropdown')) {
                    dropdown.classList.toggle('mobile-open');
                    const arrow = link.querySelector('.arrow');
                    if (arrow) arrow.textContent = dropdown.classList.contains('mobile-open') ? '▲' : '▼';
                }
            });
        });

        // Close mobile menu on nav link click
        const mobileLinks = mobileMenu.querySelectorAll('a:not(.has-dropdown > a)');
        mobileLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                navIcon.classList.remove('open');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    /* ---- Smooth Scroll ---- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 0;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset - 10;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    /* ---- BMI Calculator ---- */
    const bmiForm = document.getElementById('bmi-form');
    const bmiResult = document.getElementById('bmi-result');
    if (bmiForm && bmiResult) {
        bmiForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const height = parseFloat(document.getElementById('bmi-height').value);
            const weight = parseFloat(document.getElementById('bmi-weight').value);
            if (!height || !weight || height <= 0 || weight <= 0) {
                showBMIResult('error', 'Please enter valid height and weight.', '', '');
                return;
            }
            const heightM = height / 100;
            const bmi = (weight / (heightM * heightM)).toFixed(1);
            let category, colorClass, advice;
            if (bmi < 18.5) {
                category = 'Underweight';
                colorClass = 'bmi-blue';
                advice = 'Focus on building muscle mass with our Strength & Conditioning program.';
            } else if (bmi < 25) {
                category = 'Normal Weight';
                colorClass = 'bmi-green';
                advice = 'Great shape! Maintain with our CrossFit WOD and HIIT Cardio classes.';
            } else if (bmi < 30) {
                category = 'Overweight';
                colorClass = 'bmi-orange';
                advice = 'Our HIIT Cardio and Nutrition Coaching programs can help you reach your goals.';
            } else {
                category = 'Obese';
                colorClass = 'bmi-red';
                advice = 'Start your journey with our beginner-friendly programs and Nutrition Coaching.';
            }
            showBMIResult(colorClass, category, bmi, advice);
        });

        document.getElementById('bmi-reset') && document.getElementById('bmi-reset').addEventListener('click', function () {
            bmiForm.reset();
            bmiResult.style.display = 'none';
            bmiResult.innerHTML = '';
        });
    }

    function showBMIResult(colorClass, category, bmi, advice) {
        if (colorClass === 'error') {
            bmiResult.innerHTML = '<div class="bmi-error"><i class="fa-solid fa-triangle-exclamation"></i> ' + category + '</div>';
        } else {
            bmiResult.innerHTML =
                '<div class="bmi-score ' + colorClass + '">' +
                '<div class="bmi-number">' + bmi + '</div>' +
                '<div class="bmi-label">BMI Score</div>' +
                '</div>' +
                '<div class="bmi-category ' + colorClass + '">' + category + '</div>' +
                '<div class="bmi-advice"><i class="fa-solid fa-dumbbell"></i> ' + advice + '</div>';
        }
        bmiResult.style.display = 'block';
        bmiResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /* ---- Contact Form Submission ---- */
    const trialForm = document.getElementById('trial-form');
    if (trialForm) {
        trialForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = trialForm.querySelector('button[type="submit"]');
            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
            setTimeout(function () {
                trialForm.innerHTML =
                    '<div class="form-success">' +
                    '<div class="success-icon"><i class="fa-solid fa-circle-check"></i></div>' +
                    '<h3>You\'re In! 🔥</h3>' +
                    '<p>Welcome to IronEdge CrossFit! We\'ll contact you within 24 hours to schedule your free trial session.</p>' +
                    '<a href="#" class="btn-primary">Back to Home</a>' +
                    '</div>';
            }, 1200);
        });
    }

    /* ---- Stats Counter Animation ---- */
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statNumbers.forEach(function (el) { observer.observe(el); });
    }

    function animateCount(el) {
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1800;
        const start = performance.now();
        function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    /* ---- Scroll reveal ---- */
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length > 0) {
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealEls.forEach(function (el) { revealObserver.observe(el); });
    }
});
