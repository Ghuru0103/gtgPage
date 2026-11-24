import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-lang',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      (click)="i18n.toggle()"
      class="px-3 py-1 rounded-full text-sm font-semibold border border-blue-500 text-blue-500
             dark:border-blue-400 dark:text-blue-400 hover:bg-blue-500 hover:text-white
             dark:hover:bg-blue-400 dark:hover:text-gray-900
             transition-all duration-300 hover:scale-105"
    >
      {{ i18n.t('lang.switch') }}
    </button>
  `
})
export class LangComponent {
  i18n = inject(I18nService);
}
