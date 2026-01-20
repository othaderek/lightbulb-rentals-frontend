# CLAUDE.md - Lightbulb Rentals Implementation Plan

> **Building on existing Next.js wireframe.** Stores and studios are hardcoded. Inventory comes from API. Quotes go through existing Gravity Forms.

---

## Project Context

**What exists:**
- Next.js 14+ frontend wireframe deployed on Vercel
- WordPress with Gravity Forms (for quotes)
- Current RMS with weekly CSV exports

**What we're building:**
- Inventory browsing with real product data
- Fuzzy search with autocomplete
- Integration with existing Gravity Forms
- Headless WordPress for CMS-editable content

**What's hardcoded (static in frontend):**
- Store information (3 locations)
- Studio information
- Department definitions
- Static page content (About, Values, FAQ, etc.)

---

## Architecture

```
Next.js Frontend
├── Static Data (hardcoded)
│   ├── Stores (NYC, Philly, Pittsburgh)
│   ├── Studios
│   └── Departments
│
├── Dynamic Data (from .NET API)
│   ├── Products
│   ├── Categories/Subcategories
│   └── Search
│
├── CMS Content (from WordPress REST API)
│   ├── Blog posts
│   ├── FAQ content
│   └── Editable page sections
│
└── Quote Form
    └── Gravity Forms (embed or link)
```

---

# PHASE 1: FRONTEND

## 1.0 Testing Setup

### 1.0.1 Jest Configuration

- [ ] Install dependencies:
  ```bash
  npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
  ```

- [ ] Create `jest.config.js`:
  ```javascript
  const nextJest = require('next/jest')
  
  const createJestConfig = nextJest({
    dir: './',
  })
  
  const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
  }
  
  module.exports = createJestConfig(customJestConfig)
  ```

- [ ] Create `jest.setup.js`:
  ```javascript
  import '@testing-library/jest-dom'
  ```

- [ ] Update `package.json` scripts:
  ```json
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
  ```

### 1.0.2 Mock Setup

- [ ] Create `__mocks__/next/navigation.ts` for Next.js router mocks
- [ ] Create `__mocks__/lib/api/client.ts` for API client mocks
- [ ] Set up global test utilities in `__tests__/utils.tsx`

---

## 1.1 Static Data Setup

### 1.1.1 Stores

Create `lib/data/stores.ts`:

- [ ] Define store constants:

```typescript
export const STORES = [
  {
    code: 'NYC',
    name: 'Lightbulb Rentals New York',
    shortName: 'New York',
    address: '1027 Grand Street – Unit #133',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11211',
    phone: '(516) 515-1514',
    email: 'info@lightbulbrentals.com',
    hours: 'Mon-Fri 9 AM-5 PM',
  },
  {
    code: 'PHL',
    name: 'Lightbulb Rentals Philadelphia',
    shortName: 'Philadelphia',
    address: '4562 Worth Street',
    city: 'Philadelphia',
    state: 'PA',
    zip: '19124',
    phone: '(215) 687-9394',
    email: 'info@lightbulbrentals.com',
    hours: 'Mon-Fri 9 AM-5 PM',
  },
  {
    code: 'PGH',
    name: 'Lightbulb Rentals Pittsburgh',
    shortName: 'Pittsburgh',
    address: '1917 Brownsville Road',
    city: 'Pittsburgh',
    state: 'PA',
    zip: '15210',
    phone: '(412) 212-0822',
    email: 'info@lightbulbrentals.com',
    hours: 'Mon-Fri 9 AM-5 PM',
  },
] as const;
```

### 1.1.2 Studios

Create `lib/data/studios.ts`:

- [ ] Define studio constants (get real data from CEO):

```typescript
export const STUDIOS = [
  {
    slug: 'studio-a-philly',
    name: 'Studio A',
    storeCode: 'PHL',
    heroImage: '/images/studios/philly-a.jpg',
    images: ['/images/studios/philly-a-1.jpg', '/images/studios/philly-a-2.jpg'],
    floorPlan: '/images/studios/philly-a-floorplan.jpg',
    sqft: 2400,
    ceilingHeight: "14'",
    dimensions: "40' x 60'",
    description: 'Large studio with 3-wall cyc.',
    features: ['3-wall cyc', 'Lighting grid', 'Green room'],
    equipmentIncluded: ['Basic lighting kit', 'C-stands', 'Apple boxes'],
    rates: [
      { period: 'Full Day', price: '$800' },
      { period: 'Half Day', price: '$500' },
    ],
  },
  // Add more from CEO
] as const;

export const getStudio = (slug: string) => STUDIOS.find(s => s.slug === slug);
export const getStudiosByStore = (code: string) => STUDIOS.filter(s => s.storeCode === code);
```

