import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="py-24 hero-bg relative overflow-hidden">
      <!-- Background effects -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div class="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-float" style="animation-delay:-2s"></div>
      </div>

      <div class="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full
                    bg-blue-500/20 border border-blue-500/40 text-blue-300
                    text-sm font-medium mb-6">
          <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          Join the GTG Family
        </div>

        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
          {{ i18n.t('cta.title') }}
        </h2>
        <p class="text-xl text-gray-300 mb-10">{{ i18n.t('cta.subtitle') }}</p>

        <form (ngSubmit)="onSubmit()" class="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input
            [(ngModel)]="email"
            name="email"
            type="email"
            [placeholder]="i18n.t('cta.placeholder')"
            class="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20
                   text-white placeholder-gray-400 backdrop-blur-sm
                   focus:outline-none focus:border-blue-400 focus:bg-white/20
                   transition-all duration-300 text-base"
          >
          <button type="submit"
                  class="px-8 py-4 rounded-full font-bold text-white text-lg
                         bg-gradient-to-r from-blue-600 to-emerald-500
                         hover:from-blue-500 hover:to-emerald-400
                         transition-all duration-300 hover:scale-105 btn-glow
                         shadow-lg shadow-blue-500/30 whitespace-nowrap">
            {{ i18n.t('cta.button') }}
          </button>
        </form>

        <p *ngIf="submitted" class="mt-6 text-emerald-400 font-semibold animate-fade-in-up">
          🎉 Thanks! We'll be in touch soon.
        </p>

        <p class="mt-6 text-gray-500 text-sm">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  `
})
export class CtaComponent {
  i18n = inject(I18nService);
  email = '';
  submitted = false;

  onSubmit(): void {
    if (this.email) {
      this.submitted = true;
      this.email = '';
    }
  }
}
