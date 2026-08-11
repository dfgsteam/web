import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;
let ctx: gsap.Context | null = null;

function onRaf(time: number) {
  lenis?.raf(time * 1000);
}

function createLenis() {
  if (reduceMotion) return;
  lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.6,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(onRaf);
  gsap.ticker.lagSmoothing(0);
}

function destroyLenis() {
  if (lenis) {
    gsap.ticker.remove(onRaf);
    lenis.destroy();
    lenis = null;
  }
}

function setupCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  const dot = document.querySelector('.cursor-dot') as HTMLElement | null;
  const ring = document.querySelector('.cursor-ring') as HTMLElement | null;
  if (!dot || !ring) return;

  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const ringPos = { ...pos };
  let ringActive = false;

  const onMove = (e: MouseEvent) => {
    pos.x = e.clientX;
    pos.y = e.clientY;
  };

  window.addEventListener('mousemove', onMove, { passive: true });

  gsap.ticker.add(() => {
    dot.style.transform = `translate(${pos.x - 4}px, ${pos.y - 4}px)`;
    ringPos.x = gsap.utils.interpolate(ringPos.x, pos.x, 0.18);
    ringPos.y = gsap.utils.interpolate(ringPos.y, pos.y, 0.18);
    ring.style.transform = `translate(${ringPos.x - 18}px, ${ringPos.y - 18}px)`;
  });

  const setActive = (active: boolean) => {
    ring.classList.toggle('is-active', active);
    void ringActive;
  };

  const interactive = 'a, button, [role="button"], [data-magnetic]';
  document.addEventListener(
    'mouseover',
    (e) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactive)) setActive(true);
    },
    { passive: true },
  );
  document.addEventListener(
    'mouseout',
    (e) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactive)) setActive(false);
    },
    { passive: true },
  );
}

function setupMagnetic() {
  if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return;
  const items = gsap.utils.toArray<HTMLElement>('[data-magnetic]');
  items.forEach((item) => {
    const strength = Number(item.dataset.magneticStrength ?? 30);
    const xTo = gsap.quickTo(item, 'x', { duration: 0.9, ease: 'elastic.out(1, 0.45)' });
    const yTo = gsap.quickTo(item, 'y', { duration: 0.9, ease: 'elastic.out(1, 0.45)' });

    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      xTo(relX * (strength / 100));
      yTo(relY * (strength / 100));
    });

    item.addEventListener('mouseleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}

function setupReveal() {
  if (reduceMotion) {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.setAttribute('data-reveal', 'done'));
    return;
  }

  const els = gsap.utils.toArray<HTMLElement>('[data-reveal]');

  els.forEach((el) => {
    if (el.closest('[data-horizontal]')) return;
    const dir = el.dataset.reveal || 'up';
    const delay = Number(el.dataset.revealDelay ?? 0);
    const from = {
      opacity: 0,
      y: dir === 'up' ? 28 : dir === 'down' ? -28 : 0,
      x: dir === 'left' ? 32 : dir === 'right' ? -32 : 0,
      scale: el.dataset.revealScale ? Number(el.dataset.revealScale) : 1,
    };

    gsap.fromTo(el, from, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration: 1,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      onComplete: () => el.setAttribute('data-reveal', 'done'),
    });
  });
}

function setupSkillBars() {
  const bars = gsap.utils.toArray<HTMLElement>('[data-skill-bar]');
  bars.forEach((bar) => {
    const level = Number(bar.dataset.level ?? 0) / 100;
    if (reduceMotion) {
      bar.style.transform = `scaleX(${level})`;
      return;
    }
    gsap.to(bar, {
      scaleX: level,
      duration: 1.4,
      ease: 'power2.out',
      scrollTrigger: { trigger: bar, start: 'top 88%', once: true },
    });
  });
}

function setupCounters() {
  if (reduceMotion) {
    document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
      el.textContent = el.dataset.countValue ?? '0';
    });
    return;
  }
  const counters = gsap.utils.toArray<HTMLElement>('[data-count]');
  counters.forEach((el) => {
    const target = Number(el.dataset.countValue ?? 0);
    const suffix = el.dataset.countSuffix ?? '';
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => {
        el.textContent = `${Math.round(obj.val)}${suffix}`;
      },
    });
  });
}

function setupHorizontal() {
  const section = document.querySelector<HTMLElement>('[data-horizontal]');
  if (!section) return;
  const track = section.querySelector<HTMLElement>('[data-horizontal-track]');
  if (!track) return;
  const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
  if (!isDesktop || reduceMotion) return;

  const getScroll = () => track.scrollWidth - window.innerWidth;

  const tween = gsap.to(track, {
    x: () => -getScroll(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${getScroll()}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  gsap.utils.toArray<HTMLElement>(track.children).forEach((card) => {
    gsap.fromTo(
      card,
      { opacity: 0.45, scale: 0.96 },
      {
        opacity: 1,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          containerAnimation: tween,
          start: 'left 80%',
          end: 'left 45%',
          scrub: true,
        },
      },
    );
  });
}

function setupTextReveal() {
  const blocks = gsap.utils.toArray<HTMLElement>('[data-text-reveal]');
  blocks.forEach((block) => {
    if (reduceMotion) {
      block.querySelectorAll('.tr-word-inner').forEach((el) => (el as HTMLElement).style.opacity = '1');
      return;
    }
    const words = block.querySelectorAll<HTMLElement>('.tr-word-inner');
    gsap.fromTo(
      words,
      { yPercent: 120, opacity: 0.1 },
      {
        yPercent: 0,
        opacity: 1,
        ease: 'none',
        stagger: 0.06,
        scrollTrigger: {
          trigger: block,
          start: 'top 80%',
          end: 'bottom 55%',
          scrub: 0.4,
        },
      },
    );
  });
}

function setupHero() {
  if (reduceMotion) return;
  const lines = gsap.utils.toArray<HTMLElement>('[data-hero-line]');
  if (!lines.length) return;
  gsap.fromTo(
    lines,
    { yPercent: 115 },
    {
      yPercent: 0,
      duration: 1.1,
      stagger: 0.14,
      ease: 'power4.out',
      delay: 0.2,
    },
  );
}

function setupMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const close = document.querySelector('[data-menu-close]');
  const menu = document.querySelector('[data-menu]');
  if (!toggle || !menu) return;

  const open = () => {
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overflow-hidden');
  };
  const closeMenu = () => {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overflow-hidden');
  };

  toggle.addEventListener('click', open);
  close?.addEventListener('click', closeMenu);
  menu.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) closeMenu();
  });
}

function init() {
  createLenis();
  ctx = gsap.context(() => {
    setupCursor();
    setupMagnetic();
    setupHero();
    setupReveal();
    setupTextReveal();
    setupCounters();
    setupSkillBars();
    setupHorizontal();
  });
  setupMenu();
  ScrollTrigger.refresh();
}

function destroy() {
  destroyLenis();
  ctx?.revert();
  ctx = null;
}

document.addEventListener('astro:before-swap', destroy);
document.addEventListener('astro:page-load', init);

export {};
