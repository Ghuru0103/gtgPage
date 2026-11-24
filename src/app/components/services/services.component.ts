import { Component, OnInit, inject, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../services/i18n.service';

interface ServiceCard {
  icon: string;
  titleKey: string;
  descKey: string;
  color: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="services" class="py-24 bg-gray-50 dark:bg-gray-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">
            {{ i18n.t('services.title') }}
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400">{{ i18n.t('services.subtitle') }}</p>
          <div class="mt-4 mx-auto w-24 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"></div>
        </div>

        <!-- Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div #cardEl
               *ngFor="let card of services; let i = index"
               class="service-card group relative rounded-2xl p-8 cursor-pointer
                      bg-white dark:bg-gray-900
                      border border-gray-200 dark:border-gray-800
                      hover:border-transparent
                      transition-all duration-300 hover:scale-105 hover:shadow-2xl
                      opacity-0"
               [class.animate-fade-in-up]="visibleCards[i]"
               [style.animation-delay]="(i * 100) + 'ms'">

            <!-- Gradient border glow on hover -->
            <div class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        bg-gradient-to-br" [ngClass]="card.color"
                 style="padding:2px; z-index:-1; border-radius:1rem;">
            </div>

            <!-- Icon -->
            <div class="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{{ card.icon }}</div>

            <!-- Title -->
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3
                       group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r
                       transition-all duration-300"
                [ngClass]="card.color">
              {{ i18n.t(card.titleKey) }}
            </h3>

            <!-- Description -->
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">{{ i18n.t(card.descKey) }}</p>

            <!-- Arrow -->
            <div class="mt-4 flex items-center text-blue-500 font-semibold text-sm
                        opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-2">
              Learn more
              <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ServicesComponent implements OnInit {
  i18n = inject(I18nService);
  @ViewChildren('cardEl') cardEls!: QueryList<ElementRef>;
  visibleCards: boolean[] = [];

  services: ServiceCard[] = [
    { icon: '💇', titleKey: 'services.saloon.title', descKey: 'services.saloon.desc', color: 'from-blue-500 to-cyan-400' },
    { icon: '🎉', titleKey: 'services.events.title', descKey: 'services.events.desc', color: 'from-purple-500 to-pink-400' },
    { icon: '📚', titleKey: 'services.tuition.title', descKey: 'services.tuition.desc', color: 'from-emerald-500 to-teal-400' },
    { icon: '💍', titleKey: 'services.marriage.title', descKey: 'services.marriage.desc', color: 'from-rose-500 to-orange-400' },
    { icon: '🍽', titleKey: 'services.restaurant.title', descKey: 'services.restaurant.desc', color: 'from-amber-500 to-yellow-400' },
    { icon: '🏪', titleKey: 'services.retail.title', descKey: 'services.retail.desc', color: 'from-indigo-500 to-blue-400' },
  ];

  ngOnInit(): void {
    this.visibleCards = new Array(this.services.length).fill(false);
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = this.cardEls.toArray().findIndex(el => el.nativeElement === entry.target);
          if (idx !== -1) this.visibleCards[idx] = true;
        }
      });
    }, { threshold: 0.15 });

    this.cardEls.forEach(el => observer.observe(el.nativeElement));
  }
}
