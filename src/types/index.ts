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
