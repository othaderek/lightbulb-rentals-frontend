import { apiRequest, isApiAvailable } from './client';
import { Category, Subcategory } from '@/types';
import { categories } from '@/data/rentalInventory';

export async function getCategories(
  departmentSlug: string
): Promise<Category[]> {
  if (!isApiAvailable()) {
    // Return mock data
    return getMockCategories(departmentSlug);
  }

  return apiRequest<Category[]>(`/api/departments/${departmentSlug}/categories`);
}

export async function getSubcategories(
  categorySlug: string
): Promise<Subcategory[]> {
  if (!isApiAvailable()) {
    // Return mock data
    return getMockSubcategories(categorySlug);
  }

  return apiRequest<Subcategory[]>(`/api/categories/${categorySlug}/subcategories`);
}

// Mock data functions
function getMockCategories(departmentSlug: string): Category[] {
  const department = categories.find((d) => d.id === departmentSlug);
  
  if (!department || !department.subcategories || department.subcategories.length === 0) {
    return [];
  }

  // Convert subcategories to categories for mock data
  return department.subcategories.map((subcat, index) => ({
    id: index + 1,
    name: subcat,
    slug: subcat.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    departmentSlug,
    productCount: 0, // Would need to calculate from actual products
  }));
}

function getMockSubcategories(categorySlug: string): Subcategory[] {
  // For mock data, return empty array
  // In real implementation, this would come from the API
  return [];
}
