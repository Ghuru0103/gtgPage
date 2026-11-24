import { Component, OnInit, OnDestroy, HostListener, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cursor-dot" [style.left.px]="dotX" [style.top.px]="dotY"></div>
    <div class="cursor-ring" [style.left.px]="ringX" [style.top.px]="ringY">
      <span class="cursor-gtg">GTG</span>
    </div>
  `,
  styles: [`
    :host { pointer-events: none; }
  `]
})
export class CursorComponent implements OnInit, OnDestroy {
  dotX = 0;
  dotY = 0;
  ringX = 0;
  ringY = 0;

  private targetX = 0;
  private targetY = 0;
  private animId = 0;

  ngOnInit(): void {
    this.animate();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animId);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    this.targetX = e.clientX;
    this.targetY = e.clientY;
    this.dotX = e.clientX;
    this.dotY = e.clientY;
  }

  private animate(): void {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const step = () => {
      this.ringX = lerp(this.ringX, this.targetX, 0.12);
      this.ringY = lerp(this.ringY, this.targetY, 0.12);
      this.animId = requestAnimationFrame(step);
    };
    this.animId = requestAnimationFrame(step);
  }
}