### 1.1.3 Departments

Create `lib/data/departments.ts`:

- [ ] Define 6 departments:

```typescript
export const DEPARTMENTS = [
  { id: 1, name: 'Camera', slug: 'camera', description: 'Cinema cameras, lenses, and support' },
  { id: 2, name: 'Lighting', slug: 'lighting', description: 'LEDs, HMIs, tungsten, and modifiers' },
  { id: 3, name: 'Grip', slug: 'grip', description: 'Stands, clamps, rigging, and equipment' },
  { id: 4, name: 'Audio', slug: 'audio', description: 'Microphones, recorders, and wireless' },
  { id: 5, name: 'Photo', slug: 'photo', description: 'Strobes and photo lighting' },
  { id: 6, name: 'Production Supplies', slug: 'production-supplies', description: 'Expendables, cables, and supplies' },
] as const;

export const getDepartment = (slug: string) => DEPARTMENTS.find(d => d.slug === slug);
```

### 1.1.4 Tests

- [ ] `__tests__/lib/data/stores.test.ts`:
  - Test store lookup by code
  - Validate all stores have required fields (code, name, phone, address)
  - Test store constants structure

- [ ] `__tests__/lib/data/studios.test.ts`:
  - Test `getStudio(slug)` returns correct studio
  - Test `getStudiosByStore(code)` filters correctly
  - Validate studio data structure (slug, name, storeCode, rates)

- [ ] `__tests__/lib/data/departments.test.ts`:
  - Test `getDepartment(slug)` returns correct department
  - Validate all departments have required fields
  - Test department slug uniqueness

---

## 1.2 TypeScript Types

Create `types/index.ts`:

- [ ] Define types for API responses:

```typescript
// From API
export interface Category {
  id: number;
  name: string;
  slug: string;
  departmentSlug: string;
  productCount: number;
}

export interface Subcategory {
  id: number;
  name: string;
  slug: string;
  categorySlug: string;
  productCount: number;
}

export interface ProductListItem {
  id: number;
  name: string;
  slug: string;
  imageUrl?: string;
  dailyRate?: number;
  productGroupName: string;
  departmentSlug: string;
  categorySlug: string;
}

export interface ProductDetail {
  id: number;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  dailyRate?: number;
  productGroupName: string;
  departmentSlug: string;
  categorySlug: string;
  subcategorySlug?: string;
  includedAccessories: {
    name: string;
    quantity: number;
    imageUrl?: string;
  }[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface SearchSuggestion {
  term: string;
  type: 'product' | 'category';
  slug: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
```

---

## 1.3 API Client

Create `lib/api/`:

- [ ] `client.ts` - Base fetch wrapper
- [ ] `products.ts` - getProducts, getProduct
- [ ] `categories.ts` - getCategories, getSubcategories
- [ ] `search.ts` - getSuggestions

Use mock data when `NEXT_PUBLIC_API_URL` is not set.

### 1.3.1 Tests

- [ ] `__tests__/lib/api/client.test.ts`:
  - Test fetch wrapper handles successful responses
  - Test error handling (network errors, 404, 500)
  - Test fallback to mock data when API URL not set
  - Test request timeout handling

- [ ] `__tests__/lib/api/products.test.ts`:
  - Test `getProducts()` with filters
  - Test `getProduct(slug)` returns product detail
  - Test pagination parameters
  - Test error states (product not found)

- [ ] `__tests__/lib/api/categories.test.ts`:
  - Test `getCategories(departmentSlug)` returns categories
  - Test `getSubcategories(categorySlug)` returns subcategories
  - Test empty results handling

- [ ] `__tests__/lib/api/search.test.ts`:
  - Test `getSuggestions(query)` returns suggestions
  - Test empty query handling
  - Test suggestion type filtering (product vs category)

---

## 1.4 Mock Data

Create `lib/mock-data/`:

- [ ] `products.ts` - 20-30 sample products
- [ ] `categories.ts` - Categories per department

Pull sample names from your actual CSV data for realism.

---

## 1.5 Inventory Pages

### 1.5.1 Inventory Index

- [ ] `app/rental-inventory/page.tsx`:
  - Grid of 6 department cards (from DEPARTMENTS)
  - Links to `/rental-inventory/[department]`

### 1.5.2 Department Page

