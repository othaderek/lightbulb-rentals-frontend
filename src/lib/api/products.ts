import { apiRequest, isApiAvailable } from './client';
import { ProductListItem, ProductDetail, PaginatedResult } from '@/types';
import { getMockProducts, getMockProduct } from '@/lib/mock-data/products';

export interface ProductFilters {
  departmentSlug?: string;
  categorySlug?: string;
  subcategorySlug?: string;
  search?: string;
  page?: number;
  pageSize?: number;
  sort?: 'name-asc' | 'name-desc';
}

export async function getProducts(
  filters: ProductFilters = {}
): Promise<PaginatedResult<ProductListItem>> {
  if (!isApiAvailable()) {
    // Return mock data
    return getMockProducts(filters);
  }

  const params = new URLSearchParams();
  if (filters.departmentSlug) {
    params.append('departmentSlug', filters.departmentSlug);
  }
  if (filters.categorySlug) {
    params.append('categorySlug', filters.categorySlug);
  }
  if (filters.subcategorySlug) {
    params.append('subcategorySlug', filters.subcategorySlug);
  }
  if (filters.search) {
    params.append('q', filters.search);
  }
  if (filters.page) {
    params.append('page', filters.page.toString());
  }
  if (filters.pageSize) {
    params.append('pageSize', filters.pageSize.toString());
  }
  if (filters.sort) {
    params.append('sort', filters.sort);
  }

  return apiRequest<PaginatedResult<ProductListItem>>(
    `/api/products?${params.toString()}`
  );
}

export async function getProduct(
  departmentSlug: string,
  categorySlug: string,
  productSlug: string
): Promise<ProductDetail> {
  if (!isApiAvailable()) {
    // Return mock data
    return getMockProduct(departmentSlug, categorySlug, productSlug);
  }

  return apiRequest<ProductDetail>(
    `/api/products/${departmentSlug}/${categorySlug}/${productSlug}`
  );
}
