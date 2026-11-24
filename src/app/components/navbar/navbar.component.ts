import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeComponent } from '../theme/theme.component';
import { LangComponent } from '../lang/lang.component';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ThemeComponent, LangComponent],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300
                bg-white/80 dark:bg-gray-900/80 backdrop-blur-md
                border-b border-gray-200/50 dark:border-white/10 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">

          <!-- Logo -->
          <a href="#home" class="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
            <img src="assets/logo.jpg" alt="GTG Logo"
                 class="h-10 w-10 rounded-full object-cover ring-2 ring-blue-500/50">
            <span class="text-xl font-extrabold gradient-text hidden sm:block">GrowTogether</span>
          </a>

          <!-- Desktop Nav Links -->
          <div class="hidden md:flex items-center gap-6">
            <a *ngFor="let link of navLinks"
               [href]="link.href"
               class="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400
                      font-medium transition-all duration-200 hover:scale-105 relative group">
              {{ i18n.t(link.key) }}
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>

          <!-- Controls -->
          <div class="flex items-center gap-3">
            <app-theme></app-theme>
            <app-lang></app-lang>
            <!-- Hamburger -->
            <button class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-200"
                    (click)="menuOpen.set(!menuOpen())">
              <div class="w-6 h-0.5 bg-gray-700 dark:bg-gray-200 transition-all duration-300"
                   [class.rotate-45]="menuOpen()" [class.translate-y-1.5]="menuOpen()"></div>
              <div class="w-6 h-0.5 bg-gray-700 dark:bg-gray-200 my-1.5 transition-all duration-300"
                   [class.opacity-0]="menuOpen()"></div>
              <div class="w-6 h-0.5 bg-gray-700 dark:bg-gray-200 transition-all duration-300"
                   [class.-rotate-45]="menuOpen()" [class.-translate-y-1.5]="menuOpen()"></div>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div class="md:hidden overflow-hidden transition-all duration-300"
             [class.max-h-0]="!menuOpen()"
             [class.max-h-64]="menuOpen()">
          <div class="py-3 flex flex-col gap-2 border-t border-gray-200/50 dark:border-white/10">
            <a *ngFor="let link of navLinks"
               [href]="link.href"
               (click)="menuOpen.set(false)"
               class="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200
                      hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600
                      font-medium transition-all duration-200">
              {{ i18n.t(link.key) }}
            </a>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  i18n = inject(I18nService);
  menuOpen = signal(false);

  navLinks = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.contact', href: '#contact' },
  ];
}
