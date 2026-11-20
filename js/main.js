(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* reveal on scroll */
  const rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && !calm) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
    rv.forEach(el => io.observe(el));
  } else rv.forEach(el => el.classList.add('in'));

  /* counters */
  document.querySelectorAll('[data-count]').forEach(el => {
    if (calm) return;
    el.textContent = '0';
    const to = +el.dataset.count, suf = el.dataset.suffix || '';
    new IntersectionObserver((es, o) => es.forEach(e => {
      if (!e.isIntersecting) return; o.disconnect();
      const t0 = performance.now(), tick = t => { const p = Math.min((t - t0) / 1100, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + (p === 1 ? suf : ''); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }), { threshold: .6 }).observe(el);
  });

  /* record crate */
  const crate = $('#crate'), drawer = $('#drawer'), dBrief = $('#dBrief'), dBody = $('#dBody');
  let opener = null;
  (window.WORK || []).forEach((w, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<button class="sleeve rv" type="button" style="--c:${w.accent};--d:${i * 50}ms" data-key="${w.key}" aria-haspopup="dialog">
      <span class="sleeve-no">${w.no}</span>
      <span class="sleeve-logo"><img src="${w.logo}" alt="" loading="lazy" /></span>
      <span class="sleeve-name">${esc(w.name)}</span>
      <span class="sleeve-meta">${esc(w.dates)}</span></button>`;
    crate.appendChild(li);
  });
  crate.querySelectorAll('.rv').forEach(el => calm ? el.classList.add('in') : (new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); o.disconnect(); } }), { threshold: .1 }).observe(el)));

  function openWork(key, from) {
    const all = window.WORK, ix = all.findIndex(x => x.key === key), w = all[ix]; if (!w) return;
    const prev = all[(ix - 1 + all.length) % all.length], next = all[(ix + 1) % all.length];
    if (from) opener = from;
    drawer.style.setProperty('--c', w.accent);
    dBrief.innerHTML = `<p class="label">Case file ${w.no}</p><h2 id="dTitle" tabindex="-1">${esc(w.name)}</h2>
      <p class="d-role">${esc(w.role)}</p><p class="d-dates">${esc(w.dates)}</p>${w.about ? `<p class="d-about">${w.about}</p>` : ''}
      ${w.url ? `<a class="btn btn-ink" href="${w.url}" target="_blank" rel="noopener">Visit site ↗</a>` : ''}
      ${w.key === 'asos' ? '<a class="btn" href="#asos" data-close>See what I built ↓</a>' : ''}
      <ul class="tags" aria-label="Technologies">${w.tags.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
      <nav class="d-nav" aria-label="Case files">
        <button type="button" data-go="${prev.key}" aria-label="Previous case file: ${esc(prev.name)}"><span aria-hidden="true">←</span><span class="d-nav-t"><small>Previous</small>${esc(prev.name)}</span></button>
        <button type="button" data-go="${next.key}" aria-label="Next case file: ${esc(next.name)}"><span class="d-nav-t"><small>Next</small>${esc(next.name)}</span><span aria-hidden="true">→</span></button>
      </nav>`;
    dBody.innerHTML = w.paras.map(p => `<p>${p}</p>`).join('') + (w.note && w.imgs.length ? `<p class="d-note">${esc(w.note)}</p>` : '') +
      (w.imgs.length ? `<div class="d-gallery">${w.imgs.map(([s, a]) => `<button type="button" class="g" data-zoom="${s}" data-alt="${esc(a)}"><img src="${s}" alt="${esc(a)}" loading="lazy" /></button>`).join('')}</div>` : '');
    dBody.scrollTop = 0; dBrief.scrollTop = 0; drawer.querySelector('.d-grid').scrollTop = 0;
    if (!drawer.open) drawer.showModal(); else $('#dTitle').focus({ preventScroll: true });
  }
  const closeDrawer = () => { drawer.close(); opener && opener.focus(); };
  crate.addEventListener('click', e => { const b = e.target.closest('.sleeve'); if (b) openWork(b.dataset.key, b); });
  dBrief.addEventListener('click', e => { const b = e.target.closest('[data-go]'); if (b) openWork(b.dataset.go); });
  $('#dClose').addEventListener('click', closeDrawer);
  drawer.addEventListener('click', e => { if (e.target === drawer || e.target.closest('[data-close]')) drawer.close(); });

  /* lightbox — single image, or a gallery when the trigger has data-gallery */
  const lb = $('#lightbox'), lbImg = $('#lbImg'), lbBar = $('#lbBar'), lbCap = $('#lbCap');
  let items = [], idx = 0;
  const show = i => {
    idx = (i + items.length) % items.length; const [src, alt, cap] = items[idx];
    lbImg.src = src; lbImg.alt = alt || '';
    if (items.length > 1) lbCap.textContent = (idx + 1) + ' / ' + items.length + ' — ' + (cap || '');
  };
  document.addEventListener('click', e => {
    const z = e.target.closest('[data-zoom]'); if (!z) return;
    let list = null; try { list = z.dataset.gallery && JSON.parse(z.dataset.gallery); } catch (err) {}
    let start = 0;
    const strip = z.closest('.d-gallery');            // inside a case file: browse all its images
    if (strip) {
      const btns = [...strip.querySelectorAll('[data-zoom]')];
      items = btns.map(b => [b.dataset.zoom, b.dataset.alt || '', b.dataset.alt || '']); start = btns.indexOf(z);
    } else items = list && list.length ? list : [[z.dataset.zoom, z.dataset.alt || '', '']];
    lbBar.hidden = items.length < 2; show(start); lb.showModal();
  });
  $('#lbPrev').addEventListener('click', () => show(idx - 1));
  $('#lbNext').addEventListener('click', () => show(idx + 1));
  lb.addEventListener('keydown', e => { if (items.length > 1 && e.key === 'ArrowLeft') show(idx - 1); if (items.length > 1 && e.key === 'ArrowRight') show(idx + 1); });
  $('#lbClose').addEventListener('click', () => lb.close());
  lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });

  /* mobile menu */
  const bar = $('.bar'), mb = $('#menuBtn');
  const setMenu = v => { bar.classList.toggle('open', v); mb.setAttribute('aria-expanded', String(v)); };
  mb.addEventListener('click', () => setMenu(!bar.classList.contains('open')));
  $('#nav').addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && bar.classList.contains('open')) { setMenu(false); mb.focus(); } });
  matchMedia('(min-width:861px)').addEventListener('change', e => e.matches && setMenu(false));

  /* pause animations (WCAG 2.2.2) — also on by default for reduced-motion users */
  const mo = $('#motion'); let still = calm;
  try { const v = localStorage.getItem('st-still'); if (v !== null) still = v === '1'; } catch (e) {}
  const applyStill = () => { document.documentElement.classList.toggle('still', still); mo.setAttribute('aria-pressed', String(still)); mo.setAttribute('aria-label', still ? 'Play animations' : 'Pause animations'); mo.firstElementChild.textContent = still ? '▶' : '❚❚'; };
  mo.addEventListener('click', () => { still = !still; applyStill(); try { localStorage.setItem('st-still', still ? '1' : '0'); } catch (e) {} });
  applyStill();

  /* gentle mouse parallax on the office scene (off when animations are paused) */
  const hero = $('.hero'), scene = $('.scene');
  if (hero && scene && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    hero.addEventListener('pointermove', e => {
      if (document.documentElement.classList.contains('still')) return;
      const r = scene.getBoundingClientRect();
      scene.style.setProperty('--px', ((e.clientX - r.left) / r.width - .5).toFixed(3));
      scene.style.setProperty('--py', ((e.clientY - r.top) / r.height - .5).toFixed(3));
    });
    hero.addEventListener('pointerleave', () => { scene.style.setProperty('--px', 0); scene.style.setProperty('--py', 0); });
  }

  /* recommendations: show the rest on request */
  const wt = $('#wordsToggle'), wm = $('#moreWords');
  if (wt && wm) wt.addEventListener('click', () => {
    const open = wm.hidden; wm.hidden = !open; wt.setAttribute('aria-expanded', String(open));
    wt.textContent = open ? 'Show fewer recommendations' : wt.dataset.more;
    if (open) { wm.querySelectorAll('.rv').forEach(el => el.classList.add('in')); wm.querySelector('blockquote').setAttribute('tabindex', '-1'); wm.querySelector('blockquote').focus({ preventScroll: true }); }
  });

  $('#year').textContent = new Date().getFullYear();
})();

/* recommendations: fill the left rail, mark the current quote, and fade the text in line by line */
(() => {
  const lists = [...document.querySelectorAll('.words')];
  if (!lists.length) return;
  lists.forEach(l => l.classList.add('lit'));

  // wrap every word so each line of text can be faded on its own
  document.querySelectorAll('.words p').forEach(p => {
    const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT), nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n => {
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.append(' '); return; }
        const w = document.createElement('span'); w.className = 'w'; w.textContent = part; frag.append(w);
      });
      n.replaceWith(frag);
    });
  });

  // group the words into lines (words sharing the same top edge)
  let lines = [];
  const measure = () => {
    lines = [];
    lists.forEach(list => {
      if (list.hidden) return;
      list.querySelectorAll('blockquote').forEach(q => {
        const qTop = q.getBoundingClientRect().top;
        let cur = null;
        q.querySelectorAll('p .w').forEach(w => {
          const off = Math.round(w.getBoundingClientRect().top - qTop);
          if (!cur || Math.abs(off - cur.off) > 4) { cur = { q, off, words: [], o: -1 }; lines.push(cur); }
          cur.words.push(w);
        });
      });
    });
  };

  let queued = false;
  const update = () => {
    queued = false;
    const vh = innerHeight, focus = vh * 0.5;
    const start = vh * 0.82, band = vh * 0.34;      // a line starts brightening at 82% down the screen, is full by ~48%
    let best = null, bestGap = Infinity;
    const tops = new Map();
    lists.forEach(list => {
      if (list.hidden) return;
      const r = list.getBoundingClientRect();
      list.style.setProperty('--fill', Math.min(1, Math.max(0, (focus - r.top) / r.height)).toFixed(4));
      list.querySelectorAll('blockquote').forEach(q => {
        const b = q.getBoundingClientRect();
        tops.set(q, b.top);
        q.classList.toggle('past', b.top < focus);
        const gap = focus < b.top ? b.top - focus : focus > b.bottom ? focus - b.bottom : 0;
        if (gap < bestGap) { bestGap = gap; best = q; }
      });
    });
    lines.forEach(l => {
      const y = tops.get(l.q) + l.off;
      const o = Math.round((0.22 + 0.78 * Math.min(1, Math.max(0, (start - y) / band))) * 50) / 50;
      if (o !== l.o) { l.o = o; l.words.forEach(w => { w.style.opacity = o; }); }
    });
    document.querySelectorAll('.words blockquote.active').forEach(q => q !== best && q.classList.remove('active'));
    if (best) best.classList.add('active');
  };
  const ask = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
  const remeasure = () => { measure(); update(); };
  addEventListener('scroll', ask, { passive: true });
  addEventListener('resize', remeasure);
  addEventListener('load', remeasure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(remeasure);
  const toggle = document.getElementById('wordsToggle');
  if (toggle) toggle.addEventListener('click', () => setTimeout(remeasure, 0));
  remeasure();
})();

/* hero: type the tagline out, one character at a time */
(() => {
  const p = document.getElementById('heroSub');
  if (!p) return;
  const text = p.textContent.replace(/\s+/g, ' ').trim();
  const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('still');
  if (still()) return;
  // screen readers get the whole sentence; the typed copy is decorative
  p.textContent = '';
  const full = document.createElement('span'); full.className = 'vh'; full.textContent = text;
  const vis = document.createElement('span'); vis.setAttribute('aria-hidden', 'true');
  const done = document.createElement('span'), cursor = document.createElement('span'), rest = document.createElement('span');
  cursor.className = 'type-cursor'; rest.className = 'type-rest'; rest.textContent = text;
  vis.append(done, cursor, rest); p.append(full, vis);
  let i = 0;
  const step = () => {
    if (still()) i = text.length;
    else i++;
    done.textContent = text.slice(0, i); rest.textContent = text.slice(i);
    if (i < text.length) setTimeout(step, /[,—.]/.test(text[i - 1]) ? 260 : 28 + Math.random() * 45);
  };
  setTimeout(step, 900);
})();
