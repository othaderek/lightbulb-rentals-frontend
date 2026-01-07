"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, use } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getProductById, categories } from "@/data/rentalInventory";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const product = getProductById(id);

  useEffect(() => {
    if (!product) {
      router.push("/rental-inventory");
    }
  }, [product, router]);

  if (!product) {
    return null;
  }

  const category = categories.find((c) => c.id === product.category);
  const categoryName = category?.name || "Equipment";

  const formatPrice = (price: number) => {
    if (price === 0) return "Request a Quote";
    return `$${price.toFixed(2)}`;
  };

  const buildBreadcrumbs = () => {
    const crumbs = [
      { label: "Home", href: "/" },
      { label: "Equipment", href: "/rental-inventory" },
    ];

    if (category) {
      crumbs.push({
        label: categoryName,
        href: `/rental-inventory?category=${product.category}`,
      });
    }

    crumbs.push({ label: product.name, href: `#` });

    return crumbs;
  };

  const breadcrumbs = buildBreadcrumbs();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center">
                  {index > 0 && <span className="mx-2">»</span>}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-black font-medium">{crumb.label}</span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="hover:text-teal transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Product Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-black mb-8">
                {product.name}
              </h1>

              {/* Included Accessories Section */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-black mb-4">
                  INCLUDED ACCESSORIES
                </h2>
                <p className="text-gray-600">
                  There are no included accessories for this item.
                </p>
              </div>

              {/* Optional Accessories Section */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-black mb-4">
                  OPTIONAL ACCESSORIES
                </h2>
                <p className="text-gray-600">
                  There are no optional accessories for this item.
                </p>
              </div>
            </div>

            {/* Rates Card */}
            <div className="lg:col-span-1">
              <div className="bg-white border-l-4 border-teal rounded-lg shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-black mb-6">RATES</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Daily</span>
                    <span className="font-semibold text-black text-lg">
                      {formatPrice(product.dailyRate)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Weekly</span>
                    <span className="font-semibold text-black text-lg">
                      {formatPrice(product.weeklyRate)}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Link
                    href="#"
                    className="block w-full bg-teal text-white px-6 py-3 rounded-md font-medium text-center hover:bg-teal-hover transition-colors"
                  >
                    Get a Quote
                  </Link>
                  <Link
                    href="/rental-inventory"
                    className="block w-full bg-white border-2 border-gray-300 text-black px-6 py-3 rounded-md font-medium text-center hover:border-teal transition-colors"
                  >
                    Back to All Inventory
                  </Link>
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

