/* ==========================================================
   Openrange – work.js (vanilla)
   Reads window.PROJECTS (js/projects.js) and builds:
     · the home grid   (filters + "load more" + cursor label)
     · the project page (title, main picture, gallery + lightbox,
                         story section, next / previous)
     · a tiny hash router  (#/  ->  home,   #/work/<slug>  ->  project)
       with a curtain page-transition
   ========================================================== */
(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hoverable = matchMedia('(hover: hover)').matches;
  const body = document.body;
  const SITE_TITLE = document.title;
  const PAGE = 9; // cards per "load more"

  /* ---------- data helpers ---------- */
  // 'p07' -> assets/projects/p07.jpg ; paths / URLs pass through ; single-file build swaps in inlined data
  const A = p => {
    if (!p) return '';
    if (!/[\/.]/.test(p)) p = `assets/projects/${p}.jpg`;
    return (window.__ASSETS && window.__ASSETS[p]) || p;
  };
  // responsive webp variants (assets/projects/m/pNN-{480,800,1200}.webp) for the standard project images;
  // anything else (custom paths, URLs, the inlined single-file build) falls back to the plain src
  const RS = (src, sizes) => {
    const m = /^assets\/projects\/(p\d+)\.jpg$/.exec(src || '');
    if (!m) return '';
    const set = [480, 800, 1200].map(w => `assets/projects/m/${m[1]}-${w}.webp ${w}w`).join(', ');
    return ` srcset="${set}" sizes="${sizes}"`;
  };
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const slugify = s => String(s).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const pad = n => String(n).padStart(2, '0');

  const DATA = (window.PROJECTS || []).map((p, i) => {
    const gallery = (p.gallery || []).map(g => (typeof g === 'string' ? { src: g } : g)).filter(g => g && g.src);
    const story = p.story || {};
    return Object.assign({}, p, {
      slug: p.slug || slugify(p.title || 'project-' + (i + 1)),
      index: i,
      gallery,
      story: {
        lead: story.lead || '',
        body: story.body || [],
        images: (story.images || []).slice(0, 2).map(g => (typeof g === 'string' ? { src: g } : g)),
        credits: story.credits || []
      }
    });
  });
  const bySlug = s => DATA.find(p => p.slug === s);
  if (!DATA.length) console.warn('[work.js] window.PROJECTS is empty – add projects in js/projects.js');

  /* ==========================================================
     HOME GRID
     ========================================================== */
  const grid = $('#workGrid');
  const moreBtn = $('#loadMore');
  const moreBox = $('.work__more');
  const progEl = $('#workProgress');
  const barEl = $('#workBar');
  const filtersEl = $('#workFilters');
  const countEl = $('#workCount');

  let filter = 'All';
  let list = DATA;
  let shown = 0;

  const cardIO = new IntersectionObserver(es => {
    for (const e of es) if (e.isIntersecting) { e.target.classList.add('in'); cardIO.unobserve(e.target); }
  }, { threshold: .1, rootMargin: '0px 0px -5% 0px' });

  function makeCard(p, n) {
    const a = document.createElement('a');
    a.className = 'card';
    a.href = `#/work/${encodeURIComponent(p.slug)}`;
    a.style.setProperty('--d', ((n % 3) * 0.09) + 's');
    a.innerHTML =
      `<div class="card__media"><img src="${esc(A(p.cover))}"${RS(A(p.cover), '(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw')} alt="" loading="lazy" decoding="async"></div>` +
      `<div class="card__info"><h3 class="card__title">${esc(p.title)}</h3>` +
      `<p class="card__client">${esc(p.client)}</p>` +
      `<span class="card__cat">${esc(p.category)} · ${esc(p.year)}</span></div>`;
    return a;
  }

  function updateProgress() {
    const total = list.length;
    progEl.textContent = `${pad(shown)} / ${pad(total)}`;
    barEl.style.width = (total ? (shown / total) * 100 : 0) + '%';
    const done = shown >= total;
    moreBox.classList.toggle('is-done', done);
    const left = total - shown;
    moreBtn.textContent = left > 0 ? `Load more (${Math.min(PAGE, left)} of ${left})` : 'All shown';
  }

  function renderMore() {
    const next = list.slice(shown, shown + PAGE);
    const frag = document.createDocumentFragment();
    next.forEach((p, i) => frag.appendChild(makeCard(p, i)));
    const before = grid.children.length;
    grid.appendChild(frag);
    for (let i = before; i < grid.children.length; i++) cardIO.observe(grid.children[i]);
    shown += next.length;
    updateProgress();
  }

  function buildFilters() {
    const cats = [];
    DATA.forEach(p => { if (p.category && !cats.includes(p.category)) cats.push(p.category); });
    const all = ['All', ...cats];
    filtersEl.innerHTML = all.map(c => {
      const n = c === 'All' ? DATA.length : DATA.filter(p => p.category === c).length;
      return `<button class="chip" type="button" role="tab" data-cat="${esc(c)}" aria-selected="${c === filter}">${esc(c)}<sup>${n}</sup></button>`;
    }).join('');
    filtersEl.addEventListener('click', e => {
      const b = e.target.closest('.chip');
      if (!b || b.dataset.cat === filter) return;
      setFilter(b.dataset.cat);
    });
  }

  async function setFilter(cat) {
    filter = cat;
    $$('.chip', filtersEl).forEach(c => c.setAttribute('aria-selected', String(c.dataset.cat === cat)));
    grid.classList.add('is-swap');
    await wait(reduce ? 0 : 320);
    list = cat === 'All' ? DATA : DATA.filter(p => p.category === cat);
    grid.innerHTML = '';
    shown = 0;
    renderMore();
    // keep the grid in view after the swap
    const top = grid.getBoundingClientRect().top;
    if (top < 80) window.scrollTo({ top: grid.getBoundingClientRect().top + scrollY - 140, behavior: 'auto' });
    grid.classList.remove('is-swap');
  }

  if (grid) {
    countEl.textContent = `(${DATA.length})`;
    buildFilters();
    renderMore();
    moreBtn.addEventListener('click', renderMore);
  }

  /* cursor label ("View") over cards */
  (function viewCursor() {
    const cur = $('#vcur');
    if (!cur || !hoverable || !grid) return;
    let x = -100, y = -100, tx = -100, ty = -100, raf = 0;
    const loop = () => {
      x = lerp(x, tx, .2); y = lerp(y, ty, .2);
      cur.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (Math.abs(x - tx) > .3 || Math.abs(y - ty) > .3 || cur.classList.contains('on')) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    grid.addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; kick(); }, { passive: true });
    grid.addEventListener('pointerover', e => {
      if (e.target.closest('.card')) { if (!cur.classList.contains('on')) { x = tx = e.clientX; y = ty = e.clientY; } cur.classList.add('on'); kick(); }
    });
    grid.addEventListener('pointerout', e => {
      if (!e.relatedTarget || !e.relatedTarget.closest || !e.relatedTarget.closest('.card')) cur.classList.remove('on');
    });
    grid.addEventListener('pointerleave', () => cur.classList.remove('on'));
    window.addEventListener('scroll', () => { if (!$('.card:hover')) cur.classList.remove('on'); }, { passive: true });
  })();

  /* ==========================================================
     LIGHTBOX
     ========================================================== */
  const lb = $('#lightbox');
  const lbImg = $('#lbImg');
  const lbCap = $('#lbCap');
  const lbCount = $('#lbCount');
  const lbState = { items: [], i: 0, lastFocus: null, busy: 0 };

  function lbShow(i, instant) {
    const n = lbState.items.length;
    if (!n) return;
    lbState.i = (i + n) % n;
    const it = lbState.items[lbState.i];
    const token = ++lbState.busy;
    lbCount.textContent = `${pad(lbState.i + 1)} / ${pad(n)}`;
    lbCap.textContent = it.caption || '';
    const src = A(it.src);
    const pre = new Image();
    const apply = () => {
      if (token !== lbState.busy) return;
      lbImg.src = src; lbImg.alt = it.alt || it.caption || '';
      requestAnimationFrame(() => lbImg.classList.remove('swap'));
    };
    if (!instant) lbImg.classList.add('swap');
    pre.onload = pre.onerror = () => setTimeout(apply, instant ? 0 : 180);
    pre.src = src;
    // warm neighbours
    [1, -1].forEach(d => { const nb = lbState.items[(lbState.i + d + n) % n]; if (nb) new Image().src = A(nb.src); });
  }
  function lbOpen(items, i) {
    lbState.items = items; lbState.lastFocus = document.activeElement;
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); body.classList.add('lb-open');
    lbShow(i, true);
    $('#lbClose').focus({ preventScroll: true });
  }
  function lbClose() {
    lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); body.classList.remove('lb-open');
    lbState.busy++;
    if (lbState.lastFocus && lbState.lastFocus.focus) lbState.lastFocus.focus({ preventScroll: true });
  }
  if (lb) {
    $('#lbClose').addEventListener('click', lbClose);
    $('#lbPrev').addEventListener('click', () => lbShow(lbState.i - 1));
    $('#lbNext').addEventListener('click', () => lbShow(lbState.i + 1));
    $('#lbStage').addEventListener('click', e => { if (e.target.id === 'lbStage') lbClose(); });
    window.addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') { e.stopPropagation(); lbClose(); }
      else if (e.key === 'ArrowRight') lbShow(lbState.i + 1);
      else if (e.key === 'ArrowLeft') lbShow(lbState.i - 1);
    }, true);
    // swipe
    let sx = null;
    const st = $('#lbStage');
    st.addEventListener('pointerdown', e => { sx = e.clientX; });
    window.addEventListener('pointerup', e => {
      if (sx == null) return;
      const dx = e.clientX - sx; sx = null;
      if (Math.abs(dx) > 55 && lb.classList.contains('open')) lbShow(lbState.i + (dx < 0 ? 1 : -1));
    });
  }

  /* ==========================================================
     PROJECT PAGE
     ========================================================== */
  const home = $('#view-home');
  const pv = $('#view-project');
  let pvIO = null;
  let pvImgs = [];   // parallax images
  let pvOn = false;
  let current = { name: 'home', slug: null };

  function splitChars(text) {
    let i = 0;
    return text.split(' ').map(w =>
      `<span class="wd" aria-hidden="true">${[...w].map(c => `<span class="ch" style="--i:${i++}">${esc(c)}</span>`).join('')}</span>`
    ).join(' ');
  }

  function galleryHTML(p) {
    return p.gallery.map((g, i) =>
      `<button class="g" type="button" data-i="${i}" aria-label="Open image ${i + 1} of ${p.gallery.length}">` +
      `<img src="${esc(A(g.src))}"${RS(A(g.src), '(max-width: 900px) 60vw, 45vw')} alt="${esc(g.alt || g.caption || '')}" loading="lazy" decoding="async">` +
      `<span class="g__n">${pad(i + 1)}</span></button>`
    ).join('');
  }

  function storyHTML(p) {
    const s = p.story;
    const imgs = s.images;
    const hasAny = s.lead || s.body.length || imgs.length || s.credits.length;
    if (!hasAny) return '';
    const badge = imgs.length
      ? `<svg class="story__badge" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="sb" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0"/></defs>` +
      `<text><textPath href="#sb" textLength="472" lengthAdjust="spacing">Case study • ${esc(p.year)} • Openrange • </textPath></text><circle cx="100" cy="100" r="5" fill="currentColor"/></svg>`
      : '';
    const credits = s.credits.length
      ? `<dl class="story__credits">${s.credits.map(c => `<div><dt>${esc(c.role)}</dt><dd>${esc(c.name)}</dd></div>`).join('')}</dl>`
      : '';
    return `<section class="pj__story story--${imgs.length}" aria-label="The story">
      <p class="story__eyebrow r">The story</p>
      ${s.lead ? `<h2 class="story__lead" data-words>${esc(s.lead)}</h2>` : ''}
      <div class="story__grid">
        <span class="story__num" aria-hidden="true">${pad(p.index + 1)}</span>
        ${imgs[0] ? `<figure class="story__img story__img--a" data-par="-1"><img src="${esc(A(imgs[0].src))}"${RS(A(imgs[0].src), '(max-width: 900px) 84vw, 42vw')} alt="${esc(imgs[0].alt || '')}" loading="lazy" decoding="async"></figure>` : ''}
        ${badge}
        <div class="story__text r">${s.body.map(t => `<p>${esc(t)}</p>`).join('')}${credits}</div>
        ${imgs[1] ? `<figure class="story__img story__img--b" data-par="1"><img src="${esc(A(imgs[1].src))}"${RS(A(imgs[1].src), '(max-width: 900px) 84vw, 42vw')} alt="${esc(imgs[1].alt || '')}" loading="lazy" decoding="async"></figure>` : ''}
      </div>
    </section>`;
  }

  function projectHTML(p) {
    const n = DATA.length;
    const next = DATA[(p.index + 1) % n], prev = DATA[(p.index - 1 + n) % n];
    const meta = [
      ['Client', p.client], ['Year', p.year], ['Category', p.category],
      ['Services', (p.services || []).join(', ')], ['Role', p.role]
    ].filter(m => m[1]);
    const hero = p.hero || p.cover;
    return `<article class="pj">
      <header class="pj__head">
        <p class="pj__eyebrow"><span>Project ${pad(p.index + 1)} / ${pad(n)}</span><span>${esc(p.category)}</span><span>${esc(p.year)}</span></p>
        <h1 class="pj__title" aria-label="${esc(p.title)}">${splitChars(p.title)}</h1>
        <div class="pj__intro">
          <p class="pj__desc r" style="--d:.5s">${esc(p.description)}</p>
          <dl class="pj__meta r" style="--d:.65s">${meta.map(m => `<div><dt>${esc(m[0])}</dt><dd>${esc(m[1])}</dd></div>`).join('')}</dl>
        </div>
      </header>
      <figure class="pj__main" data-par="1"><img src="${esc(A(hero))}"${RS(A(hero), '100vw')} alt="${esc(p.title)}" decoding="async" fetchpriority="high"></figure>
      ${p.gallery.length ? `<section class="pj__gallery" aria-label="Gallery">
        <div class="pj__gallery-head r"><h2>Gallery</h2><span>${p.gallery.length} image${p.gallery.length === 1 ? '' : 's'}</span></div>
        <div class="pj__grid" id="pjGrid">${galleryHTML(p)}</div>
      </section>` : ''}
      ${storyHTML(p)}
      <section class="pj__next" aria-label="Next project">
        <a class="next" href="#/work/${encodeURIComponent(next.slug)}">
          <span class="next__label">Next project · ${pad(next.index + 1)} / ${pad(n)}</span>
          <span class="next__title">${esc(next.title)}</span>
          <figure class="next__img"><img src="${esc(A(next.cover))}"${RS(A(next.cover), '27vw')} alt="" loading="lazy" decoding="async"></figure>
        </a>
        <div class="pj__pn">
          <a href="#/work/${encodeURIComponent(prev.slug)}">&larr; ${esc(prev.title)}</a>
          <a href="#work">All work</a>
        </div>
      </section>
    </article>`;
  }

  function mountProject(p) {
    pv.innerHTML = projectHTML(p);
    document.title = `${p.title} | Openrange`;

    // reveals for anything marked .r / .g / .story__img
    if (pvIO) pvIO.disconnect();
    pvIO = new IntersectionObserver(es => {
      for (const e of es) if (e.isIntersecting) { e.target.classList.add('in'); pvIO.unobserve(e.target); }
    }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    $$('.r, .g, .story__img', pv).forEach(el => pvIO.observe(el));

    // gallery images fade in as they load
    $$('.g img', pv).forEach(img => {
      if (img.complete && img.naturalWidth) img.classList.add('ld');
      else img.addEventListener('load', () => img.classList.add('ld'), { once: true });
    });

    // gallery -> lightbox
    const g = $('#pjGrid', pv);
    if (g) g.addEventListener('click', e => {
      const b = e.target.closest('.g');
      if (b) lbOpen(p.gallery, +b.dataset.i);
    });

    // story lead: scroll-scrubbed words
    const lead = $('.story__lead', pv);
    if (lead && window.Site) window.Site.registerScrub(lead);

    // parallax images
    pvImgs = $$('[data-par]', pv).map(fig => ({ fig, img: $('img', fig), dir: +fig.dataset.par || 1 }));
    pvUpdate();
  }

  function pvUpdate() {
    if (!pvOn) return;
    const vh = innerHeight;
    for (const it of pvImgs) {
      const r = it.fig.getBoundingClientRect();
      if (r.bottom < -50 || r.top > vh + 50) continue;
      const t = clamp((vh - r.top) / (vh + r.height), 0, 1);
      it.img.style.transform = `translate3d(0, ${((t - .5) * 2 * r.height * .085 * it.dir).toFixed(1)}px, 0)`;
    }
  }
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!pvOn || ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; pvUpdate(); });
  }, { passive: true });
  window.addEventListener('resize', () => pvUpdate());

  /* ==========================================================
     ROUTER + CURTAIN
     ========================================================== */
  const curtain = $('#curtain');
  const curtainTitle = $('#curtainTitle');
  let busy = false;
  let homeScroll = 0;
  let afterRoute = null;

  const parse = () => {
    const m = location.hash.match(/^#\/work\/([^/?#]+)/);
    return m ? { name: 'project', slug: decodeURIComponent(m[1]) } : { name: 'home', slug: null };
  };
  const same = (a, b) => a.name === b.name && a.slug === b.slug;

  function apply(r, p) {
    if (r.name === 'project') {
      if (current.name === 'home') homeScroll = window.scrollY;
      mountProject(p);
      home.hidden = true; pv.hidden = false; pvOn = true;
      pvUpdate();
      window.Site && window.Site.setView('project');
      window.scrollTo(0, 0);
      if (window.Site) window.Site.markDirty();
    } else {
      pvOn = false;
      pv.hidden = true; pv.innerHTML = ''; pvImgs = [];
      home.hidden = false;
      document.title = SITE_TITLE;
      window.Site && window.Site.setView('home');
      window.Site && window.Site.remeasure();
      window.scrollTo(0, homeScroll);
      window.Site && window.Site.markDirty();
    }
    current = r;
  }
  const reveal = () => { const a = $('.pj', pv); if (a) a.classList.add('is-in'); };

  async function runCurtain(title, swap) {
    body.classList.add('is-transitioning');
    window.Site && window.Site.setMenu(false);
    curtain.style.transition = 'none';
    curtain.style.clipPath = 'inset(100% 0 0 0)';
    void curtain.offsetHeight;
    curtainTitle.textContent = title || '';
    curtain.style.transition = 'clip-path .75s cubic-bezier(.76,0,.24,1)';
    curtain.style.clipPath = 'inset(0 0 0 0)';
    await wait(500);
    curtain.classList.toggle('is-title', !!title);
    await wait(300);
    swap();
    await wait(title ? 520 : 160);
    curtain.classList.remove('is-title');
    curtain.style.clipPath = 'inset(0 0 100% 0)';
    setTimeout(reveal, 260);
    await wait(820);
    curtain.style.transition = 'none';
    curtain.style.clipPath = 'inset(100% 0 0 0)';
    body.classList.remove('is-transitioning');
  }

  async function route(initial) {
    const r = parse();
    const p = r.name === 'project' ? bySlug(r.slug) : null;
    if (r.name === 'project' && !p) { history.replaceState(null, '', location.pathname + location.search); return route(initial); }
    if (same(r, current) && !initial) return;

    if (initial) {
      apply(r, p);
      if (r.name === 'project') {
        if (body.classList.contains('is-ready')) setTimeout(reveal, 60);
        else document.addEventListener('site:ready', () => setTimeout(reveal, 250), { once: true });
      }
    } else if (reduce) {
      apply(r, p); reveal();
    } else {
      busy = true;
      await runCurtain(p ? p.title : 'All work', () => apply(r, p));
      busy = false;
    }
    if (afterRoute) { const f = afterRoute; afterRoute = null; f(); }
    if (!initial && !same(parse(), current)) route(false); // hash changed again mid-transition
  }

  window.addEventListener('hashchange', () => { if (!busy) route(false); });

  window.Work = {
    // go back to the home view, resolves when it is on screen
    home() {
      if (current.name === 'home') return Promise.resolve();
      return new Promise(res => { afterRoute = res; location.hash = '#/'; });
    },
    open(slug) { location.hash = `#/work/${slug}`; },
    projects: DATA
  };

  // esc closes nothing here; back button works through hashchange
  route(true);
})();