- [ ] `app/rental-inventory/[department]/page.tsx`:
  - Category filter chips
  - Product grid
  - Pagination
  - Sort (Name A-Z / Z-A)
  - Breadcrumb

### 1.5.3 Category Page

- [ ] `app/rental-inventory/[department]/[category]/page.tsx`:
  - Subcategory filter chips
  - Product grid
  - Pagination
  - Breadcrumb

### 1.5.4 Product Detail

- [ ] `app/rental-inventory/[department]/[category]/[product]/page.tsx`:
  - Images
  - Name, description
  - Daily rate (hide if no rate)
  - **Included Accessories**
  - "Get a Quote" button
  - Store contact info (all 3 stores)
  - Breadcrumb

### 1.5.5 Components

- [ ] `components/inventory/ProductGrid.tsx`
- [ ] `components/inventory/ProductCard.tsx`
- [ ] `components/inventory/Pagination.tsx`
- [ ] `components/inventory/CategoryChips.tsx`
- [ ] `components/inventory/IncludedAccessories.tsx`
- [ ] `components/inventory/Breadcrumb.tsx`

### 1.5.6 Tests

- [ ] `__tests__/app/rental-inventory/page.test.tsx`:
  - Test renders all 6 department cards
  - Test department cards link to correct URLs
  - Test page title and metadata

- [ ] `__tests__/app/rental-inventory/[department]/page.test.tsx`:
  - Test renders product grid with products
  - Test category filter chips update URL
  - Test pagination updates URL and fetches correct page
  - Test sort functionality (A-Z / Z-A)
  - Test breadcrumb displays correctly

- [ ] `__tests__/app/rental-inventory/[department]/[category]/page.test.tsx`:
  - Test renders subcategory filter chips
  - Test product grid displays filtered products
  - Test pagination works with category filter
  - Test breadcrumb includes category

- [ ] `__tests__/app/rental-inventory/[department]/[category]/[product]/page.test.tsx`:
  - Test displays product name, description, image
  - Test daily rate displays (or hides if no rate)
  - Test included accessories section renders
  - Test "Get a Quote" button links correctly
  - Test store contact info displays for all 3 stores
  - Test breadcrumb navigation

- [ ] `__tests__/components/inventory/ProductCard.test.tsx`:
  - Test renders product name and rates
  - Test click navigates to product detail page
  - Test displays "Request a Quote" when rate is 0

- [ ] `__tests__/components/inventory/ProductGrid.test.tsx`:
  - Test renders correct number of products
  - Test empty state when no products
  - Test loading state

- [ ] `__tests__/components/inventory/Pagination.test.tsx`:
  - Test page number buttons update current page
  - Test Previous/Next buttons disabled at boundaries
  - Test ellipsis display for many pages
  - Test page change triggers URL update

---

## 1.6 Search

- [ ] `components/search/SearchBar.tsx`:
  - Debounced input
  - Dropdown suggestions
  - Keyboard navigation
  - Submit → search results

- [ ] Search results: Use `/rental-inventory?q=...` query param or dedicated page

- [ ] Add SearchBar to header

### 1.6.1 Tests

- [ ] `__tests__/components/search/SearchBar.test.tsx`:
  - Test input debouncing (waits before triggering suggestions)
  - Test dropdown suggestions appear on input
  - Test keyboard navigation (arrow keys, Enter, Escape)
  - Test clicking suggestion navigates to correct page
  - Test Enter key submits search
  - Test empty query handling

- [ ] `__tests__/app/rental-inventory/page.test.tsx` (search integration):
  - Test search query param filters products
  - Test search results display correctly
  - Test clearing search resets filters

---

## 1.7 Quote Page

- [ ] `app/quote/page.tsx`:
  - Embed existing Gravity Forms (iframe or link)
  - Store contact info

- [ ] Decide with CEO: iframe embed vs link to WordPress page

### 1.7.1 Tests

- [ ] `__tests__/app/quote/page.test.tsx`:
  - Test Gravity Forms embed/iframe renders (if iframe approach)
  - Test "Get a Quote" link navigates correctly (if link approach)
  - Test store contact info displays
  - Test page title and metadata

---

## 1.8 Studio Pages

### 1.8.1 Studios Index Page

- [ ] `app/studios/page.tsx`:
  - Hero section with headline and description
  - "Get a Quote" and "View Studios" CTA buttons
  - Grid of studio cards (3 columns on desktop, 1 on mobile)
  - Each card shows: hero image, studio name, "Explore" button
  - Shared amenities section below studios
  - Location info section (address, parking, accessibility)
  - Filter by location/store (NYC, Philly, Pittsburgh) - future enhancement

