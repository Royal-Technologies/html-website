/* =============================================
   ClarityDx Diagnostic Center - Main JS
   ============================================= */

(function () {
    'use strict';

    // ======= Sticky Navigation =======
    const desktopMenu = document.querySelector('.desktopmenu');
    const header = document.querySelector('.header');
    const headerTop = document.querySelector('.headertop');
    let headerHeight = 0;

    function calculateHeaderHeight() {
        headerHeight = (headerTop ? headerTop.offsetHeight : 0) + (header ? header.offsetHeight : 0);
    }

    window.addEventListener('scroll', function () {
        if (!desktopMenu) return;
        if (window.scrollY > headerHeight) {
            desktopMenu.classList.add('sticky');
            document.body.style.paddingTop = desktopMenu.offsetHeight + 'px';
        } else {
            desktopMenu.classList.remove('sticky');
            document.body.style.paddingTop = '0';
        }
    });

    // ======= Mobile Menu Toggle =======
    const navIcon = document.getElementById('navigation-icon');
    const royalMenu = document.querySelector('.royalmenu');

    if (navIcon && royalMenu) {
        navIcon.addEventListener('click', function () {
            navIcon.classList.toggle('active');
            royalMenu.classList.toggle('open');
        });
    }

    // Mobile dropdown toggles
    document.querySelectorAll('.royalmenu > li > a').forEach(function (link) {
        const dropdown = link.nextElementSibling;
        if (dropdown && dropdown.classList.contains('dropdown-menu')) {
            const arrow = link.querySelector('.arrow-icon');
            link.addEventListener('click', function (e) {
                if (window.innerWidth <= 991) {
                    e.preventDefault();
                    const parent = link.parentElement;
                    parent.classList.toggle('open');
                }
            });
        }
    });

    // ======= Smooth Scroll =======
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = (desktopMenu ? desktopMenu.offsetHeight : 0) + 20;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
                // Close mobile menu
                if (royalMenu) royalMenu.classList.remove('open');
                if (navIcon) navIcon.classList.remove('active');
            }
        });
    });

    // ======= Counter Animation (Intersection Observer) =======
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        const timer = setInterval(function () {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
        }, 16);
    }

    const counters = document.querySelectorAll('[data-counter]');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(function (counter) { counterObserver.observe(counter); });
    }

    // ======= Scroll Reveal Animation =======
    const revealEls = document.querySelectorAll('.reveal-on-scroll');
    if (revealEls.length > 0) {
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        revealEls.forEach(function (el) { revealObserver.observe(el); });
    }

    // ======= Test Search Chips =======
    document.querySelectorAll('.test-chip').forEach(function (chip) {
        chip.addEventListener('click', function () {
            const searchInput = document.querySelector('#hero-search');
            if (searchInput) {
                searchInput.value = chip.textContent.trim();
                searchInput.focus();
            }
        });
    });

    // ======= Hero Search Form =======
    const heroSearch = document.querySelector('#hero-search-form');
    if (heroSearch) {
        heroSearch.addEventListener('submit', function (e) {
            e.preventDefault();
            const val = heroSearch.querySelector('input').value.trim();
            if (val) {
                const bookingSection = document.querySelector('#booking');
                if (bookingSection) {
                    const testSelect = bookingSection.querySelector('select[name="test_type"]');
                    if (testSelect) {
                        // Try to match option
                        for (let i = 0; i < testSelect.options.length; i++) {
                            if (testSelect.options[i].text.toLowerCase().includes(val.toLowerCase())) {
                                testSelect.selectedIndex = i;
                                break;
                            }
                        }
                    }
                    const offset = (desktopMenu ? desktopMenu.offsetHeight : 0) + 20;
                    const top = bookingSection.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                }
            }
        });
    }

    // ======= Report Download Form =======
    const reportForm = document.querySelector('#report-download-form');
    if (reportForm) {
        reportForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const code = reportForm.querySelector('input').value.trim();
            if (!code) {
                showAlert('Please enter a valid report code.', 'warning');
                return;
            }
            showAlert('Searching for report code: ' + code + '. Please wait...', 'info');
        });
    }

    // ======= Booking Form =======
    const bookingForm = document.querySelector('#booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = bookingForm.querySelector('[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Booking...';
            btn.disabled = true;
            setTimeout(function () {
                btn.innerHTML = originalText;
                btn.disabled = false;
                showModal('Booking Confirmed!', 
                    '<p>Your test has been booked successfully!</p>' +
                    '<p>Our team will contact you within <strong>30 minutes</strong> to confirm your appointment.</p>' +
                    '<p class="mt-3"><strong>Confirmation ID:</strong> CDX-' + Math.floor(Math.random() * 90000 + 10000) + '</p>',
                    'success'
                );
                bookingForm.reset();
            }, 1500);
        });
    }

    // ======= Alert Helper =======
    function showAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = 'royal-alert royal-alert-' + type;
        alert.innerHTML = '<i class="bi bi-info-circle"></i> ' + message;
        document.body.appendChild(alert);
        setTimeout(function () { alert.classList.add('show'); }, 10);
        setTimeout(function () {
            alert.classList.remove('show');
            setTimeout(function () { alert.remove(); }, 300);
        }, 3500);
    }

    // ======= Modal Helper =======
    function showModal(title, body, type) {
        const existing = document.querySelector('.royal-modal-overlay');
        if (existing) existing.remove();
        const overlay = document.createElement('div');
        overlay.className = 'royal-modal-overlay';
        overlay.innerHTML =
            '<div class="royal-modal">' +
            '<div class="royal-modal-header"><h4>' + title + '</h4><button class="royal-modal-close">&times;</button></div>' +
            '<div class="royal-modal-body">' + body + '</div>' +
            '<div class="royal-modal-footer"><button class="btn-modal-close">Close</button></div>' +
            '</div>';
        document.body.appendChild(overlay);
        setTimeout(function () { overlay.classList.add('show'); }, 10);
        overlay.querySelector('.royal-modal-close').addEventListener('click', function () { closeModal(overlay); });
        overlay.querySelector('.btn-modal-close').addEventListener('click', function () { closeModal(overlay); });
        overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(overlay); });
    }

    function closeModal(overlay) {
        overlay.classList.remove('show');
        setTimeout(function () { overlay.remove(); }, 300);
    }

    // ======= Active Menu Highlight =======
    function setActiveMenu() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + (desktopMenu ? desktopMenu.offsetHeight : 80) + 50;
        sections.forEach(function (section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector('.royalmenu a[href="#' + id + '"]');
            if (link && scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.royalmenu > li').forEach(function (li) { li.classList.remove('active'); });
                link.closest('.royalmenu > li') && link.closest('.royalmenu > li').classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', setActiveMenu);

    // ======= Init =======
    window.addEventListener('load', function () {
        calculateHeaderHeight();
        setActiveMenu();
    });

    window.addEventListener('resize', function () {
        calculateHeaderHeight();
        if (window.innerWidth > 991) {
            if (royalMenu) royalMenu.classList.remove('open');
            if (navIcon) navIcon.classList.remove('active');
            document.body.style.paddingTop = '0';
        }
    });

})();
