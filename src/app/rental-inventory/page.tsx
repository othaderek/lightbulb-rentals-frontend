"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/rental-inventory/ProductGrid";
import { DEPARTMENTS } from "@/lib/data/departments";
import { getProducts } from "@/lib/api/products";
import { ProductListItem } from "@/types";

export default function RentalInventoryPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    if (searchQuery) {
      const loadSearchResults = async () => {
        setLoading(true);
        try {
          const productsData = await getProducts({
            search: searchQuery,
            page: currentPage,
            pageSize: 12,
          });
          setProducts(productsData.items);
          setTotalProducts(productsData.total);
        } catch (error) {
          console.error("Error loading search results:", error);
        } finally {
          setLoading(false);
        }
      };
      loadSearchResults();
    } else {
      setProducts([]);
      setTotalProducts(0);
    }
  }, [searchQuery, currentPage]);

  const totalPages = Math.ceil(totalProducts / 12);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
              Rental Inventory
            </h1>
            {searchQuery ? (
              <div className="flex items-center gap-2">
                <span className="text-gray-700">
                  Search results for: <span className="font-semibold">"{searchQuery}"</span>
                </span>
                <Link
                  href="/rental-inventory"
                  className="text-teal hover:text-teal-hover text-sm underline"
                >
                  Clear search
                </Link>
              </div>
            ) : (
              <p className="text-gray-700">
                Browse our equipment by department
              </p>
            )}
          </div>

          {searchQuery ? (
            <>
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">Searching...</p>
                </div>
              ) : (
                <>
                  <ProductGrid products={products} />
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border-2 border-gray-300 rounded-md text-black disabled:opacity-50 disabled:cursor-not-allowed hover:border-teal transition-colors"
                      >
                        Previous
                      </button>

                      <div className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                          (page) => {
                            if (
                              page === 1 ||
                              page === totalPages ||
                              (page >= currentPage - 1 && page <= currentPage + 1)
                            ) {
                              return (
                                <button
                                  key={page}
                                  onClick={() => setCurrentPage(page)}
                                  className={`px-4 py-2 rounded-md transition-colors ${
                                    currentPage === page
                                      ? "bg-teal text-white"
                                      : "border-2 border-gray-300 text-black hover:border-teal"
                                  }`}
                                >
                                  {page}
                                </button>
                              );
                            } else if (
                              page === currentPage - 2 ||
                              page === currentPage + 2
                            ) {
                              return (
                                <span key={page} className="px-2">
                                  ...
                                </span>
                              );
                            }
                            return null;
                          }
                        )}
                      </div>

                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border-2 border-gray-300 rounded-md text-black disabled:opacity-50 disabled:cursor-not-allowed hover:border-teal transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            /* Department Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DEPARTMENTS.map((department) => (
                <Link
                  key={department.id}
                  href={`/rental-inventory/${department.slug}`}
                  className="group"
                >
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-teal transition-all duration-200 h-full">
                    <h2 className="text-xl font-bold text-black mb-2 group-hover:text-teal transition-colors">
                      {department.name}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {department.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}


