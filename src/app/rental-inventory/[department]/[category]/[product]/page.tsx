"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getDepartment } from "@/lib/data/departments";
import { getCategories } from "@/lib/api/categories";
import { getProduct } from "@/lib/api/products";
import { ProductDetail } from "@/types";
import { STORES } from "@/lib/data/stores";

interface ProductDetailPageProps {
  params: Promise<{
    department: string;
    category: string;
    product: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { department: departmentSlug, category: categorySlug, product: productSlug } = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState<string>("");
  const [departmentName, setDepartmentName] = useState<string>("");

  const department = getDepartment(departmentSlug);

  useEffect(() => {
    if (!department) {
      router.push("/rental-inventory");
      return;
    }

    const loadData = async () => {
      setLoading(true);
      try {
        const [categoriesData, productData] = await Promise.all([
          getCategories(departmentSlug),
          getProduct(departmentSlug, categorySlug, productSlug),
        ]);

        const category = categoriesData.find((c) => c.slug === categorySlug);
        if (!category) {
          router.push(`/rental-inventory/${departmentSlug}`);
          return;
        }

        setCategoryName(category.name);
        setDepartmentName(department.name);
        setProduct(productData);
      } catch (error) {
        console.error("Error loading product:", error);
        router.push(`/rental-inventory/${departmentSlug}/${categorySlug}`);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [departmentSlug, categorySlug, productSlug, department, router]);

  if (!department) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <p className="text-gray-600">Loading product...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const formatPrice = (price?: number) => {
    if (!price || price === 0) return "Request a Quote";
    return `$${price.toFixed(2)}`;
  };

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
                <Link
                  href={`/rental-inventory/${departmentSlug}/${categorySlug}`}
                  className="hover:text-teal transition-colors"
                >
                  {categoryName}
                </Link>
              </li>
              <li>
                <span className="mx-2">»</span>
              </li>
              <li>
                <span className="text-black font-medium">{product.name}</span>
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Product Image */}
              {product.imageUrl && (
                <div className="mb-8">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full rounded-lg"
                  />
                </div>
              )}

              {/* Product Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {product.name}
              </h1>

              {/* Description */}
              {product.description && (
                <div className="mb-8">
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Included Accessories Section */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-black mb-4">
                  INCLUDED ACCESSORIES
                </h2>
                {product.includedAccessories && product.includedAccessories.length > 0 ? (
                  <ul className="space-y-2">
                    {product.includedAccessories.map((accessory, index) => (
                      <li key={index} className="text-gray-700">
                        {accessory.quantity > 1 && `${accessory.quantity}x `}
                        {accessory.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">
                    There are no included accessories for this item.
                  </p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Rates Card */}
              <div className="bg-white border-l-4 border-teal rounded-lg shadow-lg p-6 sticky top-24 mb-6">
                <h2 className="text-xl font-bold text-black mb-6">RATES</h2>
                {product.dailyRate && product.dailyRate > 0 && (
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Daily</span>
                      <span className="font-semibold text-black text-lg">
                        {formatPrice(product.dailyRate)}
                      </span>
                    </div>
                  </div>
                )}
                <div className="space-y-3">
                  <Link
                    href="/quote"
                    className="block w-full bg-teal text-white px-6 py-3 rounded-md font-medium text-center hover:bg-teal-hover transition-colors"
                  >
                    Get a Quote
                  </Link>
                  <Link
                    href={`/rental-inventory/${departmentSlug}/${categorySlug}`}
                    className="block w-full bg-white border-2 border-gray-300 text-black px-6 py-3 rounded-md font-medium text-center hover:border-teal transition-colors"
                  >
                    Back to {categoryName}
                  </Link>
                </div>
              </div>

              {/* Store Contact Info */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-black mb-4">
                  Contact Us
                </h2>
                <div className="space-y-4">
                  {STORES.map((store) => (
                    <div key={store.code} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                      <h3 className="font-semibold text-black mb-2">
                        {store.shortName}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        {store.address}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        {store.city}, {store.state} {store.zip}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        {store.phone}
                      </p>
                      <p className="text-sm text-gray-600">
                        {store.hours}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
