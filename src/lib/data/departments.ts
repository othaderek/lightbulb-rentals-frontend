export const DEPARTMENTS = [
  { id: 1, name: 'Camera', slug: 'camera', description: 'Cinema cameras, lenses, and support' },
  { id: 2, name: 'Lighting', slug: 'lighting', description: 'LEDs, HMIs, tungsten, and modifiers' },
  { id: 3, name: 'Grip', slug: 'grip', description: 'Stands, clamps, rigging, and equipment' },
  { id: 4, name: 'Audio', slug: 'audio', description: 'Microphones, recorders, and wireless' },
  { id: 5, name: 'Photo', slug: 'photo', description: 'Strobes and photo lighting' },
  { id: 6, name: 'Production Supplies', slug: 'production-supplies', description: 'Expendables, cables, and supplies' },
] as const;

export type Department = typeof DEPARTMENTS[number];

export const getDepartment = (slug: string) => DEPARTMENTS.find(d => d.slug === slug);
export const getDepartmentById = (id: number) => DEPARTMENTS.find(d => d.id === id);
