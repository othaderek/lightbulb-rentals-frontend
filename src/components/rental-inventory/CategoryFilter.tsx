"use client";

import { useState } from "react";
import { Category } from "@/data/rentalInventory";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryFilterProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
      <h2 className="text-xl font-bold text-black mb-4">Equipment Type</h2>
      <div className="space-y-1">
        {categories.map((category) => (
          <div key={category.id}>
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  if (selectedCategory === category.id) {
                    onCategorySelect(null);
                  } else {
                    onCategorySelect(category.id);
                  }
                }}
                className={`flex-1 text-left py-2 px-2 rounded transition-colors ${
                  selectedCategory === category.id
                    ? "bg-teal text-white"
                    : "text-black hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
              {category.subcategories && category.subcategories.length > 0 && (
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="px-2 py-2 text-black hover:text-teal transition-colors"
                  aria-label={`Toggle ${category.name} subcategories`}
                >
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      expandedCategories.has(category.id) ? "rotate-180" : ""
                    }`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </div>
            {category.subcategories &&
              category.subcategories.length > 0 &&
              expandedCategories.has(category.id) && (
                <div className="pl-4 mt-1 space-y-1">
                  {category.subcategories.map((subcategory, index) => (
                    <button
                      key={index}
                      className="block w-full text-left py-1 px-2 text-sm text-gray-700 hover:text-teal hover:bg-gray-50 rounded transition-colors"
                    >
                      {subcategory}
                    </button>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}


