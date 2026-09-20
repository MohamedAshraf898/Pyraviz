/* ==========================================================
   Openrange – vanilla JS, no libraries
   Sections: helpers · loader · hero · intro words · reveals ·
             parallax · image trail · menu · form · main loop
   ========================================================== */
(() => {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeIO = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  const body = document.body;
  let vw = innerWidth, vh = innerHeight;
  let scrollY = window.scrollY;
  let view = 'home'; // 'home' | 'project' (set by work.js)

  /* ---------- Hero title: split into words / chars for the entrance ---------- */
  (function splitTitle() {
    const h = $('.hero__title');
    if (!h) return;
    const text = h.textContent.trim();
    h.setAttribute('aria-label', text);
    h.textContent = '';
    let i = 0;
    text.split(' ').forEach((word, wi, arr) => {
      const w = document.createElement('span');
      w.style.display = 'inline-block';
      w.setAttribute('aria-hidden', 'true');
      [...word].forEach(c => {
        const s = document.createElement('span');
        s.className = 'ch';
        s.textContent = c;
        s.style.transitionDelay = (0.55 + i++ * 0.035) + 's';
        w.appendChild(s);
      });
      h.appendChild(w);
      if (wi < arr.length - 1) h.appendChild(document.createTextNode(' '));
    });
  })();

  /* ---------- Scroll-scrubbed word reveal (intro + project story lead) ---------- */
  const scrubs = [];
  function registerScrub(el) {
    const raw = el.textContent.replace(/\s+/g, ' ').trim();
    el.setAttribute('aria-label', raw);
    el.textContent = '';
    const ws = [];
    raw.split(' ').forEach((t, i, arr) => {
      const w = document.createElement('span');
      w.className = 'w';
      w.setAttribute('aria-hidden', 'true');
      w.textContent = t;
      el.appendChild(w);
      if (i < arr.length - 1) el.appendChild(document.createTextNode(' '));
      ws.push(w);
    });
    scrubs.push({ el, words: ws });
  }
  $$('[data-words]').forEach(registerScrub);

  /* ==========================================================
     LOADER  (counter 0 → 100, words merge, curtain lifts)
     ========================================================== */
  const loader = $('.loader');
  const numEl = $('#loaderNum');

  function finishLoader() {
    body.classList.remove('is-loading');
    body.classList.add('is-ready');
    document.dispatchEvent(new Event('site:ready'));
    setTimeout(() => loader && loader.classList.add('is-gone'), 1400);
  }

  function runLoader() {
    if (!loader || reduce) {
      loader && loader.classList.add('is-gone');
      finishLoader();
      return;
    }
    const dur = 2600;
    const t0 = performance.now();
    let loaded = document.readyState === 'complete';
    window.addEventListener('load', () => (loaded = true), { once: true });
    const cap = setTimeout(() => (loaded = true), 7000); // never hang

    // uneven pace: quick start, a hesitation around 60-70, then sprint
    const pace = t => {
      if (t < .6) return .62 * easeOut(t / .6);
      if (t < .78) return .62 + .08 * ((t - .6) / .18);
      return .70 + .30 * easeIO((t - .78) / .22);
    };

    let done = false;
    (function tick(now) {
      const t = clamp((now - t0) / dur, 0, 1);
      let v = Math.round(pace(t) * 100);
      if (!loaded) v = Math.min(v, 96);
      numEl.textContent = v;
      if (v >= 100 && !done) {
        done = true;
        clearTimeout(cap);
        merge();
        return;
      }
      requestAnimationFrame(tick);
    })(t0);

    function merge() {
      const l = $('.loader__word--l').getBoundingClientRect();
      const r = $('.loader__word--r').getBoundingClientRect();
      const gap = r.left - l.right;
      loader.style.setProperty('--merge-l', (gap / 2) + 'px');
      loader.style.setProperty('--merge-r', (-gap / 2) + 'px');
      loader.classList.add('is-merge');
      setTimeout(() => {
        loader.classList.add('is-out');
        setTimeout(finishLoader, 350);
      }, 1050);
    }
  }

  /* ==========================================================
     HERO  (pinned; everything driven by scroll progress p)
     ========================================================== */
  const hero = $('#hero');
  const heroCopy = $('#heroCopy');
  const feature = $('#heroFeature');
  const cards = $$('.hero__card').map((el, i) => {
    const [fx, fy] = el.dataset.fly.split(',').map(Number);
    return { el, fx, fy, depth: [14, 22, 30, 18, 36][i] || 20 };
  });
  let featStart = { l: 0, t: 0, w: 0, h: 0 };
  let heroDist = 1;

  function measureHero() {
    if (!hero) return;
    feature.style.left = feature.style.top = feature.style.width = feature.style.height = '';
    feature.style.borderRadius = '';
    featStart = { l: feature.offsetLeft, t: feature.offsetTop, w: feature.offsetWidth, h: feature.offsetHeight };
    heroDist = Math.max(1, hero.offsetHeight - vh);
  }

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener('pointermove', e => {
    mouse.tx = (e.clientX / vw - .5) * 2;
    mouse.ty = (e.clientY / vh - .5) * 2;
  }, { passive: true });

  function updateHero(force) {
    if (!hero || view !== 'home') return;
    const top = hero.getBoundingClientRect().top;
    if (top < -hero.offsetHeight || top > vh) return; // off-screen
    const p = clamp(-top / heroDist, 0, 1);

    // copy fades up and out
    const ct = clamp(p / .16, 0, 1);
    heroCopy.style.opacity = 1 - ct;
    heroCopy.style.transform = `translate(-50%, calc(-50% - ${ct * 60}px))`;

    // floating cards drift outward, scale up, fade
    const ft = easeIO(clamp((p - .03) / .5, 0, 1));
    const fo = 1 - clamp((p - .06) / .4, 0, 1);
    for (const c of cards) {
      const dx = c.fx * ft * vw * .34 + mouse.x * c.depth;
      const dy = c.fy * ft * vh * .42 + mouse.y * c.depth * .7;
      c.el.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${1 + ft * .45})`;
      c.el.style.opacity = fo;
    }

    // featured tile grows to full-bleed
    const t = easeIO(clamp((p - .1) / .55, 0, 1));
    if (t <= 0 && !force) {
      feature.style.left = feature.style.top = feature.style.width = feature.style.height = '';
      feature.style.borderRadius = '';
    } else {
      feature.style.left = lerp(featStart.l, 0, t) + 'px';
      feature.style.top = lerp(featStart.t, 0, t) + 'px';
      feature.style.width = lerp(featStart.w, vw, t) + 'px';
      feature.style.height = lerp(featStart.h, vh, t) + 'px';
      feature.style.borderRadius = lerp(2, 0, t) + 'px';
    }
  }

  /* ==========================================================
     INTRO  (word-by-word reveal tied to scroll)
     ========================================================== */
  function updateScrubs() {
    for (let k = scrubs.length - 1; k >= 0; k--) {
      const sc = scrubs[k];
      if (!sc.el.isConnected) { scrubs.splice(k, 1); continue; }
      const r = sc.el.getBoundingClientRect();
      if (!r.height || r.bottom < -100 || r.top > vh + 100) continue;
      const start = vh * .88, end = vh * .38;
      const p = clamp((start - r.top) / (start - end + r.height * .6), 0, 1);
      const n = Math.round(p * sc.words.length);
      for (let i = 0; i < sc.words.length; i++) {
        const on = i < n;
        if (on !== sc.words[i]._on) { sc.words[i]._on = on; sc.words[i].classList.toggle('on', on); }
      }
    }
  }

  /* ==========================================================
     SERVICES  (row hover: image wipe · blurb + big name slide up · dot)
     ========================================================== */
  // split text into words > chars so each letter can slide up on its own
  $$('[data-split]').forEach(el => {
    const text = el.textContent.replace(/\s+/g, ' ').trim();
    el.setAttribute('aria-label', text);
    el.textContent = '';
    let i = 0;
    text.split(' ').forEach((word, wi, arr) => {
      const w = document.createElement('span');
      w.className = 'wd';
      w.setAttribute('aria-hidden', 'true');
      [...word].forEach(c => {
        const s = document.createElement('span');
        s.className = 'ch';
        s.style.setProperty('--i', i++);
        s.textContent = c;
        w.appendChild(s);
      });
      el.appendChild(w);
      if (wi < arr.length - 1) el.appendChild(document.createTextNode(' '));
    });
  });

  // touch devices have no hover: tap a row to open it (and close the others)
  const svcRows = $$('.svc');
  if (window.matchMedia('(hover: none)').matches) {
    svcRows.forEach(row => row.addEventListener('click', () => {
      const open = row.classList.contains('is-on');
      svcRows.forEach(r => r.classList.remove('is-on'));
      if (!open) row.classList.add('is-on');
    }));
  }

  /* ==========================================================
     REVEALS (IntersectionObserver)
     ========================================================== */
  $$('.services__list li').forEach((li, i) => li.style.setProperty('--d', (i * 0.06) + 's'));
  const io = new IntersectionObserver(entries => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }, { threshold: .15, rootMargin: '0px 0px -6% 0px' });
  $$('[data-reveal], .proj').forEach(el => io.observe(el));

  /* ==========================================================
     PARALLAX  (projects + footer image)
     ========================================================== */
  const pItems = $$('[data-parallax]').map(el => ({ el, f: parseFloat(el.dataset.parallax) || .06, top: 0, h: 0 }));
  const footImg = $('[data-parallax-img]');
  const footPic = footImg && $('img', footImg);

  function measureParallax() {
    for (const it of pItems) {
      it.el.style.transform = '';
      const r = it.el.getBoundingClientRect();
      it.top = r.top + window.scrollY; it.h = r.height;
    }
  }
  function updateParallax() {
    for (const it of pItems) {
      const c = it.top + it.h / 2 - scrollY - vh / 2;
      if (Math.abs(c) > vh * 1.6) continue;
      it.el.style.transform = `translate3d(0, ${(-c * it.f).toFixed(1)}px, 0)`;
    }
    if (footImg) {
      const r = footImg.getBoundingClientRect();
      if (r.bottom > 0 && r.top < vh) {
        const p = clamp((vh - r.top) / (vh + r.height), 0, 1);
        const slack = r.height * .18;
        footPic.style.transform = `translate3d(0, ${(-p * slack).toFixed(1)}px, 0)`;
      }
    }
  }

  /* ==========================================================
     IMAGE TRAIL
     ========================================================== */
  const trail = $('#originals');
  const layer = $('#trailLayer');
  const trailNames = [
    'portrait-01', 'dunes-02', 'sea-03', 'arch-04', 'forest-05', 'fabric-06', 'night-07',
    'mountains-08', 'still-09', 'pool-10', 'studio-11', 'field-12', 'warm-13'
  ].map(n => `assets/${n}.jpg`);
  // window.__ASSETS only exists in the single-file build (images inlined, keyed by path)
  const asset = p => (window.__ASSETS && window.__ASSETS[p]) || p;
  const trailSrc = trailNames.map(asset);
  let trailIdx = 0, zTop = 1;
  const last = { x: -999, y: -999 };

  if (trail && layer) {
    // warm the cache once the section is near
    const warm = new IntersectionObserver(es => {
      if (es[0].isIntersecting) { trailSrc.forEach(s => { const i = new Image(); i.src = s; }); warm.disconnect(); }
    }, { rootMargin: '600px' });
    warm.observe(trail);

    const spawn = (x, y, dx, dy) => {
      const img = document.createElement('img');
      const k = trailIdx % trailSrc.length;
      img.src = trailSrc[k]; img.alt = ''; img.draggable = false;
      img.className = 'trail__img' + (trailNames[k] === 'assets/portrait-01.jpg' ? '' : ' land');
      img.style.left = x + 'px'; img.style.top = y + 'px'; img.style.zIndex = ++zTop;
      trailIdx++;
      layer.appendChild(img);
      const mx = clamp(dx, -1, 1) * 40, my = clamp(dy, -1, 1) * 40;
      const base = 'translate(-50%, -50%)';
      const anim = img.animate([
        { opacity: 0, transform: `${base} translate(${-mx}px, ${-my}px) scale(.55)` },
        { opacity: 1, transform: `${base} translate(0px, 0px) scale(1)`, offset: .22 },
        { opacity: 1, transform: `${base} translate(${mx * .25}px, ${my * .25}px) scale(1)`, offset: .62 },
        { opacity: 0, transform: `${base} translate(${mx * .6}px, ${my * .6}px) scale(.82)` }
      ], { duration: 1700, easing: 'cubic-bezier(.2,.7,.1,1)', fill: 'forwards' });
      anim.onfinish = () => img.remove();
    };

    const onMove = e => {
      if (reduce) return;
      const r = trail.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const d = Math.hypot(x - last.x, y - last.y);
      const step = Math.max(70, r.width * .055);
      if (d > step) {
        const dx = (x - last.x) / d, dy = (y - last.y) / d;
        last.x = x; last.y = y;
        spawn(x, y, isFinite(dx) ? dx : 0, isFinite(dy) ? dy : 0);
      }
    };
    trail.addEventListener('pointermove', onMove, { passive: true });
    trail.addEventListener('pointerleave', () => { last.x = last.y = -999; });
  }

  /* ==========================================================
     MENU + ANCHORS
     ========================================================== */
  const toggle = $('#menuToggle');
  const menu = $('#menu');
  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', String(!open));
  }
  toggle.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
  window.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  function goTo(hash) {
    if (hash === '#top' || hash === '#') return window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    const t = $(hash);
    if (!t) return;
    const y = t.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const hash = a.getAttribute('href');
    if (hash.startsWith('#/')) { setMenu(false); return; } // router link (work.js)
    e.preventDefault();
    const wasOpen = body.classList.contains('menu-open');
    setMenu(false);
    if (hash.length <= 1) return;
    const go = () => setTimeout(() => goTo(hash), wasOpen ? 450 : 0);
    if (view !== 'home' && window.Work) window.Work.home().then(go); else go();
  });

  /* ==========================================================
     NEWSLETTER (front-end only: wire `fetch` to your provider)
     ========================================================== */
  const form = $('#subForm');
  const ok = $('#subOk');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const v = $('#subEmail').value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    form.classList.toggle('err', !valid);
    ok.textContent = valid ? 'Thanks, you’re on the list.' : 'Please enter a valid email.';
    if (valid) form.reset();
  });

  /* ==========================================================
     MAIN LOOP
     ========================================================== */
  let dirty = true;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; dirty = true; }, { passive: true });
  function onResize() {
    vw = innerWidth; vh = innerHeight; scrollY = window.scrollY;
    measureHero(); measureParallax(); dirty = true;
  }
  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(onResize, 120); });

  function frame() {
    mouse.x = lerp(mouse.x, mouse.tx, .06);
    mouse.y = lerp(mouse.y, mouse.ty, .06);
    const moving = Math.abs(mouse.x - mouse.tx) > .002 || Math.abs(mouse.y - mouse.ty) > .002;
    if (dirty || moving) {
      updateHero();
      updateScrubs();
      updateParallax();
      dirty = false;
    }
    requestAnimationFrame(frame);
  }

  // fonts change layout → measure again once they land
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(onResize);
  window.addEventListener('load', onResize);

  measureHero();
  measureParallax();
  requestAnimationFrame(frame);
  runLoader();

  // small API for work.js (router, project page)
  window.Site = {
    view: () => view,
    setView: v => { view = v; dirty = true; },
    remeasure: onResize,
    registerScrub,
    setMenu,
    markDirty: () => { dirty = true; }
  };
})();
