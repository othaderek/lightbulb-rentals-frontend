# Blockers & Open Questions

> Track items waiting on external input or needing clarification.

---

## Conflicting Dynamic Routes in rental-inventory
**Status:** Resolved
**Waiting on:** Technical investigation
**Description:** Next.js threw error "You cannot use different slug names for the same dynamic path ('department' !== 'id')". This occurred because two dynamic routes existed at the same level: `/rental-inventory/[id]/page.tsx` (old) and `/rental-inventory/[department]/page.tsx` (new).
**Impact:** Internal server error, app would not load inventory pages.
**Added:** 2026-01-20
**Resolved:** 2026-01-20
**Resolution:** Deleted the old `/rental-inventory/[id]/page.tsx` route. The new route structure is `/rental-inventory/[department]/[category]/[product]` which provides better SEO and clearer URLs.

---

## Studio Photos and Specs
**Status:** Open
**Waiting on:** CEO
**Description:** Need actual studio photos, floor plans, dimensions, rates, and features for each studio space.
**Impact:** Cannot complete `app/studios/` pages without this content.
**Added:** 2026-01-20

---

## Gravity Forms Embed Method
**Status:** Open
**Waiting on:** CEO
**Description:** Need to decide whether to embed Gravity Forms via iframe or link to WordPress page. Need the form URL/embed code.
**Impact:** Cannot complete `app/quote/page.tsx` without this.
**Added:** 2026-01-20

---

## FAQ Content
**Status:** Open
**Waiting on:** CEO
**Description:** Need actual FAQ questions and answers for the FAQ page.
**Impact:** Can build accordion component but need real content.
**Added:** 2026-01-20

---

## Values Page Copy
**Status:** Open
**Waiting on:** CEO
**Description:** Need final copy for the Values page covering LGBTQIA+ support, diversity commitment, passion project discounts.
**Impact:** Cannot complete `app/values/page.tsx` without this.
**Added:** 2026-01-20

---

## About Page Content
**Status:** Open
**Waiting on:** CEO
**Description:** Need company story, team photos (with names/titles).
**Impact:** Cannot complete `app/about/page.tsx` without this.
**Added:** 2026-01-20

---

## Quote Response Time Promise
**Status:** Open
**Waiting on:** CEO
**Description:** What response time should we promise on quote confirmation? (e.g., "within 4 business hours")
**Impact:** Needed for quote confirmation messaging.
**Added:** 2026-01-20

---

## Default Product Sort Order
**Status:** Open
**Waiting on:** CEO
**Description:** CEO mentioned wanting custom default sort logic. Need clarification on what this should be.
**Current assumption:** Alphabetical by name (A-Z).
**Added:** 2026-01-20

---

<!-- Template for new blockers:

## [Blocker Title]
**Status:** Open | Resolved
**Waiting on:** [CEO / External / Technical investigation]
**Description:** [Details]
**Impact:** [What can't be completed without this]
**Added:** YYYY-MM-DD
**Resolved:** YYYY-MM-DD (if resolved)
**Resolution:** [How it was resolved] (if resolved)

-->
