import { apiRequest, isApiAvailable } from './client';
import { Category, Subcategory } from '@/types';
import { getMockCategories, getMockSubcategories } from '@/lib/mock-data/categories';

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
