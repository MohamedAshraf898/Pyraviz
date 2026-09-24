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
  let vw = document.documentElement.clientWidth, vh = innerHeight; // clientWidth: the page width, without any scrollbar
  const isTouch = matchMedia('(hover: none)').matches;
  let scrollY = window.scrollY;
  let view = 'home'; // 'home' | 'project' (set by work.js)
  let dirty = true;  // something changed: re-run the scroll-driven updates on the next frame

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
      w.className = 'wd'; // each word clips its own letters, so every line of the heading rises on its own
      w.setAttribute('aria-hidden', 'true');
      [...word].forEach(c => {
        const s = document.createElement('span');
        s.className = 'ch';
        s.textContent = c;
        s.style.transitionDelay = (0.55 + i++ * 0.03) + 's';
        w.appendChild(s);
      });
      h.appendChild(w);
      if (wi < arr.length - 1) h.appendChild(document.createTextNode(' '));
    });
  })();

  /* ---------- Scroll-scrubbed word reveal (intro + project story lead) ---------- */
  const scrubs = [];
  function registerScrub(el, manual) { // manual: progress is set by code (hero about text), not by the element's position
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
    const sc = { el, words: ws, manual: !!manual };
    scrubs.push(sc);
    return sc;
  }
  // light up the first `frac` (0..1) of the words
  function setScrub(sc, frac) {
    const n = Math.round(frac * sc.words.length);
    for (let i = 0; i < sc.words.length; i++) {
      const on = i < n;
      if (on !== sc.words[i]._on) { sc.words[i]._on = on; sc.words[i].classList.toggle('on', on); }
    }
  }
  const scrubList = $$('[data-words]').map(el => registerScrub(el, el.dataset.words === 'hero'));
  const aboutScrub = scrubList.find(sc => sc.manual);

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
        requestAnimationFrame(merge); // measure on a clean layout (the counter just changed)
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
    return { el, fx, fy, depth: [16, 26, 24, 14, 30, 22, 34, 18, 20, 32, 28][i] || 20 };
  });
  const slot = $('#heroSlot');
  const pic = $('#heroPic');
  const featImg = feature && $('img', feature);
  const IA = parseFloat(featImg && featImg.dataset.ar) || 1.5; // aspect ratio of the featured picture
  let featStart = { l: 0, t: 0, w: 0, h: 0 };   // where the tile rests (from the slot)
  let stageW = 0, stageH = 0;                    // what the tile grows to: exactly the size of the pinned stage
  let Hi = 0, Hp = 0;                            // picture height at full-bleed; and the (smaller) height of its layer
  const about = $('#studio');
  const aboutKicker = $('#heroKicker');
  let heroDist = 1;   // total pinned scroll
  let growDist = 1;   // the part of it used by the image growing (unchanged from before the about text was added)
  const ABOUT_AT = .66; // the tile is full-bleed at .65 of growDist: the about text starts right after
  let heroP = 0;      // current progress of the growing tile (the header uses it to pick black or white)
  const hl = { ct: -1, t: -1, a: '', k: '', grow: null, off: null }; // what was last written, to skip identical writes

  function measureHero() {
    if (!hero) return;
    featStart = { l: slot.offsetLeft, t: slot.offsetTop, w: slot.offsetWidth, h: slot.offsetHeight };
    const stage = feature.parentElement;
    stageW = stage.clientWidth; stageH = stage.clientHeight;
    Hi = Math.max(stageH, stageW / IA);
    // the picture layer only needs about the picture's own resolution: on a 3x phone screen a full-size layer would
    // be ~40MB of GPU memory for a 1000px photo. Draw it smaller and let the transform scale it up.
    const dpr = window.devicePixelRatio || 1, srcW = vw <= 900 ? 1000 : 1400;
    const q = Math.min(1, (srcW * 1.7) / (Hi * IA * dpr));
    Hp = Hi * q;
    const Wp = Hp * IA;
    pic.style.width = Wp + 'px'; pic.style.height = Hp + 'px';
    pic.style.left = (stageW - Wp) / 2 + 'px'; pic.style.top = (stageH - Hp) / 2 + 'px';
    // the pinned distance is the height of the scroll track minus the pinned box, both fixed lengths: it does not
    // change when Safari's address bar collapses (window.innerHeight does)
    heroDist = Math.max(1, hero.offsetHeight - stage.parentElement.offsetHeight);
    growDist = heroDist * (vw <= 900 ? 2 / 3 : 2.4 / 3.4);
    hl.t = -1; // force a redraw
    hero.classList.add('is-set'); // in place: show it
  }

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener('pointermove', e => {
    mouse.tx = (e.clientX / vw - .5) * 2;
    mouse.ty = (e.clientY / vh - .5) * 2;
  }, { passive: true });

  if (hero) new IntersectionObserver(es => hero.classList.toggle('is-vis', es[0].isIntersecting), { rootMargin: '20% 0px' }).observe(hero);

  function updateHero() {
    if (!hero || view !== 'home') return;
    const top = hero.getBoundingClientRect().top;
    if (top < -hero.offsetHeight || top > vh) return; // off-screen
    const p = clamp(-top / growDist, 0, 1);
    heroP = p;
    const growing = p > .01;
    if (hl.grow !== growing) { hl.grow = growing; hero.classList.toggle('is-growing', growing); }

    // copy fades up and out (only while it is still visible)
    const ct = clamp(p / .16, 0, 1);
    if (ct !== hl.ct) {
      hl.ct = ct;
      heroCopy.style.opacity = 1 - ct;
      heroCopy.style.transform = `translate(-50%, calc(-50% - ${ct * 60}px))`;
    }

    // floating cards drift outward, scale up, fade; once they are gone they are hidden and cost nothing
    if (p < .5) {
      if (hl.off !== false) { hl.off = false; hero.classList.remove('cards-off'); }
      const ft2 = easeIO(clamp((p - .03) / .5, 0, 1));
      const fo = 1 - clamp((p - .06) / .4, 0, 1);
      for (const c of cards) {
        const dx = c.fx * ft2 * vw * .34 + mouse.x * c.depth;
        const dy = c.fy * ft2 * vh * .42 + mouse.y * c.depth * .7;
        c.el.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${1 + ft2 * .45})`;
        c.el.style.opacity = fo;
      }
    } else if (hl.off !== true) { hl.off = true; hero.classList.add('cards-off'); }

    // featured tile grows to full-bleed with transforms only. The picture is fitted (cover) into a box that grows from
    // the tile to the stage, exactly as before: the window layer is scaled to the box, the picture layer is
    // counter-scaled so it keeps its proportions.
    const t = easeIO(clamp((p - .1) / .55, 0, 1));
    if (t !== hl.t) {
      hl.t = t;
      const w = lerp(featStart.w, stageW, t), h = lerp(featStart.h, stageH, t);
      const l = lerp(featStart.l, 0, t), tt = lerp(featStart.t, 0, t);
      const sx = w / stageW, sy = h / stageH;                 // window scale
      const Hb = Math.max(h, w / IA);                          // height of the picture, fitted to cover the box
      feature.style.transform = `translate3d(${l.toFixed(2)}px, ${tt.toFixed(2)}px, 0) scale(${sx.toFixed(5)}, ${sy.toFixed(5)})`;
      pic.style.transform = `scale(${(Hb / (Hp * sx)).toFixed(5)}, ${(Hb / (Hp * sy)).toFixed(5)})`;
    }

    // about text: fades in over the full-bleed image, words light up with the scroll, then the kicker
    if (about) {
      const from = growDist * ABOUT_AT;
      const a = clamp((-top - from) / Math.max(1, heroDist - from), 0, 1);
      const av = clamp(a / .18, 0, 1).toFixed(3), kv = clamp((a - .6) / .2, 0, 1).toFixed(3);
      if (av !== hl.a) { hl.a = av; about.style.setProperty('--a', av); }
      if (aboutScrub) setScrub(aboutScrub, clamp((a - .1) / .5, 0, 1));
      if (kv !== hl.k) { hl.k = kv; aboutKicker.style.setProperty('--k', kv); }
    }
  }

  /* header / side labels on phones: black or white from what is behind them (see the CSS above) */
  const toneMQ = matchMedia('(max-width: 900px), (hover: none)');
  const toneEls = [$('.nav__logo'), $('.nav__toggle'), ...$$('.side')].filter(Boolean);
  function toneAt(x, y) {
    const el = document.elementsFromPoint(x, y).find(e => !e.closest('.nav'));
    if (!el) return 'light';
    if (el.closest('.svc-card--paper')) return 'light';
    if (el.closest('.svc-card--black')) return 'dark';
    if (el.closest('#hero')) return heroP > .55 ? 'dark' : 'light'; // white page until the tile has grown over the header
    if (el.closest('.pj__story')) return 'light';
    if (el.closest('.theme-dark, .pj, .lb, .menu')) return 'dark';
    return 'light';
  }
  let toneAt0 = 0, toneTimer = 0;
  function updateTone() {
    if (!toneMQ.matches) return;
    const now = performance.now();
    if (now - toneAt0 < 150) { // a colour change does not need to be frame-exact: at most ~6 checks a second, plus one when scrolling stops
      if (!toneTimer) toneTimer = setTimeout(() => { toneTimer = 0; toneAt0 = 0; dirty = true; }, 170);
      return;
    }
    toneAt0 = now;
    for (const e of toneEls) {
      const r = e.getBoundingClientRect();
      if (!r.width) continue;
      const tone = toneAt(r.left + r.width / 2, r.top + r.height / 2);
      if (e.dataset.tone !== tone) e.dataset.tone = tone;
    }
  }

  /* ==========================================================
     INTRO  (word-by-word reveal tied to scroll)
     ========================================================== */
  function updateScrubs() {
    for (let k = scrubs.length - 1; k >= 0; k--) {
      const sc = scrubs[k];
      if (!sc.el.isConnected) { scrubs.splice(k, 1); continue; }
      if (sc.manual) continue; // driven by the hero timeline
      const r = sc.el.getBoundingClientRect();
      if (!r.height || r.bottom < -100 || r.top > vh + 100) continue;
      const start = vh * .88, end = vh * .38;
      setScrub(sc, clamp((start - r.top) / (start - end + r.height * .6), 0, 1));
    }
  }

  /* ==========================================================
     LOGOS  (client marquee: endless drift; the scroll speeds it up and sets its direction)
     ========================================================== */
  const logoBox = $('#logosMarquee');
  const logoTrack = $('#logosTrack');
  let logoAnim = null, logoVis = false, logoRate = 1, logoDir = 1, logoLastY = 0;
  let logoHalf = 0, logoDur = 1, logoDown = false, logoVel = 0; // loop width (px), loop time (ms), held by hand, momentum (px per frame)
  const LOGO_SPEED = 55; // px per second when the page is still

  function buildLogos() {
    if (!logoTrack || reduce) return;
    // the track is [set][copy of set]; the set is repeated until it is wider than the screen, so there is never a gap
    const items = Array.from(logoTrack.children).filter(li => !li.hasAttribute('aria-hidden'));
    Array.from(logoTrack.children).forEach(li => { if (li.hasAttribute('aria-hidden')) li.remove(); });
    let width = logoTrack.scrollWidth, k = 0;
    while (width < vw * 1.05 && k < 6) {
      items.forEach(li => { const c = li.cloneNode(true); c.setAttribute('aria-hidden', 'true'); logoTrack.appendChild(c); });
      width = logoTrack.scrollWidth; k++;
    }
    const half = Array.from(logoTrack.children);
    half.forEach(li => { const c = li.cloneNode(true); c.setAttribute('aria-hidden', 'true'); logoTrack.appendChild(c); });
    const dur = (width / LOGO_SPEED) * 1000;
    logoHalf = width; logoDur = dur;
    if (logoAnim) { logoAnim.effect.updateTiming({ duration: dur }); }
    else {
      logoAnim = logoTrack.animate(
        [{ transform: 'translate3d(0,0,0)' }, { transform: 'translate3d(-50%,0,0)' }],
        { duration: dur, iterations: Infinity, easing: 'linear' }
      );
      logoAnim.pause();
    }
    if (logoVis) logoAnim.play();
  }
  if (logoBox && !reduce) {
    new IntersectionObserver(es => {
      logoVis = es[0].isIntersecting;
      if (logoAnim) { if (logoVis) logoAnim.play(); else logoAnim.pause(); }
    }, { rootMargin: '10% 0px' }).observe(logoBox);
  }
  // move the strip by px by hand (positive = to the right). The strip is a looping animation, so this just moves its clock.
  function shiftLogos(px) {
    if (!logoAnim || !logoHalf) return;
    logoAnim.currentTime = (logoAnim.currentTime || 0) - (px / logoHalf) * logoDur;
  }

  if (logoBox && !reduce) {
    let id = null, sx = 0, lx = 0, lt = 0, moved = false;
    logoBox.tabIndex = 0;
    logoBox.setAttribute('aria-label', 'Client logos. Use the left and right arrow keys to move along.');
    logoBox.addEventListener('pointerdown', e => {
      if (!logoAnim || (e.pointerType === 'mouse' && e.button !== 0)) return;
      id = e.pointerId; sx = lx = e.clientX; lt = e.timeStamp; moved = false; logoDown = true; logoVel = 0;
      logoAnim.pause(); // it stays under the finger
    });
    logoBox.addEventListener('pointermove', e => {
      if (!logoDown || e.pointerId !== id) return;
      if (!moved) {
        if (Math.abs(e.clientX - sx) < 4) return; // a tap is not a drag
        moved = true; logoBox.classList.add('is-drag');
        try { logoBox.setPointerCapture(id); } catch (_) {}
      }
      const dx = e.clientX - lx, dt = Math.max(1, e.timeStamp - lt);
      shiftLogos(dx); logoVel = .7 * logoVel + .3 * (dx / dt) * 16;
      lx = e.clientX; lt = e.timeStamp;
    });
    const end = e => {
      if (!logoDown || e.pointerId !== id) return;
      logoDown = false; logoBox.classList.remove('is-drag');
      if (e.timeStamp - lt > 90) logoVel = 0;                    // held still before letting go: no throw
      if (moved && Math.abs(logoVel) > .3) logoDir = logoVel < 0 ? 1 : -1; // then it drifts on the way it was thrown
      try { logoBox.releasePointerCapture(id); } catch (_) {}
      if (logoAnim && logoVis) logoAnim.play();
    };
    logoBox.addEventListener('pointerup', end);
    logoBox.addEventListener('pointercancel', e => { logoVel = 0; end(e); });
    logoBox.addEventListener('wheel', e => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // vertical scrolling stays the page's
      e.preventDefault(); shiftLogos(-e.deltaX);
    }, { passive: false });
    logoBox.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      logoVel = (e.key === 'ArrowRight' ? -1 : 1) * 14; // momentum covers a few hundred px
    });
  }

  function updateLogos() {
    if (!logoAnim || !logoVis) { logoLastY = scrollY; return; }
    // keep the clock away from 0 and from runaway values: whole loops look identical, so shift by whole loops
    const t = logoAnim.currentTime || 0;
    if (t < logoDur * .5 || t > logoDur * 4) logoAnim.currentTime = logoDur * 2 + (((t % logoDur) + logoDur) % logoDur);
    if (logoDown) { logoLastY = scrollY; return; }
    if (Math.abs(logoVel) > .2) { shiftLogos(logoVel); logoVel *= .94; } else logoVel = 0;
    const dy = scrollY - logoLastY; logoLastY = scrollY;
    if (dy) logoDir = dy > 0 ? 1 : -1;                       // follows the last scroll direction
    const target = logoDir * (1 + Math.min(Math.abs(dy) * .18, 7)); // faster the harder you scroll
    logoRate = lerp(logoRate, target, .08);
    logoAnim.updatePlaybackRate(logoRate);
  }

  /* ==========================================================
     SERVICES  (stack of sticky cards, scrubbed by the scroll position)
     Card j slides over card j-1 while its natural top travels from the bottom
     edge of the previous (stuck) card up to its own sticky position. Everything
     is computed from scrollY and numbers measured on resize: no per-frame layout reads.
     ========================================================== */
  const stackEl = $('#svcStack');
  const svcCards = stackEl ? $$('.svc-card', stackEl) : [];
  const svc = { top: 0, cardH: 0, gap: 0, tops: [], vis: false };

  if (svcCards.length) {
    stackEl.style.setProperty('--n', svcCards.length);
    const cnt = $('#svcCount');
    if (cnt) cnt.textContent = `(${String(svcCards.length).padStart(2, '0')})`;
    if (!reduce) {
      new IntersectionObserver(es => {
        svc.vis = es[0].isIntersecting;
        stackEl.classList.toggle('is-vis', svc.vis);
        dirty = true;
      }, { rootMargin: '100% 0px' }).observe(stackEl);
    }
  }
  function measureStack() {
    if (!svcCards.length) return;
    svc.top = stackEl.getBoundingClientRect().top + window.scrollY; // the list itself never moves
    svc.cardH = svcCards[0].offsetHeight;
    svc.gap = parseFloat(getComputedStyle(stackEl).rowGap) || 0;
    svc.tops = svcCards.map(c => parseFloat(getComputedStyle(c).top) || 0); // each card's sticky offset
  }
  function updateStack() {
    if (!svcCards.length || reduce || !svc.vis || !svc.cardH) return;
    const n = svcCards.length, step = svc.cardH + svc.gap;
    const y = i => svc.top + i * step - scrollY;   // where card i would be if it were not sticky
    const p = new Array(n).fill(0);                // p[j]: how far card j has slid over card j-1 (0..1)
    for (let j = 1; j < n; j++) {
      const from = svc.tops[j - 1] + svc.cardH, to = svc.tops[j];
      p[j] = clamp((from - y(j)) / (from - to), 0, 1);
    }
    let covered = 0;                               // total cover on card i = sum of p[j], j > i
    for (let i = n - 1; i >= 0; i--) {
      const a = smooth(clamp((vh - y(i)) / (vh - svc.tops[i]) * 1.3, 0, 1));
      const sc = (1 - Math.min(covered, 4) * .04).toFixed(4);
      const o = (Math.min(covered, 3) * .05).toFixed(3);
      const av = a.toFixed(3);
      const c = svcCards[i], key = sc + o + av;
      if (c._k !== key) {
        c._k = key;
        c.style.setProperty('--s', sc); c.style.setProperty('--o', o); c.style.setProperty('--a', av);
      }
      covered += p[i];
    }
  }

  /* ==========================================================
     REVEALS (IntersectionObserver)
     ========================================================== */
  const io = new IntersectionObserver(entries => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }, { threshold: .15, rootMargin: '0px 0px -6% 0px' });
  $$('[data-reveal], .proj').forEach(el => io.observe(el));

  /* ==========================================================
     PARALLAX  (projects)
     ========================================================== */
  const pItems = $$('[data-parallax]').map(el => ({ el, f: parseFloat(el.dataset.parallax) || .06, top: 0, h: 0 }));

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
  // the trail shows small thumbnails: use the 640w webp instead of the full-size jpg
  const trailSrc = trailNames.map(n => asset(n) !== n ? asset(n) : n.replace('assets/', 'assets/m/').replace('.jpg', '-640.webp'));
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
     WORK ROWS  (Selected work: the row's image grows as it scrolls in)
     IntersectionObserver keeps the set of rows near the screen; the main
     loop (rAF, driven by a passive scroll listener) writes --p (0 to 1)
     on each of them. CSS turns --p into clip-path / scale / opacity.
     ========================================================== */
  const rowsBox = $('#workGrid');
  const rowsVis = new Set();
  let rowP = new WeakMap();
  const smooth = t => t * t * (3 - 2 * t);
  const rowsMQ = matchMedia('(max-width: 640px)'); // phones only; desktop and tablet keep the card grid

  if (rowsBox && !reduce) { // reduced motion: CSS shows every image full size
    const rowIO = new IntersectionObserver(es => {
      for (const e of es) {
        e.target.classList.toggle('is-vis', e.isIntersecting);
        if (e.isIntersecting) rowsVis.add(e.target); else rowsVis.delete(e.target);
      }
      dirty = true;
    }, { rootMargin: '25% 0px' });

    let rowsOn = false;
    const watch = n => { if (rowsOn && n.nodeType === 1 && n.classList.contains('card')) rowIO.observe(n); };
    function setRows(on) {
      rowsOn = on;
      const cards = $$('.card', rowsBox);
      if (on) cards.forEach(watch);
      else { // back to the desktop grid: stop observing and clear everything the effect set
        rowIO.disconnect(); rowsVis.clear(); rowP = new WeakMap();
        cards.forEach(c => { c.classList.remove('is-vis'); c.style.removeProperty('--p'); });
      }
      dirty = true;
    }

    // rows are added / replaced by work.js (filters, "load more"): pick them up as they appear
    new MutationObserver(ms => {
      for (const m of ms) {
        m.addedNodes.forEach(watch);
        m.removedNodes.forEach(n => { if (n.nodeType === 1) { rowIO.unobserve(n); rowsVis.delete(n); } });
      }
      dirty = true;
    }).observe(rowsBox, { childList: true });

    setRows(rowsMQ.matches);
    rowsMQ.addEventListener('change', e => setRows(e.matches));
  }

  function updateRows() {
    if (!rowsVis.size || view !== 'home') return;
    const start = vh * .85; // progress 0: the row's top edge enters at 85% of the viewport height
    const reads = [];
    for (const el of rowsVis) {
      if (!el.isConnected) { rowsVis.delete(el); continue; }
      const r = el.getBoundingClientRect();
      const end = vh * .5 - r.height / 2; // progress 1: the row is centred
      reads.push([el, smooth(clamp((start - r.top) / (start - end), 0, 1))]);
    }
    for (const [el, p] of reads) { // writes after all reads: no forced reflow
      const v = Math.round(p * 1000) / 1000;
      if (rowP.get(el) !== v) { rowP.set(el, v); el.style.setProperty('--p', v); }
    }
  }

  /* ==========================================================
     TEAM  (tiles built from js/team.js · rows slide sideways with the scroll,
            alternating direction · counter counts up · tiles wipe in)
     ========================================================== */
  const teamBox = $('#teamRows');
  const TEAM = window.TEAM || [];
  const teamRows = [];   // { el, track, dir, over }
  const teamVis = new Set();
  const escH = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  if (teamBox && TEAM.length) {
    const ROWS = 3;
    const pad2 = n => String(n).padStart(2, '0');
    const initials = name => {
      const w = String(name).trim().split(/\s+/);
      return ((w[0] || '')[0] || '') + (w.length > 1 ? w[w.length - 1][0] : '');
    };
    const rows = Array.from({ length: ROWS }, () => []);
    TEAM.forEach((m, i) => rows[i % ROWS].push([m, i]));   // interleave, so every row mixes roles
    teamBox.innerHTML = rows.map((list, r) =>
      `<div class="team__row" data-dir="${r % 2 ? 1 : -1}" tabindex="0" aria-label="Team members, row ${r + 1}. Use the left and right arrow keys to move along."><div class="team__track">` +
      list.map(([m, i], k) =>
        `<article class="tm" role="listitem" data-t="${i % 5}" style="--i:${k}">` +
        `<div class="tm__img">` +
        (m.photo
          ? `<img src="${escH(m.photo)}" width="480" height="600" alt="" loading="lazy" decoding="async">`
          : `<span class="tm__ini" aria-hidden="true">${escH(initials(m.name).toUpperCase())}</span>`) +
        `<span class="tm__no" aria-hidden="true">${pad2(i + 1)}</span></div>` +
        `<h3 class="tm__name">${escH(m.name)}</h3><p class="tm__role">${escH(m.role)}</p></article>`
      ).join('') + `</div></div>`
    ).join('');

    $$('.team__row', teamBox).forEach(el => teamRows.push({ el, track: $('.team__track', el), dir: +el.dataset.dir, over: 0, m: 0, vel: 0, down: false }));

    // hand control, on top of the scroll-driven slide: drag (mouse), swipe (touch), sideways wheel / trackpad, arrow keys.
    // r.m is the extra offset the visitor adds; updateTeam() clamps it and gives it a little momentum.
    if (!reduce) {
      for (const r of teamRows) {
        const el = r.el;
        let id = null, sx = 0, lx = 0, lt = 0, moved = false;
        el.addEventListener('pointerdown', e => {
          if (e.pointerType === 'mouse' && e.button !== 0) return;
          id = e.pointerId; sx = lx = e.clientX; lt = e.timeStamp; moved = false; r.down = true; r.vel = 0;
        });
        el.addEventListener('pointermove', e => {
          if (!r.down || e.pointerId !== id) return;
          if (!moved) {
            if (Math.abs(e.clientX - sx) < 4) return; // a tap is not a drag
            moved = true; el.classList.add('is-drag');
            try { el.setPointerCapture(id); } catch (_) {}
          }
          const dx = e.clientX - lx, dt = Math.max(1, e.timeStamp - lt);
          r.m += dx; r.vel = .7 * r.vel + .3 * (dx / dt) * 16;
          lx = e.clientX; lt = e.timeStamp; dirty = true;
        });
        const end = e => {
          if (!r.down || e.pointerId !== id) return;
          r.down = false; el.classList.remove('is-drag');
          if (e.timeStamp - lt > 90) r.vel = 0; // held still before letting go: no throw
          try { el.releasePointerCapture(id); } catch (_) {}
          dirty = true;
        };
        el.addEventListener('pointerup', end);
        el.addEventListener('pointercancel', e => { r.vel = 0; end(e); });
        el.addEventListener('wheel', e => {
          if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // vertical scrolling stays the page's
          e.preventDefault(); r.vel = 0; r.m -= e.deltaX; dirty = true;
        }, { passive: false });
        el.addEventListener('keydown', e => {
          if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
          e.preventDefault();
          const tile = r.track.firstElementChild;
          const step = tile.offsetWidth + (parseFloat(getComputedStyle(r.track).columnGap) || 0);
          r.vel = (e.key === 'ArrowRight' ? -1 : 1) * step / 20; // momentum covers about one tile
          dirty = true;
        });
      }
    }
    const cnt = $('#teamCount');
    if (cnt) cnt.textContent = `(${TEAM.length})`;

    // rows: tiles wipe in when the row first shows; is-vis = on screen (will-change only then)
    const teamIO = new IntersectionObserver(es => {
      for (const e of es) {
        e.target.classList.toggle('is-vis', e.isIntersecting);
        if (e.isIntersecting) { e.target.classList.add('in'); teamVis.add(e.target); } else teamVis.delete(e.target);
      }
      dirty = true;
    }, { rootMargin: '10% 0px' });
    teamRows.forEach(r => teamIO.observe(r.el));

    // counter 0 -> N the first time it is on screen
    const numEl = $('#teamNum');
    if (numEl) {
      const target = TEAM.length;
      const countIO = new IntersectionObserver(es => {
        if (!es[0].isIntersecting) return;
        countIO.disconnect();
        if (reduce) { numEl.textContent = target; return; }
        const t0 = performance.now(), dur = 1800;
        (function step(now) {
          const t = clamp((now - t0) / dur, 0, 1);
          numEl.textContent = Math.round(target * easeOut(t));
          if (t < 1) requestAnimationFrame(step);
        })(t0);
      }, { threshold: .4 });
      countIO.observe(numEl);
    }
  }

  function measureTeam() {
    for (const r of teamRows) r.over = Math.max(0, r.track.scrollWidth - vw);
  }
  function updateTeam() {
    if (!teamRows.length || reduce || !teamVis.size || view !== 'home') return;
    const b = teamBox.getBoundingClientRect();
    const p = clamp((vh - b.top) / (vh + b.height), 0, 1); // 0: the block enters at the bottom, 1: it leaves at the top
    for (const r of teamRows) {
      const base = -(r.dir < 0 ? p : 1 - p) * r.over; // where the scroll alone puts the row
      if (!r.down && Math.abs(r.vel) > .15) { r.m += r.vel; r.vel *= .95; dirty = true; } else if (!r.down) r.vel = 0;
      // the row may never leave its track: base + m stays between -over and 0
      const lo = -r.over - base, hi = -base;
      if (r.m < lo) { r.m = lo; r.vel = 0; } else if (r.m > hi) { r.m = hi; r.vel = 0; }
      r.track.style.transform = `translate3d(${(base + r.m).toFixed(1)}px, 0, 0)`;
    }
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

  // Contact overlay: #contact-form is a direct, shareable link as well as an in-site overlay.
  const contactModal = $('#contactForm');
  const contactForm = $('#contactEnquiryForm');
  const contactWhatsapp = $('#contactWhatsapp');
  const contactEndpoint = 'https://script.google.com/macros/s/AKfycbyc63NkbrXLeJkI9V4efDMiUa8Ts13OFblmdjnouFitOnmC3KBRaOB5fKMNUhLuYNg/exec';
  let contactFocus = null;
  function setContact(open, updateHash = true) {
    if (!contactModal) return;
    if (open) {
      contactFocus = document.activeElement;
      setMenu(false); body.classList.add('contact-open'); contactModal.classList.add('is-open');
      contactModal.setAttribute('aria-hidden', 'false');
      if (updateHash && location.hash !== '#contact-form') history.pushState(null, '', '#contact-form');
      setTimeout(() => contactForm?.querySelector('input')?.focus(), 100);
    } else {
      body.classList.remove('contact-open'); contactModal.classList.remove('is-open'); contactModal.setAttribute('aria-hidden', 'true');
      if (updateHash && location.hash === '#contact-form') history.replaceState(null, '', location.pathname + location.search);
      contactFocus?.focus?.({ preventScroll: true });
    }
  }
  document.addEventListener('click', e => {
    if (e.target.closest('[data-contact-open], a[href="#contact-form"]')) { e.preventDefault(); setContact(true); }
    if (e.target.closest('[data-contact-close]')) setContact(false);
  });
  window.addEventListener('hashchange', () => setContact(location.hash === '#contact-form', false));
  if (location.hash === '#contact-form') setContact(true, false);
  window.addEventListener('keydown', e => { if (e.key === 'Escape' && contactModal?.classList.contains('is-open')) { e.stopPropagation(); setContact(false); } }, true);
  contactForm?.addEventListener('submit', async e => {
    e.preventDefault();
    if (!contactForm.reportValidity()) return;
    const submit = contactForm.querySelector('.contact-form__submit');
    const success = contactForm.querySelector('.contact-form__success');
    const services = [...contactForm.querySelectorAll('input[name="services"]:checked')].map(input => input.value);
    const payload = new URLSearchParams({
      name: contactForm.elements.name.value.trim(),
      phone: contactForm.elements.phone.value.trim(),
      services: services.join(', ')
    });
    submit.disabled = true;
    try {
      // Apps Script accepts form-encoded POSTs. no-cors lets its redirecting web-app endpoint receive the lead.
      await fetch(contactEndpoint, { method: 'POST', mode: 'no-cors', body: payload });
      success.hidden = false;
      contactForm.reset();
      setTimeout(() => setContact(false), 700);
    } catch {
      success.textContent = 'Something went wrong. Please try WhatsApp instead.';
      success.hidden = false;
    } finally {
      submit.disabled = false;
    }
  });
  contactWhatsapp?.addEventListener('click', () => {
    const name = contactForm?.elements.name?.value.trim();
    const services = [...(contactForm?.querySelectorAll('input[name="services"]:checked') || [])].map(input => input.value);
    const message = `Hello PyraViz${name ? `, I'm ${name}` : ''}. I'm interested in ${services.length ? services.join(', ') : 'your services'}.`;
    contactWhatsapp.href = `https://wa.me/201112880001?text=${encodeURIComponent(message)}`;
  });

  function goTo(hash) {
    if (hash === '#top' || hash === '#') return window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    const t = $(hash);
    if (!t) return;
    let y = t.getBoundingClientRect().top + window.scrollY;
    if (t === about && hero) { // the about text is pinned inside the hero: land where it is fully shown
      const from = growDist * ABOUT_AT;
      y = hero.getBoundingClientRect().top + window.scrollY + from + (heroDist - from) * .85;
    }
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
     MAIN LOOP
     ========================================================== */
  window.addEventListener('scroll', () => { scrollY = window.scrollY; dirty = true; }, { passive: true });
  let lastW = innerWidth;
  function onResize(fromResizeEvent) {
    // iOS Safari fires a resize every time its address bar collapses or returns (same width, ~100px of height).
    // The pinned stage does not change size then (it is 100svh), and nothing measured depends on innerHeight,
    // so re-measuring in the middle of a scroll would only make the hero stutter.
    const st = feature && feature.parentElement;
    if (fromResizeEvent === true && isTouch && st && innerWidth === lastW && st.clientWidth === stageW && st.clientHeight === stageH) { vh = innerHeight; return; }
    lastW = innerWidth;
    vw = document.documentElement.clientWidth; vh = innerHeight; scrollY = window.scrollY;
    measureHero(); measureParallax(); measureTeam(); measureStack(); buildLogos(); dirty = true;
  }
  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => onResize(true), 120); });

  function frame() {
    mouse.x = lerp(mouse.x, mouse.tx, .06);
    mouse.y = lerp(mouse.y, mouse.ty, .06);
    const moving = Math.abs(mouse.x - mouse.tx) > .002 || Math.abs(mouse.y - mouse.ty) > .002;
    updateLogos();
    if (dirty || moving) {
      // reads first, layout-affecting writes last: avoids a forced synchronous reflow every frame
      updateScrubs();
      updateRows();
      updateStack();
      updateTeam();
      updateParallax();
      updateHero();
      updateTone();
      dirty = false;
    }
    requestAnimationFrame(frame);
  }

  // run fn once the browser has painted, when layout is clean, so reading it does not force a reflow
  const afterPaint = fn => requestAnimationFrame(() => setTimeout(fn, 0));

  // fonts change layout → measure again once they land
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => afterPaint(onResize));
  window.addEventListener('load', () => afterPaint(onResize));

  afterPaint(() => { measureHero(); measureParallax(); measureTeam(); measureStack(); buildLogos(); requestAnimationFrame(frame); });
  runLoader();

  // hero feature: a small file loads first; the full-size one swaps in (same picture) once the loader is done and the
  // browser is idle, so nothing is being decoded while the visitor starts scrolling
  (function upgradeFeature() {
    const img = featImg;
    if (!img || !img.dataset.hi) return;
    const hi = matchMedia('(max-width: 900px)').matches ? img.dataset.hiM : img.dataset.hi;
    const go = () => {
      const im = new Image();
      im.src = hi;
      (im.decode ? im.decode() : Promise.resolve()).catch(() => {}).then(() => { img.removeAttribute('srcset'); img.src = hi; });
    };
    const later = () => (window.requestIdleCallback ? requestIdleCallback(go, { timeout: 3000 }) : setTimeout(go, 1500));
    if (body.classList.contains('is-ready')) later(); else document.addEventListener('site:ready', later, { once: true });
  })();

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
