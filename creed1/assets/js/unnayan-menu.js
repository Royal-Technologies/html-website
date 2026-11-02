/**
 * CREED BD - Navigation & Ticker Controller
 * Modeled after Unnayan Prochesta interactive architecture & Royal Addons for Elementor
 */

document.addEventListener('DOMContentLoaded', function () {
    var header = document.getElementById('upHeader');
    var burger = document.getElementById('upBurger');
    var drawer = document.getElementById('upDrawer');
    var toTop  = document.getElementById('upToTop');
    var prog   = document.getElementById('upProg');
    var body   = document.body;

    /* ---------- ১. স্ক্রল প্রগ্রেস ও শ্যাডো ---------- */
    var scrolled = false, ticking = false;
    function updateScroll() {
        ticking = false;
        var y = window.pageYOffset || document.documentElement.scrollTop;
        if (!scrolled && y > 40) scrolled = true;
        else if (scrolled && y < 10) scrolled = false;
        
        if (header) header.classList.toggle('is-scrolled', scrolled);
        if (toTop) toTop.classList.toggle('show', y > 450);
        
        if (prog) {
            var max = document.documentElement.scrollHeight - window.innerHeight;
            prog.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
        }
    }
    window.addEventListener('scroll', function () {
        if (!ticking) { ticking = true; requestAnimationFrame(updateScroll); }
    }, { passive: true });
    updateScroll();

    if (toTop) {
        toTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---------- ২. মোবাইল মেনু ড্রয়ার (Drawer) ---------- */
    function placeDrawer() {
        if (!header || !drawer) return;
        drawer.style.top = Math.round(header.getBoundingClientRect().bottom) + 'px';
    }

    function setMenu(open) {
        if (!drawer || !burger) return;
        placeDrawer();
        drawer.classList.toggle('is-open', open);
        burger.classList.toggle('is-open', open);
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
        body.classList.toggle('up-lock', open);
        if (open) drawer.scrollTop = 0;
    }

    if (burger) {
        burger.addEventListener('click', function () {
            setMenu(!drawer.classList.contains('is-open'));
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            setMenu(false);
            document.querySelectorAll('.up-menu > li.open').forEach(function (li) { li.classList.remove('open'); });
        }
    });

    var rz;
    window.addEventListener('resize', function () {
        clearTimeout(rz);
        rz = setTimeout(function () {
            if (window.innerWidth >= 992) setMenu(false);
            else if (drawer && drawer.classList.contains('is-open')) placeDrawer();
            buildTicker();
        }, 150);
    });

    /* ড্রয়ারের ভেতর কোনো লিঙ্কে ক্লিক করলে ড্রয়ার বন্ধ হওয়া */
    if (drawer) {
        drawer.querySelectorAll('a[href]:not([href="#"])').forEach(function (a) {
            a.addEventListener('click', function () { setMenu(false); });
        });
    }

    /* মোবাইল ড্রয়ার অ্যাকর্ডিয়ন টগল (Accordion) */
    document.querySelectorAll('.m-head[data-target]').forEach(function (head) {
        head.addEventListener('click', function () {
            var targetId = head.getAttribute('data-target');
            var panel = document.getElementById(targetId);
            var isExpanded = head.getAttribute('aria-expanded') === 'true';

            // Collapse others in same parent if needed
            document.querySelectorAll('.m-head[data-target]').forEach(function (h) {
                if (h !== head) {
                    h.setAttribute('aria-expanded', 'false');
                    var p = document.getElementById(h.getAttribute('data-target'));
                    if (p) p.style.display = 'none';
                    var s = h.closest('.m-section');
                    if (s) s.classList.remove('is-expanded');
                }
            });

            head.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
            if (panel) panel.style.display = isExpanded ? 'none' : 'block';
            var sec = head.closest('.m-section');
            if (sec) sec.classList.toggle('is-expanded', !isExpanded);
        });
    });

    /* টাচ ডিভাইসে মেগা মেনু ট্যাপে খোলা */
    var touchOnly = window.matchMedia('(hover: none)');
    document.querySelectorAll('.up-menu > li > .up-link[aria-haspopup]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            if (!touchOnly.matches) return;
            var li = link.parentElement;
            if (!li.classList.contains('open')) {
                e.preventDefault();
                document.querySelectorAll('.up-menu > li.open').forEach(function (o) { o.classList.remove('open'); });
                li.classList.add('open');
            }
        });
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.up-menu')) {
            document.querySelectorAll('.up-menu > li.open').forEach(function (li) { li.classList.remove('open'); });
        }
    });

    /* ---------- ৩. নোটিশ টিকার (Notice Ticker) ---------- */
    var ticker = document.getElementById('upTicker');
    var tkView = document.getElementById('tkView');
    var tkTrack = document.getElementById('tkTrack');
    var tkGroup = document.getElementById('tkGroup');
    var tkToggle = document.getElementById('tkToggle');
    var tkOriginal = tkGroup ? tkGroup.innerHTML : '';

    function buildTicker() {
        if (!tkGroup || !tkTrack || !tkView) return;
        ticker.classList.remove('is-ready');
        tkTrack.querySelectorAll('.tk-clone').forEach(function (n) { n.remove(); });
        tkGroup.innerHTML = tkOriginal;

        var guard = 0;
        while (tkGroup.scrollWidth < tkView.clientWidth + 40 && guard++ < 12) {
            tkGroup.insertAdjacentHTML('beforeend', tkOriginal);
        }

        var clone = tkGroup.cloneNode(true);
        clone.removeAttribute('id');
        clone.classList.add('tk-clone');
        clone.setAttribute('aria-hidden', 'true');
        clone.querySelectorAll('a').forEach(function (a) { a.tabIndex = -1; });
        tkTrack.appendChild(clone);

        var speed = window.innerWidth < 576 ? 50 : 65; // px / sec
        tkTrack.style.setProperty('--tk-dur', Math.max(14, tkGroup.scrollWidth / speed) + 's');
        ticker.classList.add('is-ready');
    }

    if (tkGroup) {
        buildTicker();
        var tkTimer;
        tkView.addEventListener('touchstart', function () {
            clearTimeout(tkTimer);
            tkView.classList.add('is-touch');
        }, { passive: true });
        ['touchend', 'touchcancel'].forEach(function (ev) {
            tkView.addEventListener(ev, function () {
                tkTimer = setTimeout(function () { tkView.classList.remove('is-touch'); }, 1800);
            }, { passive: true });
        });

        if (tkToggle) {
            tkToggle.addEventListener('click', function () {
                var paused = ticker.classList.toggle('is-paused');
                tkToggle.innerHTML = '<i class="bi ' + (paused ? 'bi-play-fill' : 'bi-pause-fill') + '"></i>';
                tkToggle.setAttribute('aria-label', paused ? 'Play notices' : 'Pause notices');
            });
        }

        document.addEventListener('visibilitychange', function () {
            if (tkTrack) tkTrack.style.animationPlayState = document.hidden ? 'paused' : '';
        });
    }
});
