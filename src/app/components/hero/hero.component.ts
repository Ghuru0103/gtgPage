import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="home"
      class="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg">

      <!-- Floating animated shapes -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-float" style="animation-delay:-1.5s"></div>
        <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
        <!-- Orbiting ring -->
        <div class="absolute top-16 right-16 w-32 h-32 border border-blue-400/30 rounded-full animate-spin-slow"></div>
        <div class="absolute bottom-32 left-20 w-20 h-20 border border-emerald-400/30 rounded-full animate-spin-slow" style="animation-direction:reverse;animation-duration:5s"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div class="grid lg:grid-cols-2 gap-12 items-center">

          <!-- Left: Text -->
          <div class="text-center lg:text-left">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full
                        bg-blue-500/20 border border-blue-500/40 text-blue-300
                        text-sm font-medium mb-6 animate-fade-in-up">
              <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Trusted by 500+ Businesses
            </div>

            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-4 animate-fade-in-up" style="animation-delay:0.1s">
              <span class="gradient-text">{{ i18n.t('hero.tagline') }}</span>
            </h1>

            <p class="text-xl sm:text-2xl text-gray-300 font-semibold mb-6 animate-fade-in-up" style="animation-delay:0.2s">
              {{ i18n.t('hero.subtitle') }}
            </p>

            <p class="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0 animate-fade-in-up" style="animation-delay:0.3s">
              {{ i18n.t('hero.description') }}
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style="animation-delay:0.4s">
              <a href="#contact"
                 class="px-8 py-4 rounded-full font-bold text-white text-lg
                        bg-gradient-to-r from-blue-600 to-emerald-500
                        hover:from-blue-500 hover:to-emerald-400
                        transition-all duration-300 hover:scale-105 btn-glow
                        shadow-lg shadow-blue-500/30">
                {{ i18n.t('hero.cta.start') }}
              </a>
              <a href="#services"
                 class="px-8 py-4 rounded-full font-bold text-white text-lg
                        border-2 border-white/30 hover:border-white/60
                        hover:bg-white/10 transition-all duration-300 hover:scale-105">
                {{ i18n.t('hero.cta.learn') }}
              </a>
            </div>
          </div>

          <!-- Right: Visual card -->
          <div class="hidden lg:flex items-center justify-center">
            <div class="relative w-80 h-80">
              <!-- Outer ring -->
              <div class="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-spin-slow"></div>
              <!-- Middle ring -->
              <div class="absolute inset-8 rounded-full border-2 border-emerald-400/30 animate-spin-slow" style="animation-direction:reverse;animation-duration:6s"></div>
              <!-- Center card -->
              <div class="absolute inset-16 rounded-full glass flex flex-col items-center justify-center">
                <span class="text-4xl font-black gradient-text">GTG</span>
                <span class="text-xs text-gray-300 mt-1 text-center leading-tight">Grow<br>Together</span>
              </div>
              <!-- Orbiting dots -->
              <div class="absolute top-4 left-1/2 w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
              <div class="absolute bottom-4 right-8 w-3 h-3 bg-emerald-400 rounded-full animate-bounce shadow-lg shadow-emerald-400/50"></div>
              <div class="absolute top-1/2 right-2 w-3 h-3 bg-amber-400 rounded-full animate-pulse shadow-lg shadow-amber-400/50"></div>
            </div>
          </div>
        </div>

        <!-- Scroll indicator -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 animate-bounce">
          <span class="text-xs uppercase tracking-widest">Scroll</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>
    </section>
  `
})
export class HeroComponent {
  i18n = inject(I18nService);
}