### 1.8.2 Studio Detail Page

- [ ] `app/studios/[slug]/page.tsx`:
  - getStudio(slug) from constants
  - **Hero Section:**
    - Studio name as main heading
    - Description text
    - "Get a Quote" and "View Specs" buttons
  - **Gallery Section:**
    - Hero image (large)
    - Additional images grid
    - Floor plan image (if available)
  - **Features/Specs Section:**
    - Title: "Features" or "Specs"
    - Bulleted list of features from studio data
    - "Included with Every [Studio] Rental" subsection
  - **Rates Section:**
    - Title: "Rates"
    - Display rates based on studio structure:
      - Big Studio: Full Studio Rates (Pre-light/Shoot Day, Build/Strike Day), Discount Rates (Barebones, Pre-hung CYC lights), Add-Ons
      - Express Studio: Base Rate (Weekday/Weekend), Notes, Add-Ons
      - Kitchen Studio: Full Studio Rates, Discount Rates (Barebones), Add-Ons
    - "I'm Interested" button
  - **Layout Section:**
    - Title: "Layout"
    - Floor plan image display
  - **Contact/Booking Section:**
    - "Interested?" heading
    - "Get a Quote" button
    - Location info (address, Google Maps/Apple Maps links, parking info)
  - **Related Studios Section:**
    - "Explore Our Film Studios" heading
    - Grid of other studios (filter by store or show all)
    - Each card links to studio detail page

### 1.8.3 Studio Components

- [ ] `components/studios/StudioCard.tsx`:
  - Image, name, "Explore" button
  - Links to `/studios/[slug]`

- [ ] `components/studios/StudioHero.tsx`:
  - Hero section with heading, description, CTAs

- [ ] `components/studios/StudioGallery.tsx`:
  - Hero image display
  - Additional images grid
  - Floor plan display

- [ ] `components/studios/StudioFeatures.tsx`:
  - Features list display
  - Included equipment subsection

- [ ] `components/studios/StudioRates.tsx`:
  - Rates display component
  - Handles different rate structures (Big Studio vs Express vs Kitchen)
  - Add-ons list
  - "I'm Interested" button

- [ ] `components/studios/StudioLayout.tsx`:
  - Floor plan image display

- [ ] `components/studios/StudioContact.tsx`:
  - Contact section with location info
  - Maps links
  - "Get a Quote" button

- [ ] `components/studios/SharedAmenities.tsx`:
  - Reusable component for amenities shared across studios
  - Used on index page and detail pages

### 1.8.4 Location-Specific Studios

- [ ] `app/philadelphia-studios/page.tsx`:
  - Filtered view showing only PHL studios
  - Same layout as main studios page but filtered
  - Can be extended for NYC and Pittsburgh later

- [ ] `app/philadelphia-studios/[slug]/page.tsx`:
  - Same as `app/studios/[slug]/page.tsx` but ensures studio belongs to PHL store

### 1.8.1 Tests

- [ ] `__tests__/app/studios/page.test.tsx`:
  - Test renders all studios from STUDIOS constant
  - Test studio cards display image, name, location, dimensions
  - Test studio cards link to detail pages

- [ ] `__tests__/app/studios/[slug]/page.test.tsx`:
  - Test displays studio name, specs, features
  - Test gallery images render
  - Test rates display correctly
  - Test "Get a Quote" link works
  - Test 404 handling for invalid slug

---

## 1.9 Location Pages

- [ ] `app/locations/[slug]/page.tsx`:
  - Find store from STORES
  - Address, phone, email, hours
  - Google Maps embed
  - Studios at this location

### 1.9.1 Tests

- [ ] `__tests__/app/locations/[slug]/page.test.tsx`:
  - Test displays correct store info (address, phone, email, hours)
  - Test Google Maps embed renders
  - Test studios at location display correctly
  - Test 404 handling for invalid location slug

---

## 1.10 Static Content Pages

Hardcoded for now, can connect to WordPress later:

- [ ] `app/about/page.tsx`
- [ ] `app/values/page.tsx`
- [ ] `app/faq/page.tsx`
- [ ] `app/rental-process/page.tsx`
- [ ] `app/insurance/page.tsx`
- [ ] `app/lgbtq-support/page.tsx`
- [ ] `app/services/delivery/page.tsx`
- [ ] `app/services/shipping/page.tsx`
- [ ] `app/services/vehicles/page.tsx`

---

## 1.11 WordPress Integration

### Content that can come from WordPress:
- Blog posts
- FAQ entries
- Editable text sections

