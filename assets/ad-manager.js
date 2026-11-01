/*!
 * AURUM Ad Manager  -  the ONE place that controls all advertising on the site.
 * ---------------------------------------------------------------------------
 * build.py adds a single <script defer src="/assets/ad-manager.js?v=..."> to every generated page and
 * puts empty slot <div class="ad-slot" data-ad-position="..."> elements into the templates.
 * Everything else (which ads, where, on which pages, which devices, consent) is decided HERE.
 *
 * To change advertising: edit CONFIG below, run `python3 build.py`, upload the output. No HTML editing.
 *
 *   - Turn a format off ........ formats.<name>.enabled = false
 *   - Change where a format runs  formats.<name>.pages  (page type -> ['mobile','desktop'])
 *   - Move a banner to another slot  placements.<slot>.format = '<formatName>'   (null = slot stays empty)
 *   - Turn everything off ...... CONFIG.enabled = false
 *
 * Page types come from <body data-page="...">: home, catalogue, search, categories, category, game,
 * about, contact, privacy, terms, cookie, profile, notfound.
 *
 * Honesty rules: this file never reports an ad as "rendered" because a <script> tag exists. AurumAds.status()
 * says what was actually observed (requested / script-loaded / rendered / script-error / no-render-detected).
 * Pop-under and Social Bar draw outside our DOM, so for those the best state we can truthfully report is
 * "script-loaded" (render not verifiable by us).
 */
