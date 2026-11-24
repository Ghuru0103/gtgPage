import { TranslatePipe } from '../services/translate.pipe';
import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, inject } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-module-orbits',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <div class="solar-system" role="group" [attr.aria-label]="'GTG business modules orbiting GrowTogether' | translate"
      (mouseenter)="hovered = true" (mouseleave)="hovered = false"
      (focusin)="hovered = true" (focusout)="hovered = false">
      <div class="solar-map">
        <div class="solar-ring inner-ring" aria-hidden="true"></div>
        <div class="solar-ring outer-ring" aria-hidden="true"></div>
        <div class="solar-sun"><span class="brand-emblem"><img src="assets/gtg-brand.png" alt="GrowTogether" width="2752" height="1536"></span><small> {{ 'Built around you' | translate }} </small></div>
        @for (module of modules; track module.name; let i = $index) {
          <div class="solar-module" [class.outer-module]="i >= 4" [style.--planet-color]="module.color">
            <span class="planet-dot" aria-hidden="true"></span><span>{{module.name | translate}}</span>
          </div>
        }
      </div>
      <div class="solar-caption"><span> {{ 'Your business. One connected universe.' | translate }} </span>
        @if (!reducedMotion) { <button type="button" (click)="paused = !paused" [attr.aria-pressed]="paused" [attr.aria-label]="(paused ? 'Resume module orbits' : 'Pause module orbits') | translate">{{(paused ? '▶ Resume' : 'Ⅱ Pause') | translate}}</button> }
      </div>
    </div>
  `,
  styles: [`
    :host{display:block;min-width:0;width:100%}
    .solar-system{width:100%;max-width:540px;margin:auto}
    .solar-map{position:relative;width:100%;aspect-ratio:1 / 1.12;isolation:isolate}
    .solar-ring{position:absolute;border:1px solid #c3d7e3;border-radius:50%;left:50%;top:50%;transform:translate(-50%,-50%);pointer-events:none}
    .inner-ring{width:44%;height:48%;background:radial-gradient(ellipse,#dbe9f255,transparent 72%)}
    .outer-ring{width:74%;height:84%;border-style:dashed;border-color:#b7ccd9}
    .solar-sun{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;width:94px;height:94px;border-radius:50%;background:#e1ebf2;box-shadow:0 0 0 12px #e7eff580,0 0 45px #3189a31a}
    .solar-sun .brand-emblem{width:66px;height:66px;border-radius:50%}
    .solar-sun small{font-size:8px;color:#49637a;white-space:nowrap}
    .solar-module{max-width:100px;text-align:center;position:absolute;left:50%;top:50%;display:flex;align-items:center;justify-content:center;gap:7px;min-height:35px;padding:8px 10px;background:#fff;border:1px solid #d6e1e8;border-radius:9px;box-shadow:0 5px 16px #113c5710;white-space:normal;font-size:11px;color:#244159;will-change:transform}
    .planet-dot{flex-shrink:0;width:6px;height:6px;border-radius:50%;background:var(--planet-color);box-shadow:0 0 0 3px color-mix(in srgb,var(--planet-color) 12%,transparent)}
    .outer-module{border-bottom:2px solid color-mix(in srgb,var(--planet-color) 55%,white)}
    .solar-caption{display:flex;justify-content:center;align-items:center;gap:14px;flex-wrap:wrap;color:#61768a;font-family:Georgia,serif;font-style:italic;font-size:14px;margin-top:12px}
    .solar-caption button{font:11px Arial,sans-serif;color:#315b74;border:1px solid #c3d5e0;background:#fff;border-radius:6px;padding:8px 10px;min-height:34px}
    @media(max-width:1024px){.solar-module{font-size:9px;gap:5px;padding:7px}.solar-sun{width:78px;height:78px}.solar-sun .brand-emblem{width:52px;height:52px}.solar-sun small{font-size:7px}}
    @media(max-width:767px){.solar-system{max-width:460px}.solar-module{font-size:10px}.solar-map{aspect-ratio:1 / 1.22}}
    @media(max-width:380px){.solar-module{font-size:9px;gap:4px;padding:7px 5px}.planet-dot{width:4px;height:4px}.solar-sun{width:64px;height:64px;gap:3px}.solar-sun .brand-emblem{width:43px;height:43px}.solar-sun small{font-size:6px}.solar-caption{font-size:12px}}
    :host-context(html[lang="ta"]) .solar-module{font-size:9px;line-height:1.5;max-width:88px}
    :host-context(html[lang="ta"]) .solar-sun small{font-size:6px}
    @media(max-width:380px){:host-context(html[lang="ta"]) .solar-module{max-width:70px;font-size:8px}}
    @media(prefers-reduced-motion:reduce){.solar-module{will-change:auto}}
  `],
})
export class ModuleOrbitsComponent implements AfterViewInit, OnDestroy {
  private element: ElementRef<HTMLElement> = inject(ElementRef);
  private zone = inject(NgZone);
  private resize?: ResizeObserver;
  private visibility?: IntersectionObserver;
  private media?: MediaQueryList;
  private nodes: HTMLElement[] = [];
  private map?: HTMLElement;
  private visible = false;
  private width = 0;
  private height = 0;
  private angle = 0;
  private scrollAngle = 0;
  paused = false;
  hovered = false;
  reducedMotion = false;
  modules = [
    {name:'Sales',color:'#327eb0'}, {name:'Inventory',color:'#298464'},
    {name:'Accounts',color:'#d6a245'}, {name:'Customers',color:'#327eb0'},
    {name:'AI system',color:'#725ca5'}, {name:'Estimation',color:'#327eb0'},
    {name:'Purchase',color:'#298464'}, {name:'Receipt',color:'#298464'},
    {name:'Payment',color:'#d6a245'}, {name:'GST reports',color:'#327eb0'},
  ];
  private draw = () => {
    this.nodes.forEach((node,i) => {
      const outer=i>=4;
      const phase=(outer ? (i-4)/6 : i/4)*Math.PI*2 - Math.PI/2;
      const theta=phase+(this.reducedMotion ? 0 : this.angle*(outer ? .7 : 1)+this.scrollAngle);
      const x=Math.cos(theta)*this.width*(outer ? .37 : .22);
      const y=Math.sin(theta)*this.height*(outer ? .42 : .24);
      // Translate, never rotate: labels remain upright along both elliptical orbits.
      node.style.transform=`translate(-50%,-50%) translate(${x}px,${y}px)`;
    });
  };
  private tick = (_time:number, delta:number) => {
    if(!this.visible || this.paused || this.hovered || this.reducedMotion || document.hidden) return;
    this.angle += Math.min(delta,64)*.000055;
    this.draw();
  };
  private onScroll = () => {
    if(!this.map || this.paused || this.hovered || this.reducedMotion) return;
    this.scrollAngle=(window.innerHeight/2-this.map.getBoundingClientRect().top)/window.innerHeight*.55;
    this.draw();
  };
  private onMotion = () => {
    this.zone.run(()=>this.reducedMotion=!!this.media?.matches);
    this.draw();
  };
  ngAfterViewInit() {
    this.zone.runOutsideAngular(()=>{
      const map=this.element.nativeElement.querySelector<HTMLElement>('.solar-map')!;
      this.map=map;
      this.nodes=Array.from(map.querySelectorAll<HTMLElement>('.solar-module'));
      this.media=matchMedia('(prefers-reduced-motion: reduce)');
      this.onMotion();this.media.addEventListener('change',this.onMotion);
      this.resize=new ResizeObserver(()=>{this.width=this.map!.clientWidth;this.height=this.map!.clientHeight;this.draw();});
      this.resize.observe(map);
      this.visibility=new IntersectionObserver(([entry])=>this.visible=entry.isIntersecting);
      this.visibility.observe(map);
      window.addEventListener('scroll',this.onScroll,{passive:true});
      gsap.ticker.add(this.tick);
    });
  }
  ngOnDestroy(){gsap.ticker.remove(this.tick);window.removeEventListener('scroll',this.onScroll);this.media?.removeEventListener('change',this.onMotion);this.resize?.disconnect();this.visibility?.disconnect();}
}
