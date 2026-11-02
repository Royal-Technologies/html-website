/**
 * Royal Elementor - Mega Menu Interactive JavaScript
 * Faithful modern implementation Modern Mega Menu Architecture
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {

        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        /* =========================================================
           1. STICKY HEADER & READING PROGRESS BAR
           ========================================================= */
        var header = document.getElementById('upHeader');
        var prog   = document.getElementById('upProg');

        function updateHeaderScroll() {
            var y = window.pageYOffset || document.documentElement.scrollTop || 0;
            if (header) {
                header.classList.toggle('is-scrolled', y > 30);
            }
            if (prog) {
                var docH = document.documentElement.scrollHeight - window.innerHeight;
                var pct  = docH > 0 ? (y / docH) : 0;
                var bar  = prog.querySelector('span');
                if (bar) {
                    bar.style.transform = 'scaleX(' + Math.min(1, Math.max(0, pct)) + ')';
                }
            }
        }
        window.addEventListener('scroll', updateHeaderScroll, { passive: true });
        updateHeaderScroll();

        /* =========================================================
           2. NOTICE TICKER INFINITE MARQUEE
           ========================================================= */
        var ticker  = document.getElementById('upTicker');
        var tkTrack = document.getElementById('tkTrack');
        var tkGroup = document.getElementById('tkGroup');
        var tkPlay  = document.getElementById('tkPlay');
        var tkPrev  = document.getElementById('tkPrev');

        if (ticker && tkTrack && tkGroup && !reduce) {
            // Remove any existing clones
            tkTrack.querySelectorAll('.tk-clone').forEach(function (n) { n.remove(); });

            // Clone group for seamless loop
            var clone = tkGroup.cloneNode(true);
            clone.classList.add('tk-clone');
            tkTrack.appendChild(clone);

            // Compute speed: ~48 pixels per second
            var speed = 48;
            var dur = Math.max(14, tkGroup.scrollWidth / speed);
            tkTrack.style.setProperty('--tk-dur', dur + 's');
            ticker.classList.add('is-ready');

            var isPaused = false;
            if (tkPlay) {
                tkPlay.addEventListener('click', function () {
                    isPaused = !isPaused;
                    ticker.classList.toggle('is-paused', isPaused);
                    tkPlay.innerHTML = isPaused ? '<i class="bi bi-play-fill"></i>' : '<i class="bi bi-pause-fill"></i>';
                    tkPlay.setAttribute('aria-label', isPaused ? 'Play ticker' : 'Pause ticker');
                });
            }

            if (tkPrev) {
                tkPrev.addEventListener('click', function () {
                    tkTrack.style.animation = 'none';
                    void tkTrack.offsetWidth;
                    tkTrack.style.animation = '';
                });
            }
        }

        /* =========================================================
           3. UNIFIED MOBILE MENU HANDLER (Drawer / Fullscreen / Bottomsheet / Classic)
           ========================================================= */
        var burger       = document.getElementById('upBurger');
        var navIcon      = document.getElementById('navigation-icon');
        var drawer       = document.getElementById('upDrawer');
        var drawerClose  = document.getElementById('upDrawerClose');

        var fsMenu       = document.getElementById('upFullscreenMenu');
        var fsClose      = document.getElementById('upFullscreenClose');
        var fsBackdrop   = document.getElementById('upFullscreenBackdrop');

        var sheetMenu    = document.getElementById('upBottomSheetWrap');
        var sheetClose   = document.getElementById('upBottomSheetClose');
        var sheetBackdrop = document.getElementById('upBottomSheetBackdrop');

        function toggleMobileMenu(open) {
            var html = document.documentElement;
            var body = document.body;

            function setScrollLock(lock) {
                html.classList.toggle('up-lock', lock);
                body.classList.toggle('up-lock', lock);
            }

            // Priority 1: Fullscreen Glass Menu
            if (fsMenu) {
                var isOpen = open !== undefined ? open : !fsMenu.classList.contains('is-open');
                fsMenu.classList.toggle('is-open', isOpen);
                fsMenu.setAttribute('aria-hidden', !isOpen);
                if (burger) {
                    burger.classList.toggle('is-open', isOpen);
                    burger.setAttribute('aria-expanded', isOpen);
                }
                setScrollLock(isOpen);
                return;
            }

            // Priority 2: Bottom Sheet Drawer
            if (sheetMenu) {
                var isOpen = open !== undefined ? open : !sheetMenu.classList.contains('is-open');
                sheetMenu.classList.toggle('is-open', isOpen);
                sheetMenu.setAttribute('aria-hidden', !isOpen);
                if (burger) {
                    burger.classList.toggle('is-open', isOpen);
                    burger.setAttribute('aria-expanded', isOpen);
                }
                setScrollLock(isOpen);
                return;
            }

            // Priority 3: Offcanvas Drawer
            if (drawer) {
                var isOpen = open !== undefined ? open : !drawer.classList.contains('is-open');
                drawer.classList.toggle('is-open', isOpen);
                drawer.setAttribute('aria-hidden', !isOpen);
                if (burger) {
                    burger.classList.toggle('is-open', isOpen);
                    burger.setAttribute('aria-expanded', isOpen);
                }
                setScrollLock(isOpen);
                return;
            }

            // Priority 4: Classic Slide Menu (show-menu on html/body)
            var isClassicOpen = open !== undefined ? open : !body.classList.contains('show-menu');
            html.classList.toggle('show-menu', isClassicOpen);
            body.classList.toggle('show-menu', isClassicOpen);
            setScrollLock(isClassicOpen);
            if (burger) {
                burger.classList.toggle('is-open', isClassicOpen);
                burger.setAttribute('aria-expanded', isClassicOpen);
            }
        }

        // Trigger on Burger click
        if (burger) {
            burger.addEventListener('click', function (e) {
                e.preventDefault();
                toggleMobileMenu();
            });
        }

        // Trigger on Classic Navigation Icon click
        if (navIcon) {
            navIcon.addEventListener('click', function (e) {
                e.preventDefault();
                toggleMobileMenu();
            });
        }

        // Close listeners: Drawer
        if (drawerClose) {
            drawerClose.addEventListener('click', function (e) {
                e.preventDefault();
                toggleMobileMenu(false);
            });
        }
        if (drawer) {
            drawer.addEventListener('click', function (e) {
                if (e.target === drawer) {
                    toggleMobileMenu(false);
                }
            });
        }

        // Close listeners: Fullscreen
        if (fsClose) {
            fsClose.addEventListener('click', function (e) {
                e.preventDefault();
                toggleMobileMenu(false);
            });
        }
        if (fsBackdrop) {
            fsBackdrop.addEventListener('click', function (e) {
                e.preventDefault();
                toggleMobileMenu(false);
            });
        }

        // Close listeners: Bottom Sheet
        if (sheetClose) {
            sheetClose.addEventListener('click', function (e) {
                e.preventDefault();
                toggleMobileMenu(false);
            });
        }
        if (sheetBackdrop) {
            sheetBackdrop.addEventListener('click', function (e) {
                e.preventDefault();
                toggleMobileMenu(false);
            });
        }

        // Classic close listener
        var classicClose = document.querySelectorAll('#mobile-navigation-overlay, #mobile-navigation .close');
        classicClose.forEach(function (btn) {
            btn.addEventListener('click', function () {
                toggleMobileMenu(false);
            });
        });

        // Global Escape Key listener
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                toggleMobileMenu(false);
            }
        });

        /* =========================================================
           4. MOBILE ACCORDION (Pure Vanilla Collapse Handler)
           ========================================================= */
        var collapseTriggers = document.querySelectorAll('[data-bs-toggle="collapse"]');

        collapseTriggers.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                var targetSel = btn.getAttribute('data-bs-target') || btn.getAttribute('href');
                if (!targetSel) return;

                var target = document.querySelector(targetSel);
                if (!target) return;

                var isOpen = target.classList.contains('show');
                var parentSel = target.getAttribute('data-bs-parent');

                // If inside parent accordion, close sibling collapses
                if (parentSel && !isOpen) {
                    var parent = document.querySelector(parentSel);
                    if (parent) {
                        var openSiblings = parent.querySelectorAll('.collapse.show');
                        openSiblings.forEach(function (sib) {
                            if (sib !== target) {
                                sib.classList.remove('show');
                                var sibBtn = document.querySelector('[data-bs-target="#' + sib.id + '"], [href="#' + sib.id + '"]');
                                if (sibBtn) {
                                    sibBtn.setAttribute('aria-expanded', 'false');
                                    var sec = sibBtn.closest('.m-section');
                                    if (sec) sec.classList.remove('is-expanded');
                                }
                            }
                        });
                    }
                }

                // Toggle target
                target.classList.toggle('show', !isOpen);
                btn.setAttribute('aria-expanded', !isOpen);

                var section = btn.closest('.m-section');
                if (section) {
                    section.classList.toggle('is-expanded', !isOpen);
                }
            });
        });

        /* =========================================================
           5. TOUCH SCREEN DESKTOP MENU TOGGLE
           ========================================================= */
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            var desktopNavItems = document.querySelectorAll('.up-menu > li.has-children');
            desktopNavItems.forEach(function (item) {
                var link = item.querySelector('.up-link');
                if (link) {
                    link.addEventListener('click', function (e) {
                        if (window.innerWidth >= 992) {
                            if (!item.classList.contains('open')) {
                                e.preventDefault();
                                desktopNavItems.forEach(function (sib) { sib.classList.remove('open'); });
                                item.classList.add('open');
                            }
                        }
                    });
                }
            });

            document.addEventListener('click', function (e) {
                if (window.innerWidth >= 992 && !e.target.closest('.up-menu')) {
                    desktopNavItems.forEach(function (item) { item.classList.remove('open'); });
                }
            });
        }

    });
})();
