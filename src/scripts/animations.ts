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

  const interactive = 'a, button, [role="button"], [data-magnetic]';
  document.addEventListener(
    'mouseover',
    (e) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactive)) ring.classList.add('is-active');
    },
    { passive: true },
  );
  document.addEventListener(
    'mouseout',
    (e) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactive)) ring.classList.remove('is-active');
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
    if (el.closest('[data-horizontal-track]') || el.closest('[data-stack-card]')) return;
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

function setupParallax() {
  if (reduceMotion) return;
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = Number(el.dataset.parallax ?? 15);
    gsap.fromTo(
      el,
      { y: 0 },
      {
        y: () => -speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('section') ?? el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
  });
}

function setupTilt() {
  if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
    const max = 7;
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, {
        rotateY: px * max,
        rotateX: -py * max,
        y: -6,
        transformPerspective: 900,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        y: 0,
        transformPerspective: 900,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      });
    });
  });
}

function setupProgress() {
  const bar = document.querySelector<HTMLElement>('#scroll-progress');
  if (!bar || reduceMotion) return;
  gsap.fromTo(
    bar,
    { scaleX: 0 },
    {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        start: 0,
        end: 'max',
        scrub: 0.3,
      },
    },
  );
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

function setupSkillBars() {
  const bars = gsap.utils.toArray<HTMLElement>('[data-skill-bar]');
  bars.forEach((bar) => {
    const level = Number(bar.dataset.level ?? 0) / 100;
    const card = bar.closest<HTMLElement>('.group') ?? bar.parentElement;

    if (reduceMotion) {
      bar.style.transform = `scaleX(${level})`;
      return;
    }

    gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: level,
        ease: 'none',
        scrollTrigger: {
          trigger: card ?? bar,
          start: 'top 85%',
          end: 'bottom 65%',
          scrub: 0.4,
        },
      },
    );
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

  const getScroll = () => {
    const style = getComputedStyle(track);
    const padR = parseFloat(style.paddingRight) || 0;
    return track.scrollWidth - window.innerWidth + padR;
  };

  const tween = gsap.to(track, {
    x: () => -getScroll(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top+=72',
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

function setupServiceStack() {
  const section = document.querySelector<HTMLElement>('[data-service-stack]');
  if (!section) return;
  const cards = gsap.utils.toArray<HTMLElement>(section.querySelectorAll('[data-stack-card]'));
  if (!cards.length) return;

  const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

  if (isDesktop && !reduceMotion) {
    cards.forEach((card, i) => {
      if (i > 0) {
        gsap.set(card, { yPercent: 115, opacity: 0, scale: 0.96 });
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top+=75',
        end: () => `+=${cards.length * 450}`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    cards.forEach((card, index) => {
      if (index === 0) return;

      tl.to(card, {
        yPercent: 0,
        opacity: 1,
        scale: 1,
        ease: 'power2.out',
        duration: 1,
      });

      const prevCards = cards.slice(0, index);
      tl.to(
        prevCards,
        {
          scale: (i) => 1 - (index - i) * 0.035,
          y: (i) => -(index - i) * 16,
          opacity: (i) => Math.max(0.4, 1 - (index - i) * 0.2),
          duration: 1,
        },
        '<',
      );
    });
  } else {
    cards.forEach((card, i) => {
      card.style.position = 'relative';
      card.style.top = '0';
      card.style.transform = 'none';
      card.style.opacity = '1';
      if (i > 0) card.style.marginTop = '1.5rem';
    });
  }
}

function setupInfraFlowAnimation() {
  const container = document.querySelector<HTMLElement>('[data-infra-flow-section]');
  if (!container || reduceMotion) return;

  const nodes = gsap.utils.toArray<HTMLElement>(container.querySelectorAll('[data-infra-node]'));
  const laserBar = container.querySelector<HTMLElement>('[data-infra-laser-bar]');
  const stepLabel = container.querySelector<HTMLElement>('[data-infra-step-label]');
  const inspector = container.querySelector<HTMLElement>('[data-infra-packet-inspector]');
  if (!nodes.length || !laserBar) return;

  const labels = [
    '1. Webserver & Sicherheit im Fokus (SSL/TLS)...',
    '2. Symfony App & API Engine verarbeitet Geschäftslogik...',
    '3. Redis Cache & Queue beschleunigen Antworten...',
    '4. PostgreSQL DB & S3 Speicher sichern Daten (Bereit 🚀)',
  ];

  const statusTexts = [
    'Komponente 1 von 4 aktiv: Nginx Reverse Proxy & SSL',
    'Komponente 2 von 4 aktiv: Symfony 7 & PHP 8.3 FPM App',
    'Komponente 3 von 4 aktiv: Redis In-Memory Speed & Queue',
    'Komponente 4 von 4 aktiv: PostgreSQL DB & MinIO Cloud Storage',
  ];

  const borderAccents = [
    'rgba(245, 158, 11, 0.7)',
    'rgba(14, 165, 233, 0.7)',
    'rgba(139, 92, 246, 0.7)',
    'rgba(16, 185, 129, 0.7)',
  ];

  const shadowAccents = [
    '0 10px 30px -5px rgba(245, 158, 11, 0.25)',
    '0 10px 30px -5px rgba(14, 165, 233, 0.25)',
    '0 10px 30px -5px rgba(139, 92, 246, 0.25)',
    '0 10px 30px -5px rgba(16, 185, 129, 0.25)',
  ];

  const dotBgClasses = [
    'bg-amber-400 shadow-amber-500/50',
    'bg-sky-400 shadow-sky-500/50',
    'bg-violet-400 shadow-violet-500/50',
    'bg-emerald-400 shadow-emerald-500/50',
  ];

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top center+=140',
      end: 'bottom center',
      scrub: 0.5,
    },
  });

  tl.to(laserBar, { width: '100%', ease: 'none', duration: 1 });

  const nodeCount = nodes.length;
  nodes.forEach((node, i) => {
    const startProgress = i / nodeCount;
    const dot = node.querySelector<HTMLElement>('[data-infra-node-dot]');

    tl.to(
      node,
      {
        scale: 1.03,
        borderColor: borderAccents[i],
        boxShadow: shadowAccents[i],
        duration: 0.25,
        onStart: () => {
          if (dot) {
            dot.className = `size-3 rounded-full ${dotBgClasses[i]} opacity-100 transition-all duration-300 shadow-lg`;
          }
          if (stepLabel) stepLabel.textContent = labels[i];
          if (inspector) inspector.textContent = statusTexts[i];
        },
        onReverseComplete: () => {
          const prevIdx = Math.max(0, i - 1);
          if (dot && i > 0) {
            dot.className = `size-3 rounded-full bg-line opacity-40 transition-all duration-300`;
          }
          if (stepLabel) stepLabel.textContent = labels[prevIdx];
          if (inspector) inspector.textContent = statusTexts[prevIdx];
        },
      },
      startProgress,
    );
  });
}

function setupCvTimeline() {
  const container = document.querySelector<HTMLElement>('#cv');
  if (!container) return;

  if (reduceMotion) {
    container.querySelectorAll<HTMLElement>('[data-cv-item], [data-cv-card]').forEach((el) => {
      el.style.opacity = '1';
    });
    return;
  }

  // 1. Timeline Axis Growth
  const lines = container.querySelectorAll<HTMLElement>('[data-cv-timeline]');
  lines.forEach((line) => {
    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: line.parentElement,
          start: 'top 80%',
          end: 'bottom 65%',
          scrub: 0.4,
        },
      },
    );
  });

  // 2. Active vs. Inactive Item Highlight (Muted Gray -> Active Bright Contrast)
  const items = container.querySelectorAll<HTMLElement>('[data-cv-item]');
  items.forEach((item) => {
    const dot = item.querySelector<HTMLElement>('[data-cv-dot]');

    gsap.to(item, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 82%',
        toggleActions: 'play reverse play reverse',
        onEnter: () => {
          if (dot) {
            dot.classList.remove('border-line', 'opacity-40');
            dot.classList.add('border-accent', 'bg-accent', 'opacity-100', 'shadow-md', 'shadow-accent/50');
          }
        },
        onLeaveBack: () => {
          if (dot) {
            dot.classList.remove('border-accent', 'bg-accent', 'opacity-100', 'shadow-md', 'shadow-accent/50');
            dot.classList.add('border-line', 'opacity-40');
          }
        },
      },
    });
  });

  // 3. Active vs Inactive Card Highlight (Volunteer & Certificates)
  const cards = container.querySelectorAll<HTMLElement>('[data-cv-card]');
  cards.forEach((card) => {
    gsap.to(card, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play reverse play reverse',
      },
    });
  });
}

export function boot() {
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
    setupServiceStack();
    setupInfraFlowAnimation();
    setupCvTimeline();
    setupParallax();
    setupTilt();
    setupProgress();
  });
  ScrollTrigger.refresh();
}

export function shutdown() {
  destroyLenis();
  ctx?.revert();
  ctx = null;
}
