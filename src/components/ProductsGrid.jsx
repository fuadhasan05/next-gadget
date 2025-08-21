"use client";

import Link from "next/link";
import { FiStar, FiShoppingCart, FiHeart, FiArrowRight } from "react-icons/fi";
import Button from "@/components/ui/Button";

export default function ProductsGrid({ products }) {
  return (
    <div className="bg-base-100 my-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl text-blue-600 font-bold mb-4">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our latest collection of innovative gadgets and tech
            products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-base-200 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-100 hover:-translate-y-1"
            >
              {/* Product Image */}
              <div className="relative h-60 bg-gray-200 dark:bg-gray-700">
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
                <button className="absolute top-4 left-4 p-2 bg-white dark:bg-gray-900 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <FiHeart className="text-gray-600 dark:text-gray-400 h-5 w-5" />
                </button>
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
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
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
                    <Button
                      size="sm"
                      icon={FiShoppingCart}
                      disabled={!product.inStock}
                    >
                      Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <Link href="/products/all">
            <Button
              variant="primary"
              size="lg"
              icon={FiArrowRight}
              iconPosition="right"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
