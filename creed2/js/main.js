/**
 * CREED - Master Interactive JavaScript
 * 100% Faithful Animations & Modern Elementor Architecture
 */

// Enable JS styling flag for animations
document.documentElement.classList.add('hp-js');

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var hasIO  = 'IntersectionObserver' in window;

    /* =========================================================
       1. NOTICE TICKER ANIMATION (ROYAL ADDONS: royalticker)
       ========================================================= */
    var ticker = document.getElementById('upTicker');
    var tkView = document.getElementById('tkView');
    var tkTrack = document.getElementById('tkTrack');
    var tkGroup = document.getElementById('tkGroup');
    var tkToggle = document.getElementById('tkToggle');
    var tkOriginal = tkGroup ? tkGroup.innerHTML : '';

    function buildTicker() {
        if (!ticker || !tkTrack || !tkGroup) return;
        ticker.classList.remove('is-ready');
        tkTrack.querySelectorAll('.tk-clone').forEach(function (n) { n.remove(); });
        tkGroup.innerHTML = tkOriginal;

        // Ensure group is wider than view so there is no gap
        var guard = 0;
        var viewWidth = tkView ? tkView.clientWidth : window.innerWidth;
        while (tkGroup.scrollWidth < viewWidth + 100 && guard++ < 8) {
            tkGroup.insertAdjacentHTML('beforeend', tkOriginal);
        }

        // Create duplicate clone for seamless infinite looping
        var clone = tkGroup.cloneNode(true);
        clone.removeAttribute('id');
        clone.classList.add('tk-clone');
        clone.setAttribute('aria-hidden', 'true');
        clone.querySelectorAll('a').forEach(function (a) { a.tabIndex = -1; });
        tkTrack.appendChild(clone);

        var speed = window.innerWidth < 576 ? 50 : 65; // pixels per second
        var duration = Math.max(14, tkGroup.scrollWidth / speed);
        tkTrack.style.setProperty('--tk-dur', duration + 's');
        ticker.classList.add('is-ready');
    }

    if (tkGroup && !reduce) {
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(buildTicker);
        } else {
            window.addEventListener('load', buildTicker);
        }
        buildTicker();

        // Pause on mobile touch, resume after touch ends
        var tkTimer;
        if (tkView) {
            tkView.addEventListener('touchstart', function () {
                clearTimeout(tkTimer);
                tkView.classList.add('is-touch');
            }, { passive: true });

            ['touchend', 'touchcancel'].forEach(function (ev) {
                tkView.addEventListener(ev, function () {
                    tkTimer = setTimeout(function () {
                        tkView.classList.remove('is-touch');
                    }, 1800);
                }, { passive: true });
            });
        }

        // Pause / Resume Toggle Button
        if (tkToggle) {
            tkToggle.addEventListener('click', function () {
                var paused = ticker.classList.toggle('is-paused');
                tkToggle.innerHTML = '<i class="bi ' + (paused ? 'bi-play-fill' : 'bi-pause-fill') + '"></i>';
                tkToggle.setAttribute('aria-label', paused ? 'Play notices' : 'Pause notices');
            });
        }

        // Pause animation when tab is not active to save resources
        document.addEventListener('visibilitychange', function () {
            if (tkTrack) {
                tkTrack.style.animationPlayState = document.hidden ? 'paused' : '';
            }
        });

        // Rebuild on resize
        var resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(buildTicker, 300);
        });
    }

    /* =========================================================
       2. SCROLL-REVEAL (IntersectionObserver)
       ========================================================= */
    var rv = document.querySelectorAll('[data-rv], .hp-head, .reveal');
    if (!hasIO || reduce) {
        rv.forEach(function (el) { el.classList.add('in'); });
    } else {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (en.isIntersecting) {
                    en.target.classList.add('in');
                    io.unobserve(en.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        rv.forEach(function (el) { io.observe(el); });
    }

    /* =========================================================
       3. IMPACT COUNTER ANIMATION (Count-Up)
       ========================================================= */
    function format(n, dec) {
        return n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
    }

    function countUp(el) {
        var target = parseFloat(el.dataset.count) || 0;
        var dec = parseInt(el.dataset.dec || '0', 10);
        var pre = el.dataset.pre || '';
        var suf = el.dataset.suf || '';
        var dur = 2000;
        var t0 = null;

        function step(ts) {
            if (t0 === null) t0 = ts;
            var p = Math.min((ts - t0) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = pre + format(target * eased, dec) + suf;
            if (p < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = pre + format(target, dec) + suf;
            }
        }
        requestAnimationFrame(step);
    }

    var nums = document.querySelectorAll('.hp-num[data-count]');
    // Initialize starting value to 0 so count-up is visible
    nums.forEach(function (el) {
        var dec = parseInt(el.dataset.dec || '0', 10);
        var pre = el.dataset.pre || '';
        var suf = el.dataset.suf || '';
        el.textContent = pre + format(0, dec) + suf;
    });

    if (hasIO && !reduce) {
        var io2 = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (en.isIntersecting) {
                    countUp(en.target);
                    io2.unobserve(en.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
        nums.forEach(function (el) { io2.observe(el); });
    } else {
        nums.forEach(function (el) { countUp(el); });
    }

    /* =========================================================
       4. HERO MOUSE PARALLAX TILT
       ========================================================= */
    var hero = document.querySelector('.hp-hero');
    if (hero && !reduce) {
        var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (!isTouch) {
            hero.addEventListener('mousemove', function (e) {
                var r = hero.getBoundingClientRect();
                var x = (e.clientX - r.left) / r.width - 0.5;
                var y = (e.clientY - r.top) / r.height - 0.5;
                hero.style.setProperty('--mx', x.toFixed(3));
                hero.style.setProperty('--my', y.toFixed(3));
            });
            hero.addEventListener('mouseleave', function () {
                hero.style.setProperty('--mx', 0);
                hero.style.setProperty('--my', 0);
            });
        }
    }

    /* =========================================================
       5. EXECUTIVE DIRECTOR MESSAGE MOBILE EXPAND/COLLAPSE
       ========================================================= */
    var msg = document.getElementById('hpMsg');
    var msgBtn = document.getElementById('hpMsgBtn');
    if (msg && msgBtn) {
        msgBtn.addEventListener('click', function () {
            var open = msg.classList.toggle('is-open');
            msgBtn.classList.toggle('open', open);
            msgBtn.firstChild.textContent = open ? 'Show less ' : 'Read full message ';
        });
    }

    /* =========================================================
       6. STICKY HEADER & READING PROGRESS BAR
       ========================================================= */
    var header = document.getElementById('upHeader');
    var prog = document.getElementById('upProg');
    var toTop = document.getElementById('upToTop');

    function updateHeader() {
        var y = window.pageYOffset || document.documentElement.scrollTop;
        if (header) {
            header.classList.toggle('is-scrolled', y > 40);
        }
        if (toTop) {
            toTop.classList.toggle('show', y > 450);
        }
        if (prog) {
            var docH = document.documentElement.scrollHeight - window.innerHeight;
            var pct = docH > 0 ? (y / docH) : 0;
            var bar = prog.querySelector('span');
            if (bar) {
                bar.style.transform = 'scaleX(' + Math.min(1, Math.max(0, pct)) + ')';
            }
        }
    }
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    /* =========================================================
       7. BACK TO TOP SMOOTH SCROLL
       ========================================================= */
    if (toTop) {
        toTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* =========================================================
       8. MOBILE BURGER & OFFCANVAS DRAWER MENU
       ========================================================= */
    var burger = document.getElementById('upBurger');
    var drawer = document.getElementById('upDrawer');

    function toggleDrawer(open) {
        if (!drawer) return;
        var isOpen = open !== undefined ? open : !drawer.classList.contains('is-open');
        drawer.classList.toggle('is-open', isOpen);
        drawer.setAttribute('aria-hidden', !isOpen);
        document.body.classList.toggle('up-lock', isOpen);
    }

    if (burger) {
        burger.addEventListener('click', function () {
            toggleDrawer();
        });
    }
    if (drawer) {
        drawer.addEventListener('click', function (e) {
            if (e.target === drawer) {
                toggleDrawer(false);
            }
        });
    }
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) {
            toggleDrawer(false);
        }
    });
});
