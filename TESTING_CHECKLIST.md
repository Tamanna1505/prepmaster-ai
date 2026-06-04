# PrepMaster AI — Testing Checklist

Manual QA checklist for the PrepMaster AI prototype. Because this build runs on **sample/static data**, testing focuses on UI correctness, navigation, interaction, responsiveness, and visual consistency — not on persistence or real auth.

**How to run:** `npm run dev`, then open `http://localhost:3000`.
**Automated gate:** `npm run lint` (clean) and `npm run build` (succeeds) should both pass before manual QA.

Legend: `[ ]` = to verify · `[x]` = verified

---

## 1. Public Website

- [ ] `/` — hero, stats, featured courses, mock-test preview, AI-analytics section, pattern band, testimonials, pricing, FAQ, final CTA, footer all render.
- [ ] Navbar links (Courses, Mock tests, Study material, Blog, Pricing) navigate correctly.
- [ ] Navbar "Log in" and "Start free trial" go to `/login` and `/register`.
- [ ] Mobile: hamburger opens the nav drawer; links close it on tap.
- [ ] `/courses` — filter chips (All / exam), search, and sort update the grid; cards link to course detail.
- [ ] `/courses/[slug]` — hero, syllabus accordion, sticky enroll card, outcomes render; back link works.
- [ ] `/mock-tests` — exam/type/difficulty filters work; cards show duration, questions, marks, difficulty, attempts.
- [ ] `/study-material` — resource grid grouped by subject renders.
- [ ] `/blog` — featured post + category chips + grid; cards link to posts.
- [ ] `/blog/[slug]` — reading column, cover, pull-quote, tags, related posts render.
- [ ] `/pricing` — three tiers (Pro featured), FAQ accordion, final CTA.
- [ ] `/contact` — form fields + supporting info render; submit shows the "visual only" note.
- [ ] `/login` — email, password, remember-me, forgot link, demo credentials, register link.
- [ ] `/register` — name, email, phone, password, confirm, target-exam select, login link.
- [ ] `/privacy` and `/terms` — render with the sample-policy note (no 404 from the footer/register links).
- [ ] FAQ accordions expand/collapse.

---

## 2. Student Dashboard

- [ ] Sidebar shows all student links; active link is highlighted; logout pill is visible (visual only).
- [ ] `/dashboard` — welcome, summary stats, continue-learning, performance preview, recent results, weak areas, AI recommendation, recommended courses.
- [ ] `/dashboard/courses` — continue CTA, search + exam/status filters, progress cards, recommendations.
- [ ] `/dashboard/courses/[courseId]` — hero, progress ring, module accordion (lesson statuses: completed / in-progress / available / locked), outcomes.
- [ ] `/dashboard/lessons/[lessonId]` — player card, notes, PDF resource, prev/next, **mark-complete toggles**, sidebar contents, AI study tip.
- [ ] `/dashboard/tests` — Available / In-progress / Completed tabs; exam/type/difficulty filters; status badges; Start / Resume / View-result CTAs.
- [ ] `/dashboard/tests/[testId]` — instructions, marking scheme, sections, rules; Start test + Back buttons.
- [ ] `/dashboard/results` — improvement summary card, search + exam/trend filters, attempt cards, View-analysis links.
- [ ] `/dashboard/results/[attemptId]` — premium summary, CTAs (Retake / Practice weak topics / View analytics), AI feedback, section + topic breakdown, recommended practice, question review.
- [ ] `/dashboard/analytics` — performance summary, AI mentor panel, score + accuracy trend charts, section chart, time management, strengths/weaknesses, topic weakness, recommendations.
- [ ] `/dashboard/profile` — identity card, account form, password form (visual only).
- [ ] Mobile: sidebar collapses to a top-bar hamburger drawer; content reflows to one column.

---

## 3. Admin Dashboard

