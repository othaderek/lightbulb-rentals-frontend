"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CategoryFilter from "@/components/rental-inventory/CategoryFilter";
import ProductGrid from "@/components/rental-inventory/ProductGrid";
import { categories, sampleProducts, Product } from "@/data/rentalInventory";

export default function RentalInventoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) {
      return sampleProducts;
    }
    return sampleProducts.filter(
      (product) => product.category === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Filters */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategorySelect={setSelectedCategory}
                />
              </div>
            </aside>

            {/* Main Content - Product Grid */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
                  Rental Inventory
                </h1>
                <p className="text-gray-700">
                  {filteredProducts.length} item{filteredProducts.length !== 1 ? "s" : ""} found
                  {selectedCategory && (
                    <span>
                      {" "}
                      in{" "}
                      <span className="font-semibold">
                        {categories.find((c) => c.id === selectedCategory)?.name}
                      </span>
                    </span>
                  )}
                </p>
              </div>
              <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


