/* Філіжанка: motion layer (GSAP + ScrollTrigger + Lenis). Without them the page simply shows everything. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const loader = $('.loader');

  /* ---------- hours: today + open now (Kyiv time) ---------- */
  const p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Kyiv', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
  const part = t => p.find(x => x.type === t).value;
  const day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(part('weekday')) + 1;
  const min = (+part('hour') % 24) * 60 + +part('minute');
  $$('[data-days]').forEach(r => {
    const [a, b = a] = r.dataset.days.split('-').map(Number);
    if (day >= a && day <= b) r.classList.add('is-today');
  });
  const opens = day >= 6 ? 540 : 480, closes = 1260;
  const on = $('.open-now');
  if (on) {
    on.hidden = false;
    const tomorrowWeekend = day === 5 || day === 6;
    on.lastElementChild.textContent = min >= opens && min < closes ? 'Зараз відчинено · до 21:00'
      : min < opens ? `Сьогодні відчиняємось о ${day >= 6 ? '9:00' : '8:00'}`
      : `Завтра відчиняємось о ${tomorrowWeekend ? '9:00' : '8:00'}`;
  }

  /* ---------- mobile menu ---------- */
  const burger = $('.nav__burger');
  const setMenu = open => {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Закрити меню' : 'Відкрити меню');
  };
  burger.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- gallery strip: scroll panel, arrows, drag (works with or without GSAP) ---------- */
  const scroller = $('.gallery__scroller'), bar = $('.scrollbar'), thumb = bar && $('i', bar);
  if (scroller && bar) {
    const max = () => scroller.scrollWidth - scroller.clientWidth;
    const sync = () => {
      const ratio = scroller.clientWidth / scroller.scrollWidth;
      const w = Math.max(ratio * bar.clientWidth, 48);
      const prog = max() > 0 ? scroller.scrollLeft / max() : 0;
      thumb.style.width = w + 'px';
      thumb.style.transform = `translateX(${prog * (bar.clientWidth - w)}px)`;
      bar.setAttribute('aria-valuenow', Math.round(prog * 100));
      $$('.arrow').forEach(a => { a.disabled = a.dataset.dir < 0 ? scroller.scrollLeft < 4 : scroller.scrollLeft > max() - 4; });
    };
    scroller.addEventListener('scroll', sync, { passive: true });
    addEventListener('resize', sync);
    addEventListener('load', sync);
    sync();
    // sideways trackpad swipes stay in the strip; ordinary wheel scrolls the page down
    scroller.addEventListener('wheel', e => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) e.stopPropagation(); }, { capture: true, passive: true });
    $$('.arrow').forEach(a => a.addEventListener('click', () => scroller.scrollBy({ left: a.dataset.dir * scroller.clientWidth * .7, behavior: 'smooth' })));
    scroller.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); scroller.scrollBy({ left: (e.key === 'ArrowRight' ? 1 : -1) * 400, behavior: 'smooth' }); }
    });
    // the panel: drag the thumb or click anywhere on it
    const fromBar = x => {
      const r = bar.getBoundingClientRect(), w = thumb.offsetWidth;
      scroller.scrollLeft = Math.min(1, Math.max(0, (x - r.left - w / 2) / (r.width - w))) * max();
    };
    bar.addEventListener('pointerdown', e => {
      bar.classList.add('is-drag'); bar.setPointerCapture(e.pointerId); fromBar(e.clientX);
      const move = ev => fromBar(ev.clientX);
      const up = () => { bar.classList.remove('is-drag'); bar.removeEventListener('pointermove', move); };
      bar.addEventListener('pointermove', move);
      bar.addEventListener('pointerup', up, { once: true });
      bar.addEventListener('pointercancel', up, { once: true });
    });
    // drag the photos with the mouse
    if (fine) {
      let down = false, sx = 0, sl = 0, moved = false;
      scroller.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = scroller.scrollLeft; });
      addEventListener('pointermove', e => {
        if (!down) return;
        const dx = e.clientX - sx;
        if (Math.abs(dx) > 4) { moved = true; scroller.classList.add('is-drag'); }
        scroller.scrollLeft = sl - dx;
      });
      addEventListener('pointerup', () => { down = false; scroller.classList.remove('is-drag'); });
      scroller.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
    }
  }

  /* ---------- menu on phones and tablets: tap a row to unfold its photo ---------- */
  const pointerFine = matchMedia('(hover: hover) and (pointer: fine)');
  const tapMode = () => !pointerFine.matches || innerWidth < 1024;
  const pvSrc = $$('.menu__preview img').map(i => i.getAttribute('src'));
  $$('.menu .item').forEach(it => {
    const name = it.querySelector('span').firstChild.textContent.trim();
    const more = document.createElement('i');
    more.className = 'item__more';
    more.setAttribute('aria-hidden', 'true');
    const box = document.createElement('div');
    box.className = 'item__photo';
    box.innerHTML = `<div><img alt="${name}" loading="lazy" decoding="async"></div>`;
    it.append(more, box);
    const toggle = () => {
      if (!tapMode()) return;
      const open = !it.classList.contains('is-open');
      $$('.menu .item.is-open').forEach(o => { if (o !== it) { o.classList.remove('is-open'); o.setAttribute('aria-expanded', 'false'); } });
      if (open) { const im = box.querySelector('img'); if (!im.getAttribute('src')) im.src = pvSrc[+it.dataset.img] || ''; }
      it.classList.toggle('is-open', open);
      it.setAttribute('aria-expanded', open);
      setTimeout(() => window.ScrollTrigger && ScrollTrigger.refresh(), 560);
    };
    const setRole = () => {
      if (tapMode()) { it.setAttribute('role', 'button'); it.tabIndex = 0; it.setAttribute('aria-expanded', it.classList.contains('is-open')); }
      else { it.removeAttribute('role'); it.removeAttribute('tabindex'); it.removeAttribute('aria-expanded'); it.classList.remove('is-open'); }
    };
    setRole();
    addEventListener('resize', setRole);
    it.addEventListener('click', toggle);
    it.addEventListener('keydown', e => { if (tapMode() && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); toggle(); } });
  });

  /* ---------- map: asleep until clicked, asleep again once scrolled away ---------- */
  const map = $('.map');
  if (map) {
    $('.map__unlock', map).addEventListener('click', () => map.classList.add('is-live'));
    if ('IntersectionObserver' in window) new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) map.classList.remove('is-live'); }), { threshold: 0 }).observe(map);
  }

  if (!window.gsap || !window.ScrollTrigger) {
    loader && loader.remove();
    document.body.classList.remove('is-loading');
    $$('[data-link]').forEach(a => a.addEventListener('click', () => setMenu(false)));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  const E = 'expo.out', E2 = 'power4.inOut';

  /* ---------- smooth scroll ---------- */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }
  const jumpTo = href => {
    const el = href === '#top' ? null : $(href);
    const y = el ? Math.round(el.getBoundingClientRect().top + scrollY) : 0;
    if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
    else window.scrollTo(0, y);
  };

  /* ---------- split headings into words ---------- */
  $$('[data-split]').forEach(h => {
    const parts = h.innerHTML.trim().match(/<em>.*?<\/em>|[^\s<]+/g) || [];
    h.innerHTML = parts.map(w => `<span class="split-line"><span>${w}</span></span>`).join(' ');
  });

  /* ---------- neon helpers ---------- */
  const strokes = svg => $$('path, rect', svg);
  const prepDraw = svg => strokes(svg).forEach(s => {
    const l = s.getTotalLength();
    gsap.set(s, { strokeDasharray: l, strokeDashoffset: l });
  });
  const flick = (el, tl, at) => tl.to(el, { keyframes: { opacity: [1, .2, 1, .45, 1, .1, 1] }, duration: .7, ease: 'none' }, at);

  /* ---------- initial states ---------- */
  gsap.set('[data-hero-line]', { yPercent: 120 });
  gsap.set('[data-hero]', { y: 40, autoAlpha: 0 });
  gsap.set('[data-hero-tile]', { clipPath: 'inset(100% 0% 0% 0%)' });
  gsap.set('[data-hero-tile] img', { scale: 1.3 });
  gsap.set('[data-hero-card]', { y: 30, autoAlpha: 0 });
  gsap.set('.nav', { yPercent: -100 });
  const curtain = $('.curtain');
  gsap.set(curtain, { y: 0, yPercent: 100, autoAlpha: 1 });

  const heroIn = () => gsap.timeline({ defaults: { ease: E } })
    .to('.nav', { yPercent: 0, duration: 1.2 }, 0)
    .to('[data-hero-tile]', { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: E2, stagger: .12 }, 0)
    .to('[data-hero-tile] img', { scale: 1, duration: 2.2, stagger: .12 }, 0)
    .to('[data-hero-line]', { yPercent: 0, duration: 1.4, stagger: .12 }, .25)
    .to('[data-hero]', { y: 0, autoAlpha: 1, duration: 1.2, stagger: .08 }, .5)
    .to('[data-hero-card]', { y: 0, autoAlpha: 1, duration: 1.1 }, 1.1)
    .add(() => gsap.set('.nav', { clearProps: 'transform' }));

  /* ---------- loader: the neon sign switches on ---------- */
  const start = () => {
    document.body.classList.remove('is-loading');
    lenis && lenis.start();
    heroIn();
    ScrollTrigger.refresh();
  };
  if (loader && !reduce) {
    const svg = $('.neon', loader), glow = $('.glow', loader), count = $('.loader__count', loader), n = { v: 0 };
    prepDraw(svg);
    const tl = gsap.timeline({ onComplete: () => loader.remove() });
    tl.to(strokes(svg), { strokeDashoffset: 0, duration: 1.3, stagger: .18, ease: 'power2.inOut' }, .2)
      .to(n, { v: 100, duration: 2.2, ease: 'power2.inOut', onUpdate: () => { count.textContent = Math.round(n.v); } }, 0);
    flick(glow, tl, 1.6);
    tl.to('.loader__word span', { y: 0, duration: 1, stagger: .05, ease: E }, 1.4)
      .to('.loader__inner', { scale: .94, autoAlpha: 0, duration: .6, ease: 'power3.in' }, 2.9)
      .to(loader, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1, ease: E2 }, 3.25)
      .add(start, 3.45);
    // safety net: a tab opened in the background must never stay behind the intro
    setTimeout(() => { if (tl.progress() < 1) tl.progress(1); }, 6000);
  } else {
    loader && loader.remove();
    start();
  }

  /* ---------- scroll reveals (once each) ---------- */
  $$('[data-split]').forEach(h => gsap.from($$('.split-line > span', h), { yPercent: 120, duration: 1.3, stagger: .08, ease: E,
    scrollTrigger: { trigger: h, start: 'top 88%', once: true } }));
  $$('[data-fade]').forEach(el => gsap.from(el, { y: 40, autoAlpha: 0, duration: 1.2, ease: E, scrollTrigger: { trigger: el, start: 'top 92%', once: true } }));
  $$('[data-reveal]').forEach(box => {
    const img = $('img', box);
    gsap.timeline({ scrollTrigger: { trigger: box, start: 'top 85%', once: true } })
      .from(box, { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.4, ease: E2 })
      .from(img, { scale: 1.3, duration: 2, ease: E }, 0);
  });
  gsap.from('.story', { y: 30, autoAlpha: 0, duration: 1, stagger: .07, ease: E, scrollTrigger: { trigger: '.stories', start: 'top 90%', once: true } });
  gsap.from('.g-item, .g-quote', { y: 60, autoAlpha: 0, duration: 1.2, stagger: .06, ease: E, scrollTrigger: { trigger: '.gallery__scroller', start: 'top 85%', once: true } });
  $$('.item').forEach(r => gsap.from(r, { y: 20, autoAlpha: 0, duration: .9, ease: E, scrollTrigger: { trigger: r, start: 'top 95%', once: true } }));

  // footer neon sign draws itself, then hums softly
  const fs = $('.footer__sign .neon');
  if (fs) {
    prepDraw(fs);
    const tl = gsap.timeline({ scrollTrigger: { trigger: fs, start: 'top 90%', once: true } });
    tl.to(strokes(fs), { strokeDashoffset: 0, duration: 1.5, stagger: .2, ease: 'power2.inOut' });
    flick($('.footer__sign .glow'), tl, '-=.2');
  }

  /* ---------- nav: hide on scroll down, active link ---------- */
  const nav = $('.nav'), mbar = $('.mbar');
  let lastY = 0;
  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: s => {
    const y = s.scroll();
    nav.classList.toggle('is-scrolled', y > 40);
    if (!document.body.classList.contains('menu-open')) nav.classList.toggle('is-hidden', y > lastY + 2 && y > 300);
    else nav.classList.remove('is-hidden');
    if (y < lastY - 2) nav.classList.remove('is-hidden');
    mbar && mbar.classList.toggle('on', y > innerHeight * .7);
    lastY = y;
  } });
  $$('.nav__links a').forEach(a => {
    const sec = $(a.getAttribute('href'));
    sec && ScrollTrigger.create({ trigger: sec, start: 'top 50%', end: 'bottom 50%', onToggle: s => a.classList.toggle('active', s.isActive) });
  });

  /* ---------- page transition: curtain with the neon cup ---------- */
  const cGlow = $('.glow', curtain);
  let busy = false;
  $$('[data-link]').forEach(a => a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href.startsWith('#')) return;
    e.preventDefault();
    const wasMenu = document.body.classList.contains('menu-open');
    if (reduce) { setMenu(false); jumpTo(href); return; }
    if (busy) return;
    busy = true;
    hidePreview();
    lenis && lenis.stop();
    gsap.timeline({ onComplete: () => { busy = false; } })
      .set(curtain, { y: 0, yPercent: 100 })
      .set(cGlow, { autoAlpha: 0, scale: .85 })
      .to(curtain, { yPercent: 0, duration: .7, ease: E2 })
      .to(cGlow, { autoAlpha: 1, scale: 1, duration: .35, ease: 'power2.out' }, '-=.2')
      .add(() => { if (wasMenu) setMenu(false); lenis && lenis.start(); jumpTo(href); nav.classList.remove('is-hidden'); ScrollTrigger.update(); })
      .to(cGlow, { keyframes: { opacity: [1, .3, 1, .6, 1] }, duration: .35, ease: 'none' })
      .to(curtain, { yPercent: -100, duration: .8, ease: E2 })
      .to(cGlow, { autoAlpha: 0, duration: .3 }, '<');
  }));

  /* ---------- menu photo preview (hidden the moment the pointer is not on a row) ---------- */
  const pv = $('.menu__preview'), pimgs = pv ? $$('img', pv) : [];
  let pvOn = false, mx = 0, my = 0;
  function hidePreview() { if (!pvOn) return; pvOn = false; gsap.to(pv, { autoAlpha: 0, scale: .6, duration: .35, ease: 'power3.out', overwrite: true }); }
  if (fine && !reduce && pv) {
    const px = gsap.quickTo(pv, 'x', { duration: .6, ease: 'power3' }), py = gsap.quickTo(pv, 'y', { duration: .6, ease: 'power3' });
    $$('.menu .item').forEach(it => {
      it.addEventListener('mouseenter', e => {
        pimgs.forEach((im, i) => im.classList.toggle('on', i === +it.dataset.img));
        if (!pvOn) { gsap.set(pv, { x: e.clientX + 140, y: e.clientY }); }
        pvOn = true;
        gsap.to(pv, { autoAlpha: 1, scale: 1, rotate: gsap.utils.random(-5, 5), duration: .5, ease: E, overwrite: true });
      });
      it.addEventListener('mousemove', e => { px(e.clientX + 140); py(e.clientY); });
      it.addEventListener('mouseleave', hidePreview);
    });
    addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    // scrolling moves the rows from under a still pointer: check what is under it now
    const check = () => { if (pvOn) { const el = document.elementFromPoint(mx, my); if (!el || !el.closest('.menu .item')) hidePreview(); } };
    if (lenis) lenis.on('scroll', check); else addEventListener('scroll', check, { passive: true });
    addEventListener('blur', hidePreview);
    document.addEventListener('mouseleave', hidePreview);
  }

  /* ---------- cursor and magnetic buttons ---------- */
  if (fine && !reduce) {
    const cur = $('.cursor');
    const cx = gsap.quickTo(cur, 'x', { duration: .4, ease: 'power3' }), cy = gsap.quickTo(cur, 'y', { duration: .4, ease: 'power3' });
    addEventListener('mousemove', e => { cur.classList.add('on'); cx(e.clientX); cy(e.clientY); });
    document.addEventListener('mouseleave', () => cur.classList.remove('on'));
    $$('a, button, .item, .tags span, .stat, .scrollbar').forEach(el => {
      el.addEventListener('mouseenter', () => cur.classList.add('is-link'));
      el.addEventListener('mouseleave', () => cur.classList.remove('is-link'));
    });
    $$('[data-view]').forEach(el => {
      el.addEventListener('mouseenter', () => cur.classList.add('is-view'));
      el.addEventListener('mouseleave', () => cur.classList.remove('is-view'));
    });
    $$('.btn, .arrow').forEach(b => {
      const xTo = gsap.quickTo(b, 'x', { duration: .6, ease: 'elastic.out(1, .4)' }), yTo = gsap.quickTo(b, 'y', { duration: .6, ease: 'elastic.out(1, .4)' });
      b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * .2); yTo((e.clientY - r.top - r.height / 2) * .3); });
      b.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
    });
  }

  addEventListener('load', () => ScrollTrigger.refresh());
})();
