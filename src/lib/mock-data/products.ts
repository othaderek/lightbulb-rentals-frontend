import { ProductListItem, ProductDetail, PaginatedResult } from '@/types';
import { ProductFilters } from '@/lib/api/products';
import { sampleProducts } from '@/data/rentalInventory';

/**
 * Convert sample products to ProductListItem format for API mock data
 */
export function getMockProductListItems(): ProductListItem[] {
  return sampleProducts.map((product) => ({
    id: parseInt(product.id),
    name: product.name,
    slug: product.id,
    imageUrl: product.imageUrl,
    dailyRate: product.dailyRate,
    productGroupName: product.category,
    departmentSlug: mapCategoryToDepartment(product.category),
    categorySlug: product.category,
  }));
}

/**
 * Convert sample products to ProductDetail format for API mock data
 */
export function getMockProductDetails(): ProductDetail[] {
  return sampleProducts.map((product) => ({
    id: parseInt(product.id),
    name: product.name,
    slug: product.id,
    description: generateMockDescription(product.name),
    imageUrl: product.imageUrl,
    dailyRate: product.dailyRate,
    productGroupName: product.category,
    departmentSlug: mapCategoryToDepartment(product.category),
    categorySlug: product.category,
    includedAccessories: [],
    metaTitle: `${product.name} • Lightbulb Rentals`,
    metaDescription: `Rent ${product.name} from Lightbulb Rentals. Professional equipment rental for film, TV, and photo production.`,
  }));
}

/**
 * Map category to department slug
 * This is a simplified mapping - in production, this would come from the API
 */
function mapCategoryToDepartment(category: string): string {
  const categoryToDepartment: Record<string, string> = {
    'camera-bodies': 'camera',
    'camera-lenses': 'camera',
    'camera-support': 'camera',
    'tripods': 'camera',
    'monitors': 'camera',
    'follow-focus': 'camera',
    'gimbals': 'camera',
    'matte-boxes': 'camera',
    'media': 'camera',
    'wireless-video': 'camera',
    'teleprompters': 'camera',
    'lights': 'lighting',
    'lighting-modifiers': 'lighting',
    'electric-distro': 'lighting',
    'dmx': 'lighting',
    'fog-haze': 'lighting',
    'grip-support': 'grip',
    'stands': 'grip',
    'dollies': 'grip',
    'overhead-frames': 'grip',
    'rags-fabrics': 'grip',
    'audio': 'audio',
    'photo-lighting': 'photo',
    'polaroid': 'photo',
    'seamless': 'photo',
    'production-supplies': 'production-supplies',
    'expendables': 'production-supplies',
    'production': 'production-supplies',
    'projectors': 'production-supplies',
    'filters': 'camera',
  };

  return categoryToDepartment[category] || 'camera';
}

/**
 * Generate a mock description for a product
 */
function generateMockDescription(productName: string): string {
  return `Professional ${productName} available for rent. High-quality equipment for film, TV, and photo production. Contact us for availability and pricing.`;
}

/**
 * Get mock products with filtering, sorting, and pagination
 */
export function getMockProducts(
  filters: ProductFilters
): PaginatedResult<ProductListItem> {
  let products = getMockProductListItems();

  // Filter by department
  if (filters.departmentSlug) {
    products = products.filter((p) => p.departmentSlug === filters.departmentSlug);
  }

  // Filter by category
  if (filters.categorySlug) {
    products = products.filter((p) => p.categorySlug === filters.categorySlug);
  }

  // Filter by subcategory (not implemented in mock data yet)
  if (filters.subcategorySlug) {
    // For now, no filtering by subcategory in mock data
    // In production, this would filter products by subcategory
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

  return {
    items: paginatedProducts,
    total: products.length,
    page,
    pageSize,
  };
}

/**
 * Get a single mock product by slug
 */
export function getMockProduct(
  departmentSlug: string,
  categorySlug: string,
  productSlug: string
): ProductDetail {
  const details = getMockProductDetails();
  const product = details.find(
    (p) =>
      p.departmentSlug === departmentSlug &&
      p.categorySlug === categorySlug &&
      p.slug === productSlug
  );

  if (!product) {
    throw new Error(
      `Product not found: ${departmentSlug}/${categorySlug}/${productSlug}`
    );
  }

  return product;
}
