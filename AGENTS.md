# GTG GrowTogether working instructions

## Task preparation
For a new task, clarify the task, expected output, and material constraints when missing. Skip this for clear small requests. Restate the intended result before working.

## Plans and approval
Implement requested design and UI changes directly without asking for approval, including layout, branding, colors, typography, animations, responsiveness, and frontend interactions. Briefly explain the approach when useful, then proceed with implementation and verification. Do not introduce an approval checkpoint for design plans, mockups, or design scope refinements.

Require implementation approval only for database changes or large API work:
- Database changes include schema changes, migrations, and changes to stored data.
- Large API work includes new backend subsystems, substantial endpoint or integration changes, breaking API contracts, and major authentication or authorization changes.

For those tasks, inspect the existing implementation and prepare a concrete plan with impact and tradeoffs, then obtain approval before making the changes. Once approved, complete the agreed scope without requesting the same approval again. Routine small API fixes do not require an additional approval checkpoint.

Ask focused clarification questions only when required information is missing; clarification is not a design approval gate. Never commit or push unless explicitly requested.

This policy supersedes earlier instructions requiring approval before design or general implementation work.

## Approved landing-page scope — 24 November 2026
The user approved implementation of the reviewed redesign: modern, simple, spacious, responsive GTG GrowTogether landing page; Claude-inspired typography; an interactive prototype with ten primary business views; a UX Pilot-inspired cursor assembly animation; demo contact using 6379483906 and 9944286342. Email is to be supplied later. This approval supersedes an additional layout-approval checkpoint for this task.

Prefer GSAP for purposeful animation, with Tailwind/CSS for styling. Use an available supported GSAP version (not a fictional version), honor reduced-motion preferences, preserve native pointer and keyboard access, and clean up animations on component destruction.

Prototype data must be labelled as sample data. Do not invent customer testimonials, adoption numbers, booking confirmations, backend persistence, or live AI integrations. Contact actions must work with the provided phone numbers. Keep dependencies and production checks appropriate to the project.

## Approved brand refinement
The user subsequently approved the supplied GrowTogether tree logo, midnight navy/emerald/blue/amber palette, and cursor-build animations across the full landing page on load/refresh and as lower sections enter view. Implement within this approved scope without another design confirmation. Preserve the supplied artwork and keep native pointer, keyboard access, Escape/skip, and reduced-motion support.

## Approved element-by-element entrance
The user approved replacing scroll-triggered section reveals with a full-page, load-driven element-by-element cursor build. Every section starts in a staggered sequence on initialization/refresh, including content below the viewport. Use typed text, dragged frames, guides, and separate builds for buttons, cards, charts, and rows. Preserve skip, replay, focus access, reduced motion, and cleanup.
