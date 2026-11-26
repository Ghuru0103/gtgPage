import { gsap } from 'gsap';

type BuildKind = 'text' | 'draw' | 'frame';
interface BuildStep { element: HTMLElement; kind: BuildKind }
interface BuildGroup { target: HTMLElement; timeline: gsap.core.Timeline; overlay: HTMLElement; elements: HTMLElement[] }

/** A load-driven build, not scroll reveals. Real text and layout remain intact. */
export class PageAssembly {
  private groups: BuildGroup[] = [];
  private sequence?: gsap.core.Timeline;
  private deadline?: ReturnType<typeof setTimeout>;
  private readonly maxDurationMs = 3000;
  private names = ['GTG · Design', 'GTG · Connect', 'GTG · Grow'];
  constructor(private root: HTMLElement) {}

  start() {
    this.dispose();
    const startedAt = performance.now();
    this.sequence = gsap.timeline({ paused: true, onComplete: () => this.clearDeadline() });
    this.names = document.documentElement.lang === 'ta'
      ? ['GTG · வடிவமைப்பு', 'GTG · இணைப்பு', 'GTG · வளர்ச்சி']
      : ['GTG · Design', 'GTG · Connect', 'GTG · Grow'];
    const targets = this.root.querySelectorAll<HTMLElement>(
      '.hero-copy, .product-window, .industry-strip, .section-heading, .feature-card, .why-item, .why-closing, .custom-section, .steps article, .faq-section > div, .demo-cta, .site-footer',
    );
    targets.forEach((target, sectionIndex) => {
      const steps = this.pacedSteps(this.stepsFor(target));
      if (!steps.length) return;
      target.classList.add('assembly-target');
      const overlay = document.createElement('div');
      overlay.className = 'assembly-overlay element-assembly';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.innerHTML = this.names.map((name, index) => `
        <div class="assembly-worker crew-${index}">
          <div class="assembly-guide-x"></div><div class="assembly-guide-y"></div>
          <div class="assembly-frame"><i></i><i></i><i></i><i></i><span class="assembly-size"></span></div>
          <div class="assembly-pointer"><svg viewBox="0 0 24 28"><path d="M3 2L21 17L12 18L8 26Z"/></svg><span>${name}</span></div>
          <div class="assembly-caret"></div>
        </div>`).join('');
      target.appendChild(overlay);
      const elements = steps.filter(step => step.kind !== 'frame').map(step => step.element);
      // Clip without changing visibility, text nodes, height, or tab order.
      gsap.set(elements, { clipPath: 'inset(0 100% 0 0)' });
      const timeline = gsap.timeline({
        onComplete: () => this.restore(elements, overlay) });
      const group = { target, timeline, overlay, elements };
      this.groups.push(group);
      const lanes = [0, .2, .4];
      const workers = Array.from(overlay.querySelectorAll<HTMLElement>('.assembly-worker'));
      steps.forEach((step, index) => {
        const lane = index % 3;
        const duration = step.element.matches('.hero-typewriter') ? 1.15 :
          step.kind === 'text' ? Math.min(1.35, .6 + (step.element.textContent?.length ?? 0) * .008) : .75;
        timeline.add(this.buildElement(target, step, workers[lane], duration), lanes[lane]);
        lanes[lane] += duration + .3;
      });
      timeline.to(overlay, { opacity: 0, duration: .25 }, Math.max(...lanes));
      this.sequence!.add(timeline, sectionIndex * .035 + .12);
    });
    // Scale the entire schedule, including offsets and fade-outs, to one shared budget.
    // Leave a frame margin, and include setup time in the three-second limit.
    const elapsed = performance.now() - startedAt;
    const budget = Math.max(.01, (this.maxDurationMs - elapsed - 100) / 1000);
    this.sequence.totalDuration(Math.min(this.sequence.totalDuration(), budget));
    this.deadline = setTimeout(() => this.skip(), Math.max(0, this.maxDurationMs - elapsed));
    this.sequence.play(0);
  }

  /** Keep the page build legible within its three-second total budget. */
  private pacedSteps(steps: BuildStep[]): BuildStep[] {
    if (steps.length <= 4) return steps;
    const selected = new Set<BuildStep>();
    const add = (matches: (step: BuildStep) => boolean) => {
      const step = steps.find(candidate => !selected.has(candidate) && matches(candidate));
      if (step) selected.add(step);
    };
    add(step => step.element.matches('.hero-typewriter,h1,h2,h3'));
    add(step => step.element.matches('.metric-card,.feature-visual,.chart-bar,app-module-orbits,.connected-map'));
    add(step => step.element.matches('.hero-actions a,.custom-section .button,.contact-actions .button,tbody tr,.text-button'));
    for (const step of steps) {
      if (selected.size === 4) break;
      selected.add(step);
    }
    return steps.filter(step => selected.has(step));
  }

  private stepsFor(target: HTMLElement): BuildStep[] {
    const selector = [
      'h1', 'h2', 'h3', 'p', '.eyebrow', '.hero-actions a', '.hero-note',
      '.window-top', '.workspace-brand', '.module-nav button', '.workspace-topline',
      '.metric-card', '.metric-card > span', '.metric-card strong', '.metric-card small',
      '.metric-card .text-button', '.scenario-note', '.time-result', '.why-icon', '.why-item .text-button', '.why-closing .button', '.chart-bar', '.chart-months', '.assistant-card button',
      '.records-heading', 'thead', 'tbody tr', '.window-footer', '.industry-strip > div > span',
      '.feature-visual', '.feature-number', '.feature-text .text-button',
      '.custom-section .button', 'app-module-orbits', '.steps article > span',
      '.faq-list details', '.contact-actions .button', '.contact-actions > div a',
      '.booking-note', '.footer-top .brand', '.footer-top > a:last-child', '.footer-bottom',
    ].join(',');
    const all = Array.from(target.querySelectorAll<HTMLElement>(selector));
    // Nested text inside an independently built card/visual is not clipped twice.
    return all.filter(element => element.getBoundingClientRect().width > 0 &&
      !all.some(parent => parent !== element && parent.contains(element) && !parent.matches('.metric-card')))
      .map(element => ({ element, kind: element.matches('.metric-card') ? 'frame' :
        element.matches('h1,h2,h3,p,.eyebrow,.feature-number,.metric-card strong,.metric-card > span,.booking-note') ? 'text' : 'draw' }));
  }

