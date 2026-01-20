import { Category, Subcategory } from '@/types';
import { categories } from '@/data/rentalInventory';

/**
 * Get mock categories for a department
 */
export function getMockCategories(departmentSlug: string): Category[] {
  // Find categories that belong to this department
  // This is a simplified mapping - in production, this would come from the API
  const departmentCategoryMap: Record<string, string[]> = {
    camera: [
      'camera-bodies',
      'camera-lenses',
      'camera-support',
      'tripods',
      'monitors',
      'follow-focus',
      'gimbals',
      'matte-boxes',
      'media',
      'wireless-video',
      'teleprompters',
      'filters',
    ],
    lighting: ['lights', 'lighting-modifiers', 'electric-distro', 'dmx', 'fog-haze'],
    grip: ['grip-support', 'stands', 'dollies', 'overhead-frames', 'rags-fabrics'],
    audio: ['audio'],
    photo: ['photo-lighting', 'polaroid', 'seamless'],
    'production-supplies': ['production-supplies', 'expendables', 'production', 'projectors'],
  };

  const categoryIds = departmentCategoryMap[departmentSlug] || [];
  let categoryIndex = 1;

  return categories
    .filter((cat) => categoryIds.includes(cat.id))
    .map((cat) => ({
      id: categoryIndex++,
      name: cat.name,
      slug: cat.id,
      departmentSlug,
      productCount: 0, // Would be calculated from actual products in production
    }));
}

/**
 * Get mock subcategories for a category
 */
export function getMockSubcategories(categorySlug: string): Subcategory[] {
  const category = categories.find((c) => c.id === categorySlug);

  if (!category || !category.subcategories || category.subcategories.length === 0) {
    return [];
  }

  let subcategoryIndex = 1;

  return category.subcategories.map((subcat) => ({
    id: subcategoryIndex++,
    name: subcat,
    slug: subcat.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    categorySlug,
    productCount: 0, // Would be calculated from actual products in production
  }));
}
