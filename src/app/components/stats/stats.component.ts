import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../services/i18n.service';
import { inject } from '@angular/core';

interface Stat {
  value: number;
  suffix: string;
  labelKey: string;
  display: string;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="py-24 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="text-center mb-16">
          <h2 class="text-4xl sm:text-5xl font-black text-white mb-4">Our Impact</h2>
          <div class="mx-auto w-24 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"></div>
        </div>

        <div #statsSection class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div *ngFor="let stat of stats"
               class="text-center group">
            <div class="relative inline-block">
              <div class="text-5xl sm:text-6xl font-black gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                {{ stat.display }}{{ stat.suffix }}
              </div>
              <div class="absolute -inset-4 bg-blue-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 blur-xl"></div>
            </div>
            <div class="text-gray-400 font-medium text-lg uppercase tracking-wide">
              {{ i18n.t(stat.labelKey) }}
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class StatsComponent implements OnInit {
  i18n = inject(I18nService);
  @ViewChild('statsSection') statsSection!: ElementRef;

  stats: Stat[] = [
    { value: 500, suffix: '+', labelKey: 'stats.businesses', display: '0' },
    { value: 10, suffix: 'K+', labelKey: 'stats.customers', display: '0' },
    { value: 5, suffix: '', labelKey: 'stats.cities', display: '0' },
    { value: 3, suffix: '+', labelKey: 'stats.years', display: '0' },
  ];

  private animated = false;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !this.animated) {
        this.animated = true;
        this.animateCounters();
      }
    }, { threshold: 0.4 });
    observer.observe(this.statsSection.nativeElement);
  }

  private animateCounters(): void {
    this.stats.forEach(stat => {
      const duration = 1800;
      const start = Date.now();
      const tick = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        stat.display = String(Math.round(stat.value * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }
}
