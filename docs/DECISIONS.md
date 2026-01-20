# Architecture Decisions

> Record of significant implementation decisions and their rationale.

---

## Stores and Studios: Hardcoded Constants
**Decision:** Store and studio information are hardcoded as TypeScript constants, not fetched from an API or database.
**Rationale:** Only 3 stores and a handful of studios. Data rarely changes. No need for database overhead.
**Date:** 2026-01-20

---

## Quote Form: Gravity Forms Integration
**Decision:** Use existing Gravity Forms on WordPress rather than building a custom quote form.
**Rationale:** Gravity Forms already exists, handles email routing to stores, integrates with Missive/Slack. Not worth rebuilding.
**Implementation:** Embed via iframe or link to WordPress page (TBD based on CEO preference).
**Date:** 2026-01-20

---

## Inventory: Single Catalog (No Location-Specific Inventory)
**Decision:** Show one unified inventory catalog. No filtering by store location.
**Rationale:** Customers don't need location-specific inventory. They browse general catalog and request quotes. Staff handles availability.
**Date:** 2026-01-20

---

## CMS: Headless WordPress for Editable Content
**Decision:** Use WordPress REST API for content that needs to be CMS-editable (blog, FAQs, etc.). Static pages start hardcoded with fallback.
**Rationale:** WordPress already exists for Gravity Forms. Leverage it for content management without rebuilding CMS.
**Date:** 2026-01-20

---

## Frontend-First Development
**Decision:** Build complete frontend with mock data before implementing backend API.
**Rationale:** Faster iteration on UX. Can demo to CEO early. Types defined upfront ensure backend matches frontend needs.
**Date:** 2026-01-20

---

## Inventory URL Structure: Hierarchical Routes
**Decision:** Use hierarchical URL structure `/rental-inventory/[department]/[category]/[product]` instead of flat `/rental-inventory/[id]`.
**Rationale:** 
- Better SEO with descriptive URLs (e.g., `/rental-inventory/camera/camera-bodies/arri-alexa-mini`)
- Clearer navigation and breadcrumbs
- Matches reference sites (Lensrentals, BHPhoto)
- Next.js doesn't allow multiple dynamic route names at the same level, so we can't have both `[id]` and `[department]`
**Alternatives considered:** Flat `/rental-inventory/[id]` was simpler but provided no SEO benefit and less clear URLs.
**Date:** 2026-01-20

---

<!-- Template for new decisions:

## [Short Decision Title]
**Decision:** [What was decided]
**Rationale:** [Why this approach]
**Alternatives considered:** [Optional]
**Date:** YYYY-MM-DD

-->
