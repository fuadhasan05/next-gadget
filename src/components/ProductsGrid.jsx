"use client";

import Link from "next/link";
import { FiStar, FiShoppingCart, FiHeart, FiArrowRight } from "react-icons/fi";
import Button from "@/components/ui/Button";
import ProductCard from "./ProductCard";

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
        <ProductCard products={products} />

        {/* View More Button */}
        <div className="text-center">
          <Link href="/products">
            <Button
              variant="primary"
              size="lg"
              icon={FiArrowRight}
              iconPosition="right"
            >
              View All Products <FiArrowRight/>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
