import React from "react";
import Link from "next/link";
import { FiStar } from "react-icons/fi";
import Button from "@/components/ui/Button";

export default function ProductCard({ products }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
      {products?.map((product) => (
        <div
          key={product._id}
          className="bg-base-200 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-100 hover:-translate-y-1"
        >
          {/* Product Image */}
          <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
            <img
              src={product.images || "/images/placeholder.jpg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {!product.inStock && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Out of Stock
              </div>
            )}
            {product.category && (
              <div className="absolute bottom-4 left-4 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-xs font-medium">
                {product.category}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2 line-clamp-1">
              {product.name}
            </h2>
            {product.rating && (
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "text-amber-500 fill-amber-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  ({product.reviewCount || 0})
                </span>
              </div>
            )}
            <div>
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                ${product.price?.toFixed(2)}
              </span>
            </div>
            <div className="mt-5">
              <div className="flex justify-between space-x-2">
                <Link href={`/products/${product._id}`}>
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