(function () {
  'use strict';
  if (window.AurumAds) return;                                   // never run twice on one page

  /* ======================================================================== CONFIGURATION */
  var CONFIG = {
    enabled: true,                                               // master switch

    /* Pages that must never show ads, whatever the formats below say. */
    neverOn: ['privacy', 'terms', 'cookie', 'contact', 'notfound'],

    /* Consent. 'auto'   = show a notice and wait for "Accept" where the visitor's time zone is in Europe
     *                     (a conservative stand-in for EEA/UK/CH rules); everywhere else ads load directly.
     *           'always'= always ask first.   'never' = never ask (only if the law of your audience allows it).
     * A stored "Decline" is respected in every mode. A browser Global Privacy Control signal is respected
     * when respectGPC is true. This is a simple notice, NOT an IAB TCF consent platform. */
    consent: { mode: 'auto', respectGPC: true, storageKey: 'aurum.adconsent' },

    /* Timing: overlay formats (pop-under, social bar) start after the page has loaded and the browser is idle,
     * so they never delay first render. Slot ads start when the slot is about to scroll into view. */
    timing: { overlayDelayMs: 1200, lazyMarginPx: 300, renderCheckMs: 10000 },

    /* Mobile = viewport narrower than this many px. */
    mobileMaxWidth: 767,

    /* ---- the five Adsterra units. Keys / URLs / IDs are the publisher-supplied values; do not edit them. ---- */
    formats: {
      popunder: {
        label: 'Popunder', enabled: true, kind: 'script', placement: 'overlay',
        script: { src: 'https://abscloud.org/1/215ba15b591bb162a1a5a0d23f7a85eb', attrs: { 'data-cfasync': 'false' } },
        pages: {
          home: ['mobile', 'desktop'], catalogue: ['mobile', 'desktop'], search: ['mobile', 'desktop'], categories: ['mobile', 'desktop'],
          category: ['mobile', 'desktop'], game: ['mobile', 'desktop'], about: ['mobile', 'desktop'], profile: ['mobile', 'desktop']
        }
      },
      socialBar: {
        label: 'Social Bar', enabled: true, kind: 'script', placement: 'overlay',
        script: { src: 'https://bauval.org/14/9ba647283f998ac7daa2d0eec8e26976', attrs: { 'data-cfasync': 'false' } },
        /* It is a floating overlay, so it is NOT loaded on phones' game pages (it could sit on top of game controls). */
        pages: {
          home: ['mobile', 'desktop'], catalogue: ['mobile', 'desktop'], search: ['mobile', 'desktop'], categories: ['mobile', 'desktop'],
          category: ['mobile', 'desktop'], game: ['desktop'], about: ['mobile', 'desktop'], profile: ['mobile', 'desktop']
        }
      },
      banner320x50: {
        label: 'Banner 320x50', enabled: true, kind: 'iframe', placement: 'slot', width: 320, height: 50,
        /* exact publisher snippet, run inside its own sandbox-free iframe so document.write and the atOptions global stay isolated */
        snippet: "<script>\n  atOptions = {\n    'key' : '9c53ff843182b59da20e4c4418f526cd',\n    'format' : 'iframe',\n    'height' : 50,\n    'width' : 320,\n    'params' : {}\n  };\n</script>\n<script src=\"https://bauval.org/22/9c53ff843182b59da20e4c4418f526cd\"></script>",
        pages: { home: ['mobile', 'desktop'] }
      },
      nativeBanner: {
        label: 'Native Banner', enabled: true, kind: 'native', placement: 'slot', reserveHeight: 0,
        containerId: 'container-fb16918ef4500c449d978b5ee154f51a',          // must exist at most once per page
        script: { src: 'https://bauval.org/21/fb16918ef4500c449d978b5ee154f51a', attrs: { 'data-cfasync': 'false' }, async: true },
        pages: { home: ['mobile', 'desktop'] }
      },
      banner300x250: {
        label: 'Banner 300x250', enabled: true, kind: 'iframe', placement: 'slot', width: 300, height: 250,
        snippet: "<script>\n  atOptions = {\n    'key' : 'a25cff6ea331160cf5f4131d614d6f5c',\n    'format' : 'iframe',\n    'height' : 250,\n    'width' : 300,\n    'params' : {}\n  };\n</script>\n<script src=\"https://bauval.org/22/a25cff6ea331160cf5f4131d614d6f5c\"></script>",
        pages: { game: ['mobile', 'desktop'], catalogue: ['mobile', 'desktop'], category: ['mobile', 'desktop'] }
      }
    },

    /* ---- slots that build.py puts into the templates (data-ad-position) and which format each one shows.
     *      format: null  => the slot stays empty and takes no space. A format is only used if it is also
     *      enabled and allowed for that page type / device in formats.<name>.pages above.
     *      Each format is used at most once per page; a second slot asking for it is skipped. ---- */
    placements: {
      'homepage-top':     { format: 'banner320x50' },     // home, under the category chips
      'homepage-middle':  { format: 'nativeBanner' },     // home, between the game grid and the "Why" text
      'game-bottom':      { format: 'banner300x250' },    // game pages, BELOW the game shell (never inside / over it)
      'catalogue-middle': { format: 'banner300x250' },    // /games, below the game grid
      'category-middle':  { format: 'banner300x250' }     // /category/<slug> (not /categories - see pages above)
    }
  };

  /* ======================================================================== RUNTIME */
  var doc = document, win = window;
  var PAGE = (doc.body && doc.body.getAttribute('data-page')) || '';
  var state = { page: PAGE, device: '', consent: 'unknown', started: false, units: {}, slots: {}, notes: [] };
  var used = {}, slotOf = {};                                                 // format -> true once it has been mounted on this page

  function device() { try { return win.matchMedia('(max-width:' + CONFIG.mobileMaxWidth + 'px)').matches ? 'mobile' : 'desktop'; } catch (e) { return 'desktop'; } }
  function unit(name) { return state.units[name] || (state.units[name] = { format: name, state: 'idle', reason: '' }); }
  function mark(name, st, reason) { var u = unit(name); u.state = st; if (reason) u.reason = reason; u.at = Date.now(); return u; }
  function store(op, v) {
    try { if (op === 'get') return win.localStorage.getItem(CONFIG.consent.storageKey); if (op === 'set') win.localStorage.setItem(CONFIG.consent.storageKey, v); else win.localStorage.removeItem(CONFIG.consent.storageKey); } catch (e) { /* storage blocked: treated as "no stored choice" */ }
    return null;
  }

  /* may this format run on this page + device? */
  function eligible(name) {
    var f = CONFIG.formats[name];
    if (!f) return 'unknown-format';
    if (!CONFIG.enabled) return 'ads-disabled';
    if (!f.enabled) return 'format-disabled';
    if (CONFIG.neverOn.indexOf(PAGE) > -1) return 'page-excluded';
    var allow = f.pages && f.pages[PAGE];
    if (!allow) return 'page-not-allowed';
    if (allow.indexOf(state.device) < 0) return 'device-not-allowed';
    return '';
  }

  /* ---- consent ---- */
  function consentNeeded() {
    var m = CONFIG.consent.mode;
    if (m === 'always') return true;
    if (m === 'never') return false;
    var tz = ''; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { }
    return /^Europe\//.test(tz) || /^Atlantic\/(Canary|Madeira|Azores|Reykjavik|Faroe)$/.test(tz);
  }
  function consentState() {
    if (CONFIG.consent.respectGPC && win.navigator && win.navigator.globalPrivacyControl === true) return 'denied-gpc';
    var s = store('get');
    if (s === 'granted' || s === 'denied') return s;
    return consentNeeded() ? 'needed' : 'not-required';
  }
  function showNotice(forced) {
    if (doc.getElementById('aurum-consent')) return;
    var main = doc.getElementById('main'); if (!main || !main.parentNode) return;
    var box = doc.createElement('div'); box.id = 'aurum-consent'; box.className = 'ad-consent'; box.setAttribute('role', 'region'); box.setAttribute('aria-label', 'Advertising choice');
    var p = doc.createElement('p'); p.appendChild(doc.createTextNode('AURUM is free because of advertising. Our ad partner (Adsterra) may use cookies or similar technology to show and measure ads. Choose whether to show ads; games work the same either way. '));
    var a = doc.createElement('a'); a.href = '/cookie'; a.textContent = 'Cookie information'; p.appendChild(a); p.appendChild(doc.createTextNode('.'));
    var row = doc.createElement('div'); row.className = 'row';
    var yes = doc.createElement('button'); yes.type = 'button'; yes.className = 'btn pri'; yes.textContent = 'Show ads';
    var no = doc.createElement('button'); no.type = 'button'; no.className = 'btn ghost'; no.textContent = 'No ads';
    row.appendChild(yes); row.appendChild(no); box.appendChild(p); box.appendChild(row); main.parentNode.insertBefore(box, main);
    yes.onclick = function () { store('set', 'granted'); box.remove(); state.consent = 'granted'; if (!state.started) start(); else if (forced) win.location.reload(); };
    no.onclick = function () { store('set', 'denied'); box.remove(); state.consent = 'denied'; if (state.started) win.location.reload(); };
  }

  /* ---- unit loaders ---- */
  function addScript(parent, spec, name) {
    var s = doc.createElement('script'); s.src = spec.src;
    if (spec.async) s.async = true;
    for (var k in (spec.attrs || {})) s.setAttribute(k, spec.attrs[k]);
    s.onload = function () { var u = unit(name); if (u.state === 'requested') mark(name, 'script-loaded'); };
    s.onerror = function () { mark(name, 'script-error', 'script blocked or unreachable'); collapse(slotOf[name]); };
    mark(name, 'requested'); parent.appendChild(s); return s;
  }
  function collapse(slotEl) { if (!slotEl) return; try { slotEl.setAttribute('data-ad-state', 'collapsed'); slotEl.style.minHeight = ''; while (slotEl.firstChild) slotEl.removeChild(slotEl.firstChild); } catch (e) { } }
  function watch(name, probe, slotEl, aux) {                     // only says "rendered" when the DOM shows ad content
    var t0 = Date.now(), iv = setInterval(function () {
      var ok = false, dead = false; try { dead = aux ? aux() : false; ok = !dead && probe(); } catch (e) { }
      if (dead) { clearInterval(iv); return; }
      if (ok) { clearInterval(iv); mark(name, 'rendered'); if (slotEl) slotEl.setAttribute('data-ad-state', 'rendered'); }
      else if (Date.now() - t0 > CONFIG.timing.renderCheckMs) { clearInterval(iv); var u = unit(name); if (u.state !== 'script-error') { mark(name, 'no-render-detected', 'no ad content appeared'); collapse(slotEl); } }
    }, 400);
  }
  function mountOverlay(name) {
    var f = CONFIG.formats[name]; if (used[name]) return mark(name, 'skipped', 'duplicate-format'); used[name] = true;
    addScript(doc.head || doc.documentElement, f.script, name);
  }
  function mountSlot(name, slotEl) {
    var f = CONFIG.formats[name], wrap = doc.createElement('div'), lab = doc.createElement('span');
    wrap.className = 'ad-unit ad-' + name; lab.className = 'ad-label'; lab.textContent = 'Advertisement'; wrap.appendChild(lab);
    slotOf[name] = slotEl; slotEl.setAttribute('data-ad-managed', name);
    if (f.kind === 'iframe') {
      wrap.style.minHeight = (f.height + 18) + 'px';
      var fr = doc.createElement('iframe'); fr.title = 'Advertisement'; fr.width = f.width; fr.height = f.height; fr.scrolling = 'no'; fr.setAttribute('frameborder', '0');
      fr.setAttribute('marginwidth', '0'); fr.setAttribute('marginheight', '0'); fr.style.cssText = 'border:0;display:block;margin:0 auto;max-width:100%;width:' + f.width + 'px;height:' + f.height + 'px;overflow:hidden';
      fr.setAttribute('data-ad-frame', name); wrap.appendChild(fr); slotEl.appendChild(wrap); mark(name, 'requested');
      /* a tiny listener (placed BEFORE the provider snippet) tells us whether the provider script really loaded or failed;
         the iframe's own load event only means \"our wrapper document loaded\" and is NOT used as evidence */
      var probe = '<script>(function(){function f(s){try{window.frameElement.setAttribute(\'data-ad-script\',s)}catch(e){}}window.addEventListener(\'error\',function(e){if(e.target&&e.target.tagName===\'SCRIPT\'&&e.target.src)f(\'error\')},true);window.addEventListener(\'load\',function(e){if(e.target&&e.target.tagName===\'SCRIPT\'&&e.target.src)f(\'loaded\')},true)})();</script>';
      fr.srcdoc = '<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;overflow:hidden;background:transparent}</style></head><body>' + probe + f.snippet + '</body></html>';
      watch(name, function () { var d = fr.contentDocument; return !!(d && d.querySelector('iframe,img,ins,canvas,video,a')); }, slotEl, function () {
        var a = fr.getAttribute('data-ad-script');
        if (a === 'error') { mark(name, 'script-error', 'script blocked or unreachable'); collapse(slotEl); return true; }
        if (a === 'loaded' && unit(name).state === 'requested') mark(name, 'script-loaded');
        return false;
      });
    } else if (f.kind === 'native') {
      if (doc.getElementById(f.containerId)) { mark(name, 'skipped', 'duplicate-container-id'); slotEl.setAttribute('data-ad-state', 'collapsed'); slotEl.style.minHeight = ''; return; }
      if (f.reserveHeight) wrap.style.minHeight = f.reserveHeight + 'px';
      var c = doc.createElement('div'); c.id = f.containerId; wrap.appendChild(c); slotEl.appendChild(wrap);
      addScript(wrap, f.script, name);                           // after the container, so the provider script finds it
      watch(name, function () { return c.childNodes.length > 0 && c.getBoundingClientRect().height > 0; }, slotEl);
    }
  }

  /* ---- start: decide, then mount ---- */
  function start() {
    if (state.started) return; state.started = true;
    var names = Object.keys(CONFIG.formats), slots = [].slice.call(doc.querySelectorAll('.ad-slot[data-ad-position]'));
    var wanted = {};                                             // format -> slot element (first slot in document order)
    names.forEach(function (n) { var r = eligible(n); if (r) mark(n, CONFIG.formats[n].enabled && CONFIG.enabled ? 'skipped' : 'disabled', r); });
    slots.forEach(function (el) {
      var pos = el.getAttribute('data-ad-position'), pl = CONFIG.placements[pos], rec = state.slots[pos] = { format: pl && pl.format || null, state: 'empty', reason: '' };
      if (!pl || !pl.format) { rec.reason = 'no-format-assigned'; return; }
      var f = CONFIG.formats[pl.format]; if (!f || f.placement !== 'slot') { rec.state = 'skipped'; rec.reason = 'not-a-slot-format'; return; }
      var r = eligible(pl.format); if (r) { rec.state = 'skipped'; rec.reason = r; return; }
      if (el.children.length || el.textContent.trim()) { rec.state = 'skipped'; rec.reason = 'slot-occupied'; return; }
      if (wanted[pl.format]) { rec.state = 'skipped'; rec.reason = 'duplicate-format'; return; }
      wanted[pl.format] = el; rec.state = 'queued';
    });
    Object.keys(wanted).forEach(function (n) {
      var el = wanted[n], run = function () { if (unit(n).state === 'requested') return; mountSlot(n, el); };
      mark(n, 'queued'); slotOf[n] = el; used[n] = true;
      var fm = CONFIG.formats[n]; el.setAttribute('data-ad-managed', n);          // makes the (still empty) slot visible so it can be observed, and reserves its height to avoid layout shift
      el.style.minHeight = ((fm.kind === 'iframe' ? fm.height + 18 : (fm.reserveHeight || 1))) + 'px';
      if ('IntersectionObserver' in win) {
        var io = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); run(); } }, { rootMargin: CONFIG.timing.lazyMarginPx + 'px' });
        io.observe(el);
      } else run();
    });
    names.forEach(function (n) {
      var f = CONFIG.formats[n]; if (f.placement !== 'overlay' || eligible(n)) return;
      mark(n, 'queued');
      var go = function () { setTimeout(function () { mountOverlay(n); }, CONFIG.timing.overlayDelayMs); };
      if (doc.readyState === 'complete') go(); else win.addEventListener('load', go, { once: true });
    });
  }

  function init() {
    state.device = device();
    if (!CONFIG.enabled || CONFIG.neverOn.indexOf(PAGE) > -1 || !PAGE) { state.consent = 'n/a'; Object.keys(CONFIG.formats).forEach(function (n) { mark(n, 'skipped', !CONFIG.enabled ? 'ads-disabled' : 'page-excluded'); }); wireReset(); return; }
    state.consent = consentState();
    if (state.consent === 'needed') { Object.keys(CONFIG.formats).forEach(function (n) { mark(n, 'pending-consent'); }); showNotice(false); }
    else if (state.consent === 'denied' || state.consent === 'denied-gpc') Object.keys(CONFIG.formats).forEach(function (n) { mark(n, 'skipped', 'consent-' + state.consent); });
    else start();
    wireReset();
  }
  function wireReset() {                                         // any <a data-ad-choice> (e.g. on the Cookie page) lets the visitor change their mind
    doc.addEventListener('click', function (e) {
      var a = e.target && e.target.closest && e.target.closest('[data-ad-choice]'); if (!a) return;
      e.preventDefault(); store('clear'); var old = doc.getElementById('aurum-consent'); if (old) old.remove(); showNotice(true);
    });
  }

  win.AurumAds = {
    version: '1.0.0',
    status: function () { return JSON.parse(JSON.stringify({ page: state.page, device: state.device, consent: state.consent, started: state.started, units: state.units, slots: state.slots })); },
    config: function () { return JSON.parse(JSON.stringify(CONFIG)); }
  };

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', function () { PAGE = (doc.body.getAttribute('data-page') || ''); state.page = PAGE; init(); }); else init();
})();