  private buildElement(target: HTMLElement, step: BuildStep, worker: HTMLElement, duration: number) {
    const frame = worker.querySelector<HTMLElement>('.assembly-frame')!;
    const pointer = worker.querySelector<HTMLElement>('.assembly-pointer')!;
    const caret = worker.querySelector<HTMLElement>('.assembly-caret')!;
    const guideX = worker.querySelector<HTMLElement>('.assembly-guide-x')!;
    const guideY = worker.querySelector<HTMLElement>('.assembly-guide-y')!;
    const size = worker.querySelector<HTMLElement>('.assembly-size')!;
    let x = 0, y = 0, width = 0, height = 0;
    let characters: { right: number; top: number; bottom: number }[] = [];
    const progress = { value: 0 };
    const timeline = gsap.timeline();
    timeline.call(() => {
      const bounds = target.getBoundingClientRect();
      const rect = step.element.getBoundingClientRect();
      x = rect.left - bounds.left - target.clientLeft;
      y = rect.top - bounds.top - target.clientTop;
      width = rect.width; height = rect.height;
      characters = step.kind === 'text' ? this.characterPositions(step.element) : [];
      gsap.set(worker, { autoAlpha: 1 });
      gsap.set(frame, { left: x, top: y, width: 0, height: 0, opacity: step.kind === 'text' ? .35 : 1 });
      gsap.set(pointer, { left: Math.min(x, target.clientWidth - 126), top: y, xPercent: 0, yPercent: 0 });
      gsap.set(caret, { opacity: step.kind === 'text' ? 1 : 0 });
      gsap.set(guideX, { top: y }); gsap.set(guideY, { left: x });
    });
    timeline.to(progress, { value: 1, duration, ease: step.kind === 'text' ? 'none' : 'power2.inOut',
      onUpdate: () => {
        const value = progress.value;
        const point = characters[Math.min(characters.length - 1, Math.floor(value * characters.length))];
        const right = point ? point.right : width * value;
        const bottom = point ? point.bottom : height * value;
        if (step.kind !== 'frame') {
          step.element.style.clipPath = point
            ? `polygon(0 0,100% 0,100% ${point.top}px,${right}px ${point.top}px,${right}px ${bottom}px,0 ${bottom}px)`
            : `inset(0 ${(1 - value) * 100}% ${(1 - value) * 100}% 0)`;
        }
        gsap.set(frame, { width: width * value, height: height * value });
        gsap.set(pointer, { left: Math.max(0, Math.min(x + right, target.clientWidth - 126)), top: Math.min(y + bottom, target.clientHeight - 53) });
        gsap.set(caret, { left: x + right, top: y + (point?.top ?? 0), height: point ? point.bottom - point.top : height });
        gsap.set(guideX, { top: y + bottom }); gsap.set(guideY, { left: x + right });
        size.textContent = `${Math.round(width * value)} × ${Math.round(height * value)}`;
      }, onComplete: () => { step.element.style.removeProperty('clip-path'); }
    });
    timeline.to(worker, { autoAlpha: 0, duration: .16 });
    return timeline;
  }

  /** Range geometry gives a real stepped, line-by-line reveal without replacing Angular text. */
  private characterPositions(element: HTMLElement) {
    const positions: { right: number; top: number; bottom: number }[] = [];
    const bounds = element.getBoundingClientRect();
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const range = document.createRange();
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const text = node.textContent ?? '';
      for (const { index, segment } of new Intl.Segmenter(document.documentElement.lang, { granularity: 'grapheme' }).segment(text)) {
        range.setStart(node, index); range.setEnd(node, index + segment.length);
        const rect = range.getBoundingClientRect();
        if (rect.width && rect.height) positions.push({ right: Math.min(bounds.width, rect.right - bounds.left + 1), top: Math.max(0, rect.top - bounds.top), bottom: Math.min(bounds.height, rect.bottom - bounds.top + 2) });
      }
    }
    return positions;
  }

  private restore(elements: HTMLElement[], overlay: HTMLElement) {
    elements.forEach(element => element.style.removeProperty('clip-path'));
    gsap.set(overlay, { autoAlpha: 0 });
  }

  finishTarget(element: EventTarget | null) {
    if (!(element instanceof Element)) return;
    this.groups.forEach(group => {
      if (group.target.contains(element) || element.contains(group.target)) {
        group.timeline.kill(); this.restore(group.elements, group.overlay);
      }
    });
  }

  private clearDeadline() {
    if (this.deadline !== undefined) clearTimeout(this.deadline);
    this.deadline = undefined;
  }

  skip() {
    this.clearDeadline();
    this.sequence?.kill();
    this.groups.forEach(group => { group.timeline.kill(); this.restore(group.elements, group.overlay); });
  }

  dispose() {
    this.skip();
    this.groups.forEach(group => { group.overlay.remove(); group.target.classList.remove('assembly-target'); });
    this.groups = [];
    this.sequence = undefined;
  }
}
