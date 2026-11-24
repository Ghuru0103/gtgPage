# gtgPage

GTG GrowTogether landing page

Angular 20, Tailwind CSS 4, and GSAP 3.15.1.

## Run

```sh
npm ci
npm start
```

Open http://localhost:4200. Build for deployment with `npm run build`; output is `dist/gtg-landing/browser`.

## Content and configuration

- `src/app/app.html`: landing page, FAQ, and call-to-book demo links.
- `src/app/prototype-data.ts`: ten interactive prototype views and sample records.
- `src/app/app.ts`: prototype state, search, details, navigation, and GSAP lifecycle.
- `src/styles.css`: shared design tokens, responsive styles, and reduced-motion behavior.
- `src/index.html`: page title and search description.

Demo calls use +91 63794 83906, +91 99442 86342, and +91 99948 78343. There is no enquiry backend, email destination, or online appointment system. Add email only once the owner supplies the real address. The prototype uses read-only sample data; AI and WhatsApp views illustrate workflows and do not send messages or contact external services.

Typography uses Georgia and Arial system stacks for the approved Claude-inspired serif/sans direction, not proprietary Claude font files. The approved brand palette uses midnight navy, emerald, blue, and amber. The original supplied logo is preserved in `src/assets/gtg-brand.png`, with the tree emblem framed through CSS. GSAP cursor-build sequences in `src/app/page-assembly.ts` draw selection frames, dimensions, and named cursors across the page: each section starts automatically on load or refresh, with a short stagger and three workers assembling individual text blocks, buttons, cards, chart bars, and table rows. Text uses character geometry for a stepped line-by-line reveal without replacing the accessible text or Angular bindings. Lower sections do not wait for scrolling. The fixed controls skip or replay the page build. Keyboard focus finishes its section immediately; Escape skips all remaining builds. Reduced-motion preferences disable the sequences. The source PNG is approximately 4.9 MB; a smaller official vector logo would reduce first-load image transfer.

The old component files remain unmounted as reference; the current page is rendered by `App`.

## English and Tamil

The header language icon sits immediately after the demo button. It switches all landing-page copy, interface labels, prototype statuses, FAQs, and orbital module names between English and Tamil. Brand names, sample business names, record IDs, and phone numbers remain unchanged. The selection is stored under `gtg-language`; switching still works when browser storage is unavailable. The document language and page title update as well.

`src/app/services/tamil.ts` contains the current phrase translations; `TranslatePipe` and `I18nService` share the selected language. Prototype search matches both original and translated values. Language switching finishes pending page-build animations to avoid stale text geometry; replay uses grapheme-aware text reveals for Tamil.

The full-page cursor build has a three-second total budget (including section offsets, setup, and fade-outs), shared across English and Tamil and reapplied on replay. A deadline clears unfinished cursor work. The dashboard cursor replay is also capped below three seconds; the independent solar-system animation keeps its own pause controls.

## Illustrative growth scenario

The prototype depicts fictional Kaveri Wholesale, not a customer case study. November example sales are ₹1,28,40,000, purchases ₹86,40,000, receipts ₹1,18,60,000, and receivables ₹9,80,000. Receipts plus receivables equal sales; purchases are not presented as cost of goods sold or profit. The six-month sales chart is in lakhs and ends at 128.4 lakh. Table rows are selected examples, not a full transaction ledger.

The 80-hour illustration is calculated from 1,200 orders × (6 assumed manual minutes − 2 assumed connected-workflow minutes) ÷ 60. It is labelled as a hypothetical scenario, not measured savings or a revenue guarantee. `DEMO_BUSINESS` in `prototype-data.ts` owns these assumptions. The bilingual “Why choose GTG” section connects product capabilities to operational benefits without unsupported customer results.
