import { TAMIL } from './tamil';
import { Injectable, signal } from '@angular/core';

export type Lang = 'en' | 'ta';

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    // Hero
    'hero.tagline': 'Grow Together',
    'hero.subtitle': 'Evolving Businesses to the Next Level',
    'hero.description':
      'We partner with Saloons, Event Planners, Tuition Centres, Marriage Halls, Restaurants, and Retailers to help them grow smarter and faster.',
    'hero.cta.start': 'Get Started',
    'hero.cta.learn': 'Learn More',
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Tailored solutions for every business type',
    'services.saloon.title': 'Saloon',
    'services.saloon.desc': 'Digital tools for modern saloons — bookings, loyalty, and growth.',
    'services.events.title': 'Events',
    'services.events.desc': 'End-to-end event management and promotion solutions.',
    'services.tuition.title': 'Tuition Centres',
    'services.tuition.desc': 'Student management, fee tracking, and digital classrooms.',
    'services.marriage.title': 'Marriage Hall',
    'services.marriage.desc': 'Hall bookings, vendor coordination, and guest management.',
    'services.restaurant.title': 'Restaurants',
    'services.restaurant.desc': 'Online ordering, table management, and digital menus.',
    'services.retail.title': 'Retail',
    'services.retail.desc': 'Inventory, POS, and customer engagement for retail shops.',
    // Stats
    'stats.businesses': 'Businesses',
    'stats.customers': 'Customers',
    'stats.cities': 'Cities',
    'stats.years': 'Years',
    // Testimonials
    'testimonials.title': 'What Our Clients Say',
    'testimonials.subtitle': 'Trusted by businesses across Tamil Nadu',
    // CTA
    'cta.title': 'Ready to Grow Together?',
    'cta.subtitle': 'Join hundreds of businesses already growing with GTG.',
    'cta.placeholder': 'Enter your email',
    'cta.button': 'Get Started Today',
    // Footer
    'footer.tagline': 'Evolving Businesses to the Next Level',
    'footer.links': 'Quick Links',
    'footer.contact': 'Contact Us',
    'footer.made': 'Made with ❤️ in Tamil Nadu',
    'footer.copyright': '© 2024 GrowTogether. All rights reserved.',
    // Lang toggle
    'lang.switch': 'தமிழ்',
  },
  ta: {
    // Navbar
    'nav.home': 'முகப்பு',
    'nav.services': 'சேவைகள்',
    'nav.about': 'எங்களை பற்றி',
    'nav.contact': 'தொடர்பு',
    // Hero
    'hero.tagline': 'ஒன்றாக வளர்வோம்',
    'hero.subtitle': 'வணிகங்களை அடுத்த நிலைக்கு உயர்த்துகிறோம்',
    'hero.description':
      'சலூன்கள், நிகழ்வு திட்டமிடுபவர்கள், ட்யூஷன் மையங்கள், திருமண மண்டபங்கள், உணவகங்கள் மற்றும் சில்லறை வியாபாரிகளுடன் நாங்கள் கூட்டாளிகளாக வேலை செய்கிறோம்.',
    'hero.cta.start': 'தொடங்குங்கள்',
    'hero.cta.learn': 'மேலும் அறிக',
    // Services
    'services.title': 'எங்கள் சேவைகள்',
    'services.subtitle': 'ஒவ்வொரு வணிக வகைக்கும் தனிப்பயன் தீர்வுகள்',
    'services.saloon.title': 'சலூன்',
    'services.saloon.desc': 'நவீன சலூன்களுக்கு டிஜிட்டல் கருவிகள் — முன்பதிவு, விசுவாசம் மற்றும் வளர்ச்சி.',
    'services.events.title': 'நிகழ்வுகள்',
    'services.events.desc': 'முழுமையான நிகழ்வு மேலாண்மை மற்றும் விளம்பர தீர்வுகள்.',
    'services.tuition.title': 'ட்யூஷன் மையங்கள்',
    'services.tuition.desc': 'மாணவர் மேலாண்மை, கட்டண கண்காணிப்பு மற்றும் டிஜிட்டல் வகுப்பறைகள்.',
    'services.marriage.title': 'திருமண மண்டபம்',
    'services.marriage.desc': 'மண்டப முன்பதிவு, விற்பனையாளர் ஒருங்கிணைப்பு மற்றும் விருந்தினர் மேலாண்மை.',
    'services.restaurant.title': 'உணவகங்கள்',
    'services.restaurant.desc': 'ஆன்லைன் ஆர்டர், மேசை மேலாண்மை மற்றும் டிஜிட்டல் மெனு.',
    'services.retail.title': 'சில்லறை வியாபாரம்',
    'services.retail.desc': 'சரக்கு, POS மற்றும் வாடிக்கையாளர் ஈடுபாடு.',
    // Stats
    'stats.businesses': 'வணிகங்கள்',
    'stats.customers': 'வாடிக்கையாளர்கள்',
    'stats.cities': 'நகரங்கள்',
    'stats.years': 'ஆண்டுகள்',
    // Testimonials
    'testimonials.title': 'எங்கள் வாடிக்கையாளர்கள் சொல்வது',
    'testimonials.subtitle': 'தமிழ்நாடு முழுவதும் நம்பகமான வணிகங்கள்',
    // CTA
    'cta.title': 'ஒன்றாக வளர தயாரா?',
    'cta.subtitle': 'GTG-யுடன் ஏற்கனவே வளரும் நூற்றுக்கணக்கான வணிகங்களுடன் சேருங்கள்.',
    'cta.placeholder': 'உங்கள் மின்னஞ்சலை உள்ளிடுங்கள்',
    'cta.button': 'இன்றே தொடங்குங்கள்',
    // Footer
    'footer.tagline': 'வணிகங்களை அடுத்த நிலைக்கு உயர்த்துகிறோம்',
    'footer.links': 'விரைவு இணைப்புகள்',
    'footer.contact': 'தொடர்பு கொள்ளுங்கள்',
    'footer.made': 'தமிழ்நாட்டில் ❤️-உடன் உருவாக்கப்பட்டது',
    'footer.copyright': '© 2024 GrowTogether. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    // Lang toggle
    'lang.switch': 'English',
  },
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  currentLang = signal<Lang>('en');

  constructor() {
    let language: Lang = 'en';
    try { if (localStorage.getItem('gtg-language') === 'ta') language = 'ta'; } catch { /* Storage may be blocked. */ }
    this.setLanguage(language);
  }

  t(key: string): string {
    if (this.currentLang() === 'en') return translations.en[key] ?? key;
    const normalized = key.replace(/\s+/g, ' ').trim();
    if (TAMIL[normalized]) return TAMIL[normalized];
    const units = normalized.match(/^(\d+) units$/);
    if (units) return `${units[1]} அலகுகள்`;
    return translations.ta[key] ?? key;
  }

  setLanguage(language: Lang): void {
    this.currentLang.set(language);
    document.documentElement.lang = language;
    document.title = language === 'ta' ? 'GTG GrowTogether | இணைந்து வளரும் உங்கள் வணிகம்' : 'GTG GrowTogether | Your business, working together';
    try { localStorage.setItem('gtg-language', language); } catch { /* Switching still works without persistence. */ }
  }

  toggle(): void { this.setLanguage(this.currentLang() === 'en' ? 'ta' : 'en'); }
}
