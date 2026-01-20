"use client";

import { use, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/rental-inventory/ProductGrid";
import { getDepartment } from "@/lib/data/departments";
import { getCategories, getSubcategories } from "@/lib/api/categories";
import { getProducts } from "@/lib/api/products";
import { ProductListItem, Subcategory } from "@/types";

interface CategoryPageProps {
  params: Promise<{
    department: string;
    category: string;
  }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { department: departmentSlug, category: categorySlug } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [departmentName, setDepartmentName] = useState<string>("");

  const department = getDepartment(departmentSlug);

  // Load subcategories and products
  useEffect(() => {
    if (!department) {
      router.push("/rental-inventory");
      return;
    }

    const loadData = async () => {
      setLoading(true);
      try {
        const [categoriesData, subcategoriesData, productsData] = await Promise.all([
          getCategories(departmentSlug),
          getSubcategories(categorySlug),
          getProducts({
            departmentSlug,
            categorySlug,
            subcategorySlug: selectedSubcategory || undefined,
            search: searchQuery || undefined,
            page: currentPage,
            pageSize: 12,
          }),
        ]);

        const category = categoriesData.find((c) => c.slug === categorySlug);
        if (!category) {
          router.push(`/rental-inventory/${departmentSlug}`);
          return;
        }

        setCategoryName(category.name);
        setDepartmentName(department.name);
        setSubcategories(subcategoriesData);
        setProducts(productsData.items);
        setTotalProducts(productsData.total);
      } catch (error) {
        console.error("Error loading category data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [departmentSlug, categorySlug, selectedSubcategory, currentPage, searchQuery, department, router]);

  if (!department) {
    return null;
  }

  const handleSubcategoryClick = (subcategorySlug: string) => {
    setSelectedSubcategory(subcategorySlug === selectedSubcategory ? null : subcategorySlug);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalProducts / 12);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-teal transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <span className="mx-2">»</span>
              </li>
              <li>
                <Link
                  href="/rental-inventory"
                  className="hover:text-teal transition-colors"
                >
                  Rental Inventory
                </Link>
              </li>
              <li>
                <span className="mx-2">»</span>
              </li>
              <li>
                <Link
                  href={`/rental-inventory/${departmentSlug}`}
                  className="hover:text-teal transition-colors"
                >
                  {departmentName}
                </Link>
              </li>
              <li>
                <span className="mx-2">»</span>
              </li>
              <li>
                <span className="text-black font-medium">{categoryName}</span>
              </li>
            </ol>
          </nav>

          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
              {categoryName}
            </h1>
            
            {searchQuery && (
              <div className="mb-4 flex items-center gap-2">
                <span className="text-gray-700">
                  Search results for: <span className="font-semibold">"{searchQuery}"</span>
                </span>
                <Link
                  href={`/rental-inventory/${departmentSlug}/${categorySlug}`}
                  className="text-teal hover:text-teal-hover text-sm underline"
                >
                  Clear search
                </Link>
              </div>
            )}

            {/* Subcategory Filter Chips */}
            {subcategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => handleSubcategoryClick("")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    !selectedSubcategory
                      ? "bg-teal text-white"
                      : "bg-gray-100 text-black hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                {subcategories.map((subcategory) => (
                  <button
                    key={subcategory.slug}
                    onClick={() => handleSubcategoryClick(subcategory.slug)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedSubcategory === subcategory.slug
                        ? "bg-teal text-white"
                        : "bg-gray-100 text-black hover:bg-gray-200"
                    }`}
                  >
                    {subcategory.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading products...</p>
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
