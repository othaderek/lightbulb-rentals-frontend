import { apiRequest, isApiAvailable } from './client';
import { SearchSuggestion } from '@/types';
import { getMockProductListItems } from '@/lib/mock-data/products';
import { getMockCategories } from '@/lib/mock-data/categories';

export async function getSuggestions(
  query: string
): Promise<SearchSuggestion[]> {
  if (!query || query.trim().length === 0) {
    return [];
  }

  if (!isApiAvailable()) {
    // Return mock data
    return getMockSuggestions(query);
  }

  return apiRequest<SearchSuggestion[]>(
    `/api/search/suggestions?q=${encodeURIComponent(query)}`
  );
}

// Mock data function
function getMockSuggestions(query: string): SearchSuggestion[] {
  const queryLower = query.toLowerCase().trim();
  const suggestions: SearchSuggestion[] = [];

  // Search products
  const allProducts = getMockProductListItems();
  const matchingProducts = allProducts
    .filter((p) => p.name.toLowerCase().includes(queryLower))
    .slice(0, 5)
    .map((p) => ({
      term: p.name,
      type: 'product' as const,
      slug: `${p.departmentSlug}/${p.categorySlug}/${p.slug}`,
    }));

  suggestions.push(...matchingProducts);

  // Search categories across all departments
  const allDepartments = ['camera', 'lighting', 'grip', 'audio', 'photo', 'production-supplies'];
  const matchingCategories: SearchSuggestion[] = [];
  
  for (const deptSlug of allDepartments) {
    const categories = getMockCategories(deptSlug);
    const deptMatches = categories
      .filter((c) => c.name.toLowerCase().includes(queryLower))
      .slice(0, 2)
      .map((c) => ({
        term: c.name,
        type: 'category' as const,
        slug: `${c.departmentSlug}/${c.slug}`,
      }));
    matchingCategories.push(...deptMatches);
  }

  suggestions.push(...matchingCategories.slice(0, 3));

  return suggestions.slice(0, 8); // Limit total suggestions
}
