// Mithila Polymer — shared page behaviour.
(function () {
  var header = document.querySelector('header.site-header');

  // Header state and scroll-progress line.
  var onScroll = function () {
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (header) {
      header.classList.toggle('is-scrolled', y > 24);
      header.style.setProperty('--progress', max > 0 ? Math.min(y / max, 1) : 0);
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  // Mobile menu.
  var toggle = document.querySelector('[data-menu-toggle]');
  var menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
      menu.classList.toggle('is-open', open);
      document.body.classList.toggle('overflow-hidden', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (mq) {
      if (mq.matches) setOpen(false);
    });
  }

  // Highlight the nav item for the section in view.
  var spyLinks = document.querySelectorAll('[data-spy]');
  var spyIds = [];
  spyLinks.forEach(function (a) {
    var id = a.getAttribute('data-spy');
    if (spyIds.indexOf(id) === -1 && document.getElementById(id)) spyIds.push(id);
  });
  if (spyIds.length && 'IntersectionObserver' in window) {
    var setActive = function (id) {
      spyLinks.forEach(function (a) {
        var on = a.getAttribute('data-spy') === id;
        a.classList.toggle('is-active', on);
        if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
      });
    };
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    spyIds.forEach(function (id) { spy.observe(document.getElementById(id)); });
  }

  // Product category filter + text search (search box is optional).
  var filters = document.querySelectorAll('[data-filter]');
  var search = document.querySelector('[data-product-search]');
  var emptyState = document.querySelector('[data-products-empty]');
  var resultCount = document.querySelector('[data-products-count]');
  var activeCat = 'all';
  var applyProductFilter = function () {
    var q = search ? search.value.trim().toLowerCase() : '';
    var shown = 0;
    document.querySelectorAll('[data-cat]').forEach(function (card) {
      var inCat = activeCat === 'all' || card.getAttribute('data-cat') === activeCat;
      var text = (card.getAttribute('data-keywords') || '') + ' ' + card.textContent;
      var show = inCat && (!q || text.toLowerCase().indexOf(q) !== -1);
      card.classList.toggle('hidden', !show);
      if (show) { card.classList.add('is-visible'); shown++; }
    });
    if (emptyState) emptyState.classList.toggle('hidden', shown !== 0);
    if (resultCount) resultCount.textContent = shown + (shown === 1 ? ' product' : ' products');
  };
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activeCat = btn.getAttribute('data-filter');
      filters.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      applyProductFilter();
    });
  });
  if (search) search.addEventListener('input', applyProductFilter);

  // Quote form: validate, then send to data-endpoint if set, otherwise hand off to the email app.
  document.querySelectorAll('[data-quote-form]').forEach(function (form) {
    var status = form.querySelector('[data-form-status]');
    var showStatus = function (msg, ok) {
      if (!status) return;
      status.textContent = msg;
      status.classList.remove('hidden');
      status.classList.toggle('text-green-700', ok);
      status.classList.toggle('text-red-700', !ok);
    };
    var checkField = function (input) {
      var err = document.getElementById(input.getAttribute('aria-describedby') || '');
      var bad = !input.checkValidity();
      input.classList.toggle('is-invalid', bad);
      input.setAttribute('aria-invalid', String(bad));
      if (err) err.classList.toggle('hidden', !bad);
      return !bad;
    };
    form.querySelectorAll('input[aria-describedby]').forEach(function (input) {
      input.addEventListener('blur', function () { if (input.value) checkField(input); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstBad = null;
      form.querySelectorAll('input[aria-describedby]').forEach(function (input) {
        if (!checkField(input) && !firstBad) firstBad = input;
      });
      if (firstBad) { firstBad.focus(); return; }
      if (form.elements.website && form.elements.website.value) return; // spam trap

      var data = new FormData(form);
      data.delete('website');
      var endpoint = form.getAttribute('data-endpoint');
      var button = form.querySelector('[type="submit"]');

      if (endpoint) {
        button.disabled = true;
        fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          .then(function (res) {
            if (!res.ok) throw new Error(res.status);
            form.reset();
            showStatus('Thank you! Our sales team will contact you within one working day.', true);
          })
          .catch(function () {
            showStatus('Sorry, something went wrong. Please call Sales on +88 01332 853650.', false);
          })
          .then(function () { button.disabled = false; });
        return;
      }

      var lines = [];
      data.forEach(function (value, key) {
        if (value) lines.push(key.charAt(0).toUpperCase() + key.slice(1) + ': ' + value);
      });
      var subject = 'Quote request: ' + (data.get('product') || 'Products') + ' (' + data.get('name') + ')';
      window.location.href = 'mailto:' + form.getAttribute('data-mailto') +
        '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
      showStatus('Your email app should open with the enquiry ready to send. If it doesn\'t, call Sales on +88 01332 853650.', true);
    });
  });

  // Fade-in on scroll.
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Glass highlight follows the pointer (mouse/pen only; skipped on touch).
  document.querySelectorAll('.glass-glow').forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  // Copy colour values on the design-system page.
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var value = btn.getAttribute('data-copy');
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(value).then(function () {
        var tip = btn.querySelector('[data-copied]');
        if (!tip) return;
        tip.classList.remove('opacity-0');
        setTimeout(function () { tip.classList.add('opacity-0'); }, 1200);
      });
    });
  });

  // Current year in footer.
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
