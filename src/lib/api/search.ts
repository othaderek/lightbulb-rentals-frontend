import { apiRequest, isApiAvailable } from './client';
import { SearchSuggestion } from '@/types';
import { sampleProducts } from '@/data/rentalInventory';
import { categories } from '@/data/rentalInventory';

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
  const matchingProducts = sampleProducts
    .filter((p) => p.name.toLowerCase().includes(queryLower))
    .slice(0, 5)
    .map((p) => ({
      term: p.name,
      type: 'product' as const,
      slug: p.id,
    }));

  suggestions.push(...matchingProducts);

  // Search categories
  const matchingCategories = categories
    .filter((c) => c.name.toLowerCase().includes(queryLower))
    .slice(0, 3)
    .map((c) => ({
      term: c.name,
      type: 'category' as const,
      slug: c.id,
    }));

  suggestions.push(...matchingCategories);

  return suggestions.slice(0, 8); // Limit total suggestions
}
