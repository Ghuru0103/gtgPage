import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      (click)="toggle()"
      class="p-2 rounded-full transition-all duration-300 hover:scale-110 hover:bg-white/10 focus:outline-none"
      [attr.aria-label]="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      <!-- Sun icon (shown in dark mode) -->
      <svg *ngIf="isDark" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-300 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z"/>
      </svg>
      <!-- Moon icon (shown in light mode) -->
      <svg *ngIf="!isDark" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
      </svg>
    </button>
  `
})
export class ThemeComponent implements OnInit {
  isDark = false;

  ngOnInit(): void {
    const saved = localStorage.getItem('gtg-theme');
    this.isDark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    this.apply();
  }

  toggle(): void {
    this.isDark = !this.isDark;
    localStorage.setItem('gtg-theme', this.isDark ? 'dark' : 'light');
    this.apply();
  }

  private apply(): void {
    if (this.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