### Setup:
- [ ] Enable WordPress REST API
- [ ] Configure CORS
- [ ] Create fetch functions in `lib/api/wordpress.ts`
- [ ] Fallback to hardcoded content if WP unavailable

---

## 1.12 SEO & Polish

- [ ] Page metadata on all pages
- [ ] `app/sitemap.ts`
- [ ] `app/robots.ts`
- [ ] JSON-LD structured data
- [ ] Image optimization
- [ ] 404 page
- [ ] Lighthouse audit

---

## 1.13 Testing

### 1.13.1 Test File Structure

```
__tests__/
├── lib/
│   ├── data/
│   │   ├── stores.test.ts
│   │   ├── studios.test.ts
│   │   └── departments.test.ts
│   └── api/
│       ├── client.test.ts
│       ├── products.test.ts
│       ├── categories.test.ts
│       └── search.test.ts
├── components/
│   ├── inventory/
│   │   ├── ProductCard.test.tsx
│   │   ├── ProductGrid.test.tsx
│   │   ├── Pagination.test.tsx
│   │   ├── CategoryChips.test.tsx
│   │   ├── IncludedAccessories.test.tsx
│   │   └── Breadcrumb.test.tsx
│   └── search/
│       └── SearchBar.test.tsx
├── app/
│   ├── rental-inventory/
│   │   ├── page.test.tsx
│   │   ├── [department]/
│   │   │   └── page.test.tsx
│   │   └── [department]/[category]/
│   │       ├── page.test.tsx
│   │       └── [product]/
│   │           └── page.test.tsx
│   ├── studios/
│   │   ├── page.test.tsx
│   │   └── [slug]/
│   │       └── page.test.tsx
│   ├── locations/
│   │   └── [slug]/
│   │       └── page.test.tsx
│   └── quote/
│       └── page.test.tsx
└── utils/
    └── test-utils.tsx
```

### 1.13.2 Test Coverage Goals

- [ ] Unit tests for all utility functions (stores, studios, departments)
- [ ] Component tests for all reusable components
- [ ] Integration tests for critical user flows:
  - [ ] Browse inventory → filter by category → view product detail
  - [ ] Search → select suggestion → view product
  - [ ] Navigate department → category → product
- [ ] Page tests for all route pages
- [ ] API client tests with mocked responses

### 1.13.3 CI Integration

- [ ] Add test step to GitHub Actions / CI pipeline
- [ ] Run tests on pull requests
- [ ] Set coverage threshold (target: 70%+ for critical paths)
- [ ] Configure test reporting

### 1.13.4 Test Utilities

- [ ] Create `__tests__/utils/test-utils.tsx`:
  - Custom render function with providers
  - Mock router helpers
  - Mock API response helpers
  - Test data factories

---

# PHASE 2: BACKEND

## 2.1 Database

- [ ] PostgreSQL setup
- [ ] EF Core entities: Product, ProductGroup, Category, Subcategory, ProductAccessory, ProductRate, SearchSuggestion
- [ ] Migrations

## 2.2 CSV Import

- [ ] Import service for each CSV type
- [ ] Parse Subcategory fields → Category/Subcategory tables
- [ ] Map ProductGroups to Departments
- [ ] Build search suggestions

## 2.3 API Endpoints

- [ ] GET /api/departments/{slug}/categories
- [ ] GET /api/categories/{slug}/subcategories
- [ ] GET /api/products?filters
- [ ] GET /api/products/{slug}
- [ ] GET /api/search/suggestions?q=

## 2.4 Connect Frontend

- [ ] Set NEXT_PUBLIC_API_URL
- [ ] Test with real data
- [ ] Deploy

---

# APPENDIX

## Content Needed from CEO

| Item | Status |
|------|--------|
| Studio photos & specs | ❌ |
| Gravity Forms embed URL | ❌ |
| FAQ content | ❌ |
| Values page copy | ❌ |
| About page copy | ❌ |
| Team photos | ❌ |

## ProductGroup → Department Mapping

| Department | ProductGroups |
|------------|--------------|
| Camera | Cinema Cameras, Cinema Lenses, DSLR Bodies, Tripods, Monitors, Follow Focus, Gimbals, etc. |
| Lighting | Lights, Lighting Modifiers, Bulbs, Electric & DMX, Fog/Haze |
| Grip | Stands, Grip Support, Clamps, Overhead Frames, Rags/Fabrics, Carts |
| Audio | Audio |
| Photo | Photo Lighting, Seamless |
| Production Supplies | Expendables, Cables, Batteries, Cases, Production Supplies |