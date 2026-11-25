import { I18nService } from './services/i18n.service';
import { TranslatePipe } from './services/translate.pipe';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  inject,
} from '@angular/core';
import { ModuleOrbitsComponent } from './components/module-orbits.component';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { PageAssembly } from './page-assembly';
import { DEMO_VIEWS, DEMO_BUSINESS } from './prototype-data';

@Component({
  selector: 'app-root',
  imports: [FormsModule, ModuleOrbitsComponent, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit, OnDestroy {
  i18n = inject(I18nService);
  toggleLanguage() { this.skipAnimations(); this.i18n.toggle(); }
  private host = inject(ElementRef<HTMLElement>);
  private zone = inject(NgZone);
  private motion?: gsap.MatchMedia;
  private assembly?: PageAssembly;
  motionAvailable = false;
  animationsSkipped = false;
  private intro?: gsap.core.Timeline;
  private transition?: gsap.core.Tween;
  views = DEMO_VIEWS;
  business = DEMO_BUSINESS;
  get potentialHoursSaved() {
    return this.business.monthlyOrders * (this.business.manualMinutesPerOrder - this.business.connectedMinutesPerOrder) / 60;
  }
  money(value: number) { return '₹' + value.toLocaleString('en-IN'); }
  active = 0;
  menuOpen = false;
  toggleMenu() { this.menuOpen = !this.menuOpen; }
  query = '';
  selectedRow: string[] | null = null;
  year = new Date().getFullYear();
  get view() {
    return this.views[this.active];
  }
  get rows() {
    return this.view.rows.filter((row) =>
      row.map(value => value + ' ' + this.i18n.t(value)).join(' ').toLowerCase().includes(this.query.toLowerCase()),
    );
  }
  selectView(index: number) {
    this.active = index;
    this.query = '';
    this.selectedRow = null;
    this.intro?.progress(1);
    this.assembly?.finishTarget(this.host.nativeElement.querySelector('.product-window'));
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.transition?.kill();
      this.transition = gsap.fromTo(
        '.demo-content',
        { opacity: 0.4, y: 6 },
        { opacity: 1, y: 0, duration: 0.3, clearProps: 'all' },
      );
    }
  }
  replay() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.assembly?.finishTarget(this.host.nativeElement.querySelector('.product-window'));
    this.zone.runOutsideAngular(() => this.playIntro());
  }
  private playIntro(delay = 0) {
    this.intro?.progress(1).kill();
    const select = gsap.utils.selector(this.host.nativeElement);
    this.intro = gsap.timeline({ delay });
    this.intro
      .fromTo(
        select('.build-cursor'),
        { autoAlpha: 0, x: -45, y: 30 },
        { autoAlpha: 1, x: 0, y: 0, duration: 0.45 },
      )
      .fromTo(
        select('.metric-card'),
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.55,
          stagger: 0.16,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        },
      )
      .to(select('.build-cursor'), { x: 110, y: 125, duration: 0.7 }, '<');
    const bars = select('.chart-bar');
    if (bars.length) {
      // Preserve Angular's inline percentage heights when cleaning up the tween.
      this.intro.fromTo(
        bars,
        { scaleY: 0, transformOrigin: 'bottom' },
        {
          scaleY: 1,
          duration: 0.65,
          stagger: 0.045,
          ease: 'power3.out',
          clearProps: 'transform,transformOrigin',
        },
        '-=.3',
      );
    }
    this.intro.to(select('.build-cursor'), { autoAlpha: 0, duration: 0.4 });
    this.intro.totalDuration(Math.min(this.intro.totalDuration(), Math.max(.01, 2.9 - delay)));
  }
  replayPage() {
    if (!this.motionAvailable) return;
    this.animationsSkipped = false;
    this.intro?.progress(1).kill();
    this.zone.runOutsideAngular(() => this.assembly?.start());
  }
  skipAnimations() {
    this.assembly?.skip();
    this.intro?.progress(1);
    this.animationsSkipped = true;
  }
  @HostListener('document:focusin', ['$event'])
  finishFocusedSection(event: FocusEvent) {
    this.assembly?.finishTarget(event.target);
  }
  @HostListener('window:resize')
  finishOnResize() {
    this.assembly?.skip();
  }
  @HostListener('document:keydown.escape') skip() {
    this.skipAnimations();
    this.intro?.progress(1);
    this.menuOpen = false;
    this.selectedRow = null;
  }
  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.motion = gsap.matchMedia();
      this.motion.add(
        '(prefers-reduced-motion: no-preference)',
        () => {
          this.zone.run(() => {
            this.motionAvailable = true;
            this.animationsSkipped = false;
          });
          this.assembly = new PageAssembly(this.host.nativeElement);
          this.assembly.start();
          return () => {
            this.assembly?.dispose();
            this.intro?.progress(1).kill();
            this.transition?.progress(1).kill();
            this.zone.run(() => {
              this.motionAvailable = false;
            });
          };
        },
        this.host.nativeElement,
      );
    });
  }
  ngOnDestroy() {
    this.assembly?.dispose();
    this.motion?.revert();
    this.intro?.kill();
    this.transition?.kill();
  }
}
