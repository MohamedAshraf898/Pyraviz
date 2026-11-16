/* ==========================================================
   PyraViz – blog.js (vanilla)
   Reads window.POSTS (js/posts.js) and builds:
     · blog.html   the journal: featured post, category filters, grid
     · post.html   a single post (post.html?p=<slug>), with next / more posts
   Runs before main.js, so main.js picks up the [data-reveal] elements it creates.
   ========================================================== */
(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const POSTS = window.POSTS || [];
  const esc = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const url = p => `post.html?p=${encodeURIComponent(p.slug)}`;
  const fmt = d => new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  // responsive picture: a project's cover, assets/work/<slug>/cover-<width>.webp (made by scripts/build-projects.py)
  function img(slug, _widths, sizes, eager) {
    const srcset = [480, 800, 1200, 1800].map(w => `assets/work/${slug}/cover-${w}.webp ${w}w`).join(', ');
    return `<img src="assets/work/${slug}/cover-1200.webp" srcset="${srcset}" sizes="${sizes}" alt=""` +
      (eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async">';
  }

  function card(p, i, shown) {
    return `<li class="post${shown ? ' in' : ''}" data-reveal style="--d:${((i % 3) * .1 + .05).toFixed(2)}s">
      <a href="${url(p)}" class="post__link">
        <figure class="post__img">${img(p.img, p.w, '(max-width: 809px) 90vw, 30vw')}</figure>
        <p class="post__meta"><span>${esc(p.category)}</span><time datetime="${p.date}">${fmt(p.date)}</time></p>
        <h3 class="post__title">${esc(p.title)}</h3>
        <p class="post__excerpt">${esc(p.excerpt)}</p>
      </a>
    </li>`;
  }

  /* ---------- blog.html ---------- */
  const featBox = $('#blogFeatured');
  const grid = $('#blogGrid');
  const filters = $('#blogFilters');
  if (featBox && grid && POSTS.length) {
    const [feat, ...rest] = POSTS;
    featBox.innerHTML = `<a href="${url(feat)}" class="feat__link">
        <figure class="feat__img">${img(feat.img, feat.w, '(max-width: 809px) 100vw, 60vw', true)}</figure>
        <div class="feat__text">
          <p class="post__meta"><span>Latest &middot; ${esc(feat.category)}</span><time datetime="${feat.date}">${fmt(feat.date)}</time></p>
          <h2 class="feat__title">${esc(feat.title)}</h2>
          <p class="feat__excerpt">${esc(feat.excerpt)}</p>
          <span class="feat__more">Read the story &rarr; <i>${feat.read} min read</i></span>
        </div>
      </a>`;

    const cats = ['All', ...new Set(POSTS.map(p => p.category))];
    let current = 'All', first = true;
    function render() {
      // "All" leaves the featured post on top; a category lists every post in it
      const list = current === 'All' ? rest : POSTS.filter(p => p.category === current);
      featBox.hidden = current !== 'All';
      grid.innerHTML = list.length ? list.map((p, i) => card(p, i, !first)).join('')
        : '<li class="blog__empty">No posts here yet.</li>';
      const count = $('#blogCount');
      if (count) count.textContent = `(${String(current === 'All' ? POSTS.length : list.length).padStart(2, '0')})`;
      first = false;
    }
    if (filters) {
      filters.innerHTML = cats.map(c => `<button type="button" class="fbtn" role="tab" aria-selected="${c === current}">${esc(c)}</button>`).join('');
      filters.addEventListener('click', e => {
        const b = e.target.closest('.fbtn');
        if (!b || b.textContent === current) return;
        current = b.textContent;
        filters.querySelectorAll('.fbtn').forEach(x => x.setAttribute('aria-selected', String(x === b)));
        render();
      });
    }
    render();
  }

  /* ---------- post.html ---------- */
  const view = $('#postView');
  if (view) {
    const slug = new URLSearchParams(location.search).get('p');
    const i = POSTS.findIndex(p => p.slug === slug);
    if (i < 0) {
      document.title = 'Post not found | PyraViz';
      view.innerHTML = `<div class="art__head"><a class="art__back" href="blog.html">&larr; Journal</a>
        <h1 class="art__title">This post doesn&rsquo;t exist.</h1>
        <p class="art__lead">It may have moved. Head back to the <a href="blog.html">journal</a> to see every post.</p></div>`;
      return;
    }
    const p = POSTS[i];
    const next = POSTS[(i + 1) % POSTS.length];
    const more = POSTS.filter(x => x !== p).slice(0, 3);
    document.title = `${p.title} | PyraViz Journal`;
    const md = $('meta[name="description"]');
    if (md) md.setAttribute('content', p.excerpt);

    const block = b => {
      if (b.h) return `<h2>${esc(b.h)}</h2>`;
      if (b.q) return `<blockquote><p>&ldquo;${esc(b.q)}&rdquo;</p>${b.by ? `<cite>${esc(b.by)}</cite>` : ''}</blockquote>`;
      if (b.img) return `<figure class="art__fig">${img(b.img, b.w, '(max-width: 809px) 100vw, 70vw')}${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ''}</figure>`;
      return `<p>${esc(b.p)}</p>`;
    };

    view.innerHTML = `
      <header class="art__head">
        <a class="art__back" href="blog.html">&larr; Journal</a>
        <p class="art__meta"><span>${esc(p.category)}</span><time datetime="${p.date}">${fmt(p.date)}</time><span>${p.read} min read</span></p>
        <h1 class="art__title">${esc(p.title)}</h1>
        <p class="art__lead">${esc(p.excerpt)}</p>
      </header>
      <figure class="art__hero">${img(p.img, p.w, '100vw', true)}</figure>
      <div class="art__body">${p.body.map(block).join('')}
        <p class="art__by">Written by ${esc(p.author)}</p>
      </div>
      <a class="art__next theme-dark" href="${url(next)}">
        <span class="art__next-k">Next story</span>
        <span class="art__next-t">${esc(next.title)}</span>
        <span class="art__next-a" aria-hidden="true">&rarr;</span>
      </a>
      <section class="blog theme-light blog--more" aria-label="More from the journal">
        <div class="blog__head">
          <h2 class="blog__label" data-reveal>More from the journal</h2>
          <a href="blog.html" class="blog__all" data-reveal>View all posts &rarr;</a>
        </div>
        <ul class="blog__grid">${more.map((x, k) => card(x, k, false)).join('')}</ul>
      </section>`;
  }
})();
