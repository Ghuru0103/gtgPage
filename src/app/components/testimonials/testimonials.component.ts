import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../services/i18n.service';

interface Testimonial {
  name: string;
  role: string;
  text: string;
  avatar: string;
  stars: number;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-24 bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">
            {{ i18n.t('testimonials.title') }}
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400">{{ i18n.t('testimonials.subtitle') }}</p>
          <div class="mt-4 mx-auto w-24 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"></div>
        </div>

        <!-- Carousel -->
        <div class="relative" (mouseenter)="pauseAuto()" (mouseleave)="resumeAuto()">
          <div class="overflow-hidden rounded-2xl">
            <div class="flex transition-transform duration-500 ease-in-out"
                 [style.transform]="'translateX(-' + (current * 100) + '%)'">
              <div *ngFor="let t of testimonials"
                   class="min-w-full px-4">
                <div class="max-w-2xl mx-auto bg-white dark:bg-gray-900
                            rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
                  <!-- Stars -->
                  <div class="flex gap-1 mb-4">
                    <svg *ngFor="let s of [1,2,3,4,5]" class="w-5 h-5 text-amber-400 fill-amber-400"
                         viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <p class="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6 italic">"{{ t.text }}"</p>
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500
                                flex items-center justify-center text-white font-bold text-lg">
                      {{ t.avatar }}
                    </div>
                    <div>
                      <p class="font-bold text-gray-900 dark:text-white">{{ t.name }}</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">{{ t.role }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Dots -->
          <div class="flex justify-center gap-2 mt-8">
            <button *ngFor="let t of testimonials; let i = index"
                    (click)="current = i"
                    class="w-3 h-3 rounded-full transition-all duration-300"
                    [class.bg-blue-500]="current === i"
                    [class.w-6]="current === i"
                    [class.bg-gray-300]="current !== i"
                    [class.dark:bg-gray-600]="current !== i">
            </button>
          </div>

          <!-- Prev/Next -->
          <button (click)="prev()"
                  class="absolute top-1/2 -translate-y-1/2 -left-4 w-10 h-10 rounded-full
                         bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700
                         flex items-center justify-center hover:scale-110 transition-all duration-200">
            <svg class="w-5 h-5 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button (click)="next()"
                  class="absolute top-1/2 -translate-y-1/2 -right-4 w-10 h-10 rounded-full
                         bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700
                         flex items-center justify-center hover:scale-110 transition-all duration-200">
            <svg class="w-5 h-5 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  `
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  i18n = inject(I18nService);
  current = 0;
  private timer: any;

  testimonials: Testimonial[] = [
    {
      name: 'Ravi Kumar',
      role: 'Saloon Owner, Chennai',
      text: 'GrowTogether transformed my saloon business. Bookings tripled in just 3 months. The digital tools are incredibly simple to use!',
      avatar: 'RK',
      stars: 5,
    },
    {
      name: 'Priya Lakshmi',
      role: 'Event Planner, Coimbatore',
      text: 'Managing events is now so much easier. GTG\'s platform helped me coordinate vendors, guests, and timelines effortlessly.',
      avatar: 'PL',
      stars: 5,
    },
    {
      name: 'Suresh Babu',
      role: 'Tuition Centre Director, Madurai',
      text: 'Fee collection and student attendance became automated. Parents are happy, teachers are relieved. GTG is a game-changer!',
      avatar: 'SB',
      stars: 5,
    },
    {
      name: 'Meena Devi',
      role: 'Marriage Hall Manager, Tirunelveli',
      text: 'Every booking, every vendor, every detail is now organized perfectly. We\'ve increased our hall utilization by 60%.',
      avatar: 'MD',
      stars: 5,
    },
  ];

  ngOnInit(): void {
    this.startAuto();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  next(): void {
    this.current = (this.current + 1) % this.testimonials.length;
  }

  prev(): void {
    this.current = (this.current - 1 + this.testimonials.length) % this.testimonials.length;
  }

  pauseAuto(): void {
    clearInterval(this.timer);
  }

  resumeAuto(): void {
    this.startAuto();
  }

  private startAuto(): void {
    this.timer = setInterval(() => this.next(), 4000);
  }
}
