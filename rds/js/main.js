/**
 * RDS (Rural Development Sangstha) - Master Interactive Script
 * Compatible with Royal Elementor Theme & Royal Addons for Elementor
 */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var hasIO = 'IntersectionObserver' in window;

    /* =========================================================
       1. SCROLL REVEAL (IntersectionObserver)
       ========================================================= */
    var revealElements = document.querySelectorAll('[data-rv]');
    if (!hasIO || reduceMotion) {
        revealElements.forEach(function (el) { el.classList.add('in'); });
    } else {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
        revealElements.forEach(function (el) { io.observe(el); });
    }

    /* =========================================================
       2. IMPACT COUNTER ANIMATION
       ========================================================= */
    var statNumbers = document.querySelectorAll('.impact-number[data-count]');

    function animateCount(el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var prefix = el.getAttribute('data-prefix') || '';
        var isBanglaFormat = el.getAttribute('data-format') === 'lakh';
        var duration = 2000;
        var start = 0;
        var startTime = null;

        function formatNumber(num) {
            if (isBanglaFormat && num >= 100000) {
                // Bangladeshi format: 1,50,000
                var str = Math.floor(num).toString();
                var lastThree = str.substring(str.length - 3);
                var otherNumbers = str.substring(0, str.length - 3);
                if (otherNumbers !== '') {
                    lastThree = ',' + lastThree;
                }
                return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
            } else if (num >= 1000) {
                return num.toLocaleString('en-US');
            }
            return num.toString();
        }

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var ease = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(start + (target - start) * ease);
            el.textContent = prefix + formatNumber(current) + suffix;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                el.textContent = prefix + formatNumber(target) + suffix;
            }
        }

        window.requestAnimationFrame(step);
    }

    if (hasIO && !reduceMotion) {
        var ioCounter = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    ioCounter.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        statNumbers.forEach(function (el) { ioCounter.observe(el); });
    } else {
        statNumbers.forEach(function (el) { animateCount(el); });
    }

    /* =========================================================
       3. HERO SLIDER CAROUSEL
       ========================================================= */
    var heroSlides = document.querySelectorAll('.rds-hero-slide');
    var heroDots = document.querySelectorAll('.hero-dot');
    var currentSlide = 0;
    var heroTimer = null;

    function goToSlide(index) {
        if (!heroSlides.length) return;
        heroSlides.forEach(function (slide, i) {
            slide.classList.toggle('active', i === index);
        });
        heroDots.forEach(function (dot, i) {
            dot.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    function nextSlide() {
        var next = (currentSlide + 1) % heroSlides.length;
        goToSlide(next);
    }

    function startHeroTimer() {
        if (heroTimer) clearInterval(heroTimer);
        heroTimer = setInterval(nextSlide, 5500);
    }

    if (heroSlides.length > 1) {
        heroDots.forEach(function (dot) {
            dot.addEventListener('click', function () {
                var idx = parseInt(this.getAttribute('data-slide'), 10);
                goToSlide(idx);
                startHeroTimer();
            });
        });

        var heroSection = document.querySelector('.rds-hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', function () {
                if (heroTimer) clearInterval(heroTimer);
            });
            heroSection.addEventListener('mouseleave', function () {
                startHeroTimer();
            });
        }

        startHeroTimer();
    }

    /* =========================================================
       4. SUCCESS STORIES SLIDER
       ========================================================= */
    var storyDots = document.querySelectorAll('.story-dot');
    var storyQuotes = [
        {
            quote: "RDS support has changed my life. Now I can support my family and send my children to school.",
            author: "Salma Begum",
            role: "Member, Microfinance Program (Sherpur)",
            img: "images/story_salma.jpg"
        },
        {
            quote: "With RDS ecological farming training, our paddy yield increased by 30% without chemical pesticides.",
            author: "Md. Rafiqul Islam",
            role: "RMTP Beneficiary, Char Sherpur",
            img: "images/project_rmtp.jpg"
        },
        {
            quote: "The safe water tube-well and hygienic sanitary latrine from BDWash protect our village children from diseases.",
            author: "Nasima Khatun",
            role: "Community Leader, Jamalpur",
            img: "images/project_wash.jpg"
        }
    ];

    var storyAvatar = document.querySelector('.story-avatar img');
    var storyQuoteEl = document.querySelector('.story-quote');
    var storyAuthorEl = document.querySelector('.story-author');
    var storyRoleEl = document.querySelector('.story-role');

    storyDots.forEach(function (dot, idx) {
        dot.addEventListener('click', function () {
            storyDots.forEach(function (d) { d.classList.remove('active'); });
            this.classList.add('active');

            if (storyQuotes[idx]) {
                var item = storyQuotes[idx];
                if (storyAvatar) storyAvatar.src = item.img;
                if (storyQuoteEl) storyQuoteEl.textContent = '“' + item.quote + '”';
                if (storyAuthorEl) storyAuthorEl.textContent = item.author;
                if (storyRoleEl) storyRoleEl.textContent = item.role;
            }
        });
    });

    /* =========================================================
       5. BACK TO TOP BUTTON
       ========================================================= */
    var toTop = document.getElementById('upToTop');
    function checkToTop() {
        var y = window.pageYOffset || document.documentElement.scrollTop;
        if (toTop) {
            toTop.classList.toggle('show', y > 400);
        }
    }
    window.addEventListener('scroll', checkToTop, { passive: true });
    checkToTop();

    if (toTop) {
        toTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* =========================================================
       6. ROYAL ELEMENTOR SEARCH OVERLAY (#searchoverly)
       ========================================================= */
    var searchOverlay = document.getElementById('searchoverly');
    var searchBtn = document.getElementById('upSearchBtn');
    var searchClose = document.getElementById('searchOverlyClose');

    function openSearch() {
        if (!searchOverlay) return;
        searchOverlay.classList.add('is-open', 'displayblock');
        var input = searchOverlay.querySelector('input.searchbox');
        if (input) setTimeout(function () { input.focus(); }, 100);
    }

    function closeSearch() {
        if (!searchOverlay) return;
        searchOverlay.classList.remove('is-open', 'displayblock');
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            openSearch();
        });
    }

    if (searchClose) {
        searchClose.addEventListener('click', function (e) {
            e.preventDefault();
            closeSearch();
        });
    }

    if (searchOverlay) {
        searchOverlay.addEventListener('click', function (e) {
            if (e.target === searchOverlay || !e.target.closest('.searchoverlycontent form')) {
                closeSearch();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('is-open')) {
            closeSearch();
        }
    });
});
