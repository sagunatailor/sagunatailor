(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* floral wall: tidy rows of fern stalks with staggered flowers */
  const flora = $('#flora');
  if (flora) {
    const NS = 'http://www.w3.org/2000/svg';
    const mk = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent.appendChild(e); return e; };
    const leaf = ['#0E7C66', '#14284B', '#3FA95B', '#1D1633', '#0E7C66', '#2447B8'];
    const petal = ['#E8452C', '#E11D74', '#F4B400', '#2447B8'];
    const X0 = 1128, GAP = 96;
    for (let c = 0; c < 6; c++) {                       // fern stalks
      const x = X0 + c * GAP, top = 150 + (c % 2) * 44, g = mk('g', {}, flora);
      mk('path', { d: `M${x} 712V${top}`, stroke: '#1D1633', 'stroke-width': 3, fill: 'none' }, g);
      let i = 0;
      for (let y = 690; y > top + 20; y -= 30, i++) {
        const s = 0.55 + 0.45 * ((y - top) / (690 - top));
        [-1, 1].forEach(d => mk('path', { d: 'M0 0C9-14 9-36 0-52-9-36-9-14 0 0Z', transform: `translate(${x} ${y}) rotate(${d * 58}) scale(${s})`, fill: leaf[(c + i) % leaf.length], stroke: 'none' }, g));
      }
      mk('path', { d: 'M0 0C9-14 9-36 0-52-9-36-9-14 0 0Z', transform: `translate(${x} ${top + 14}) scale(.7)`, fill: leaf[c % leaf.length], stroke: 'none' }, g);
    }
    for (let c = 0; c < 6; c++) {                       // flowers between the stalks, staggered
      for (let r = 0; r < 4; r++) {
        const x = X0 + GAP / 2 + c * GAP, y = 215 + r * 140 + (c % 2) * 70;
        if (y > 660 || x > 1590) continue;
        const col = petal[(c + r * 2) % petal.length], s = 0.78, g = mk('g', { transform: `translate(${x} ${y}) scale(${s})`, stroke: 'none' }, flora);
        for (let k = 0; k < 6; k++) mk('ellipse', { cx: 0, cy: -22, rx: 11, ry: 20, fill: col, transform: `rotate(${k * 60})` }, g);
        mk('circle', { r: 11, fill: '#1D1633' }, g); mk('circle', { r: 5, fill: '#F4B400' }, g);
      }
    }
  }

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
      <p class="d-role">${esc(w.role)}</p><p class="d-dates">${esc(w.dates)}</p>
      ${w.url ? `<a class="btn btn-ink" href="${w.url}" target="_blank" rel="noopener">Visit site ↗</a>` : ''}
      ${w.key === 'asos' ? '<a class="btn" href="#asos" data-close>See what I built ↓</a>' : ''}
      <ul class="tags" aria-label="Technologies">${w.tags.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
      <nav class="d-nav" aria-label="Case files">
        <button type="button" data-go="${prev.key}" aria-label="Previous case file: ${esc(prev.name)}"><span aria-hidden="true">←</span><span class="d-nav-t"><small>Previous</small>${esc(prev.name)}</span></button>
        <button type="button" data-go="${next.key}" aria-label="Next case file: ${esc(next.name)}"><span class="d-nav-t"><small>Next</small>${esc(next.name)}</span><span aria-hidden="true">→</span></button>
      </nav>`;
    dBody.innerHTML = w.paras.map(p => `<p>${esc(p)}</p>`).join('') +
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

  $('#year').textContent = new Date().getFullYear();
})();
