import Link from "next/link";
import { Product } from "@/data/rentalInventory";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    if (price === 0) return "Request a Quote";
    return `$${price.toFixed(2)}`;
  };

  return (
    <Link href={`/rental-inventory/${product.id}`}>
      <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-teal transition-all duration-200 cursor-pointer">
      {/* Image Placeholder */}
      <div className="aspect-video bg-gray-100 flex items-center justify-center">
        <span className="text-gray-400 text-sm">Product Image</span>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-bold text-black mb-4 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        {/* Rates */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Daily</span>
            <span className="font-semibold text-black">
              {formatPrice(product.dailyRate)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Weekly</span>
            <span className="font-semibold text-black">
              {formatPrice(product.weeklyRate)}
            </span>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
}


