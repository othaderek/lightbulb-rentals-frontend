import { apiRequest, isApiAvailable } from './client';
import { ProductListItem, ProductDetail, PaginatedResult } from '@/types';
import { sampleProducts } from '@/data/rentalInventory';

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

export async function getProduct(slug: string): Promise<ProductDetail> {
  if (!isApiAvailable()) {
    // Return mock data
    return getMockProduct(slug);
  }

  return apiRequest<ProductDetail>(`/api/products/${slug}`);
}

// Mock data functions
function getMockProducts(
  filters: ProductFilters
): PaginatedResult<ProductListItem> {
  let products = [...sampleProducts];

  // Filter by department
  if (filters.departmentSlug) {
    // Map department slug to category (simplified for mock)
    products = products.filter((p) => {
      // This is a simplified mapping - in real implementation,
      // you'd need to map department slugs to product categories
      return true; // For now, return all products
    });
  }

  // Filter by category
  if (filters.categorySlug) {
    products = products.filter((p) => p.category === filters.categorySlug);
  }

  // Search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    products = products.filter((p) =>
      p.name.toLowerCase().includes(searchLower)
    );
  }

  // Sort
  if (filters.sort === 'name-desc') {
    products.sort((a, b) => b.name.localeCompare(a.name));
  } else {
    products.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Pagination
  const page = filters.page || 1;
  const pageSize = filters.pageSize || 12;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = products.slice(startIndex, endIndex);

  // Convert to ProductListItem format
  const items: ProductListItem[] = paginatedProducts.map((p) => ({
    id: parseInt(p.id),
    name: p.name,
    slug: p.id,
    imageUrl: p.imageUrl,
    dailyRate: p.dailyRate,
    productGroupName: p.category,
    departmentSlug: p.category,
    categorySlug: p.category,
  }));

  return {
    items,
    total: products.length,
    page,
    pageSize,
  };
}

function getMockProduct(slug: string): ProductDetail {
  const product = sampleProducts.find((p) => p.id === slug);

  if (!product) {
    throw new Error(`Product not found: ${slug}`);
  }

  return {
    id: parseInt(product.id),
    name: product.name,
    slug: product.id,
    description: undefined,
    imageUrl: product.imageUrl,
    dailyRate: product.dailyRate,
    productGroupName: product.category,
    departmentSlug: product.category,
    categorySlug: product.category,
    includedAccessories: [],
  };
}