- [ ] `/admin` — welcome header, 6 summary stat cards, 4 quick actions (→ the `/new` routes), content-health section, recent users + recent attempts tables.
- [ ] `/admin/courses` — search + exam/level/status filters; columns (title, exam, level, lessons, enrolled, price, status); Edit / Publish-toggle / Delete (visual).
- [ ] `/admin/courses/new` and `/[id]/edit` — course form + module/lesson builder (add/remove, kind toggle, duration); published toggle; Save draft / Publish.
- [ ] `/admin/questions` — section/type/level filters + search; columns incl. marks.
- [ ] `/admin/questions/new` and `/[id]/edit` — **switching question type** swaps the answer UI (radio / checkbox / numeric); classification fields; Save / Add.
- [ ] `/admin/tests` — exam/type/status filters; status badges; Publish-toggle; Edit / Delete.
- [ ] `/admin/tests/new` and `/[id]/edit` — details, published toggle, **section builder + question selection** with per-section count/marks.
- [ ] `/admin/blog` — category/status filters; featured star; Publish-toggle; Edit / Delete.
- [ ] `/admin/blog/new` and `/[id]/edit` — details, editor-style content area + toolbar, featured-image preview, SEO fields, publish + featured toggles.
- [ ] `/admin/users` — role/status/exam filters + search; full columns; **View** opens the user detail slide-over; close works.
- [ ] All tables scroll horizontally on small screens; filter bars stack.
- [ ] Status badges are consistent across tables (Published/Draft, Active/Inactive, role, difficulty).

---

## 4. Mock-Test Flow (critical path)

- [ ] From `/dashboard/tests`, open a test → instructions → **Start test**.
- [ ] Timer starts and counts down; it shifts teal → orange (≤5 min) → red (≤1 min) on a short test.
- [ ] Selecting an answer (radio for single, checkboxes for multi, input for numeric) updates the palette to "answered".
- [ ] **Save & Next** and **Previous** navigate between questions; visited-but-empty questions show "not answered".
- [ ] **Mark for review** flags a question; the palette shows the marked color.
- [ ] **Clear response** empties the current answer.
- [ ] Clicking a palette number jumps to that question; section tabs jump to the section's first question.
- [ ] **Submit** opens the confirmation modal showing answered / not-answered / marked counts.
- [ ] Confirming submit navigates to the sample result detail page.
- [ ] Letting the timer reach 0 auto-submits.
- [ ] Mobile: the palette opens as a bottom sheet via the "Palette" button.

---

## 5. Responsiveness

- [ ] Mobile (≤640px): single-column layouts; hamburger nav; stacked hero; pricing/cards stack.
- [ ] Tablet (640–1024px): 2-column course/blog grids; readable tables.
- [ ] Desktop (≥1024px): full multi-column layouts; dashboard/admin sidebars visible.
- [ ] No horizontal page overflow on any breakpoint (tables scroll within their own container).
- [ ] Test-attempt interface is usable on mobile, tablet, and desktop.

---

## 6. Browser Testing

- [ ] Chrome (desktop + mobile emulation)
- [ ] Safari (desktop + iOS)
- [ ] Firefox
- [ ] Edge
- [ ] Charts (Recharts) render after hydration in each browser.
- [ ] Fonts load (Newsreader / Hanken Grotesk / Spline Sans Mono); no flash of wrong family.

---

## 7. Visual & Content Consistency

- [ ] Brand name is always exactly **PrepMaster AI**.
- [ ] Spelling uses **Practice** (American), not "Practise".
- [ ] No "lorem ipsum" or obviously unfinished placeholder text.
- [ ] Teal is used only for analytics / charts / progress / status / AI insights.
- [ ] CTAs use ink/orange/gold; text uses ink/cocoa/taupe; surfaces are cream/white.
- [ ] Focus ring (2px teal) is visible when tabbing through interactive elements.

---

## 8. Known Limitations (expected, not bugs)

- Forms do not persist — submitting shows a "visual only" note; data resets on reload.
- Login/register do not authenticate; `/dashboard` and `/admin` are directly reachable.
- AI feedback is templated from sample analytics — no live AI call.
- Publish/unpublish/delete in admin update local state only.
- Images are branded placeholder blocks; image URLs are illustrative.
- `sitemap.xml` / `robots.txt` / per-route OpenGraph are not yet generated.
