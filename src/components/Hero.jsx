"use client";
import React from "react";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiStar, FiTruck, FiShield, FiRefreshCw } from "react-icons/fi";
import Button from "./ui/Button";

export default function Hero() {
  return (
    <section className="relative bg-base-100 pt-16 pb-8 md:pt-24 md:pb-16 overflow-hidden">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Discover the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Next Generation
              </span>{" "}
              of Gadgets
            </h1>
            
            <p className="mt-6 text-xl max-w-2xl">
              Explore cutting-edge technology and innovative gadgets that will transform your daily life. 
              From smart home devices to wearable tech, we have everything you need to stay ahead.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/products">
                <Button size="lg" icon={FiArrowRight} iconPosition="right" variant="primary">
                  Shop Now
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">10K+</div>
                <div className="text-gray-600 dark:text-gray-400 mt-1">Happy Customers</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">500+</div>
                <div className="text-gray-600 dark:text-gray-400 mt-1">Products</div>
              </div>
              <div className="text-center lg:text-left col-span-2 md:col-span-1">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">24/7</div>
                <div className="text-gray-600 dark:text-gray-400 mt-1">Support</div>
              </div>
            </div>
          </div>
          
          {/* Image/Illustration */}
          <div className="flex-1 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/hero-image.avif"
                alt="Next Gadget showcase"
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Floating card 1 */}
            <div className="absolute -bottom-4 -left-4 bg-base-200 rounded-xl shadow-lg p-4 max-w-xs z-20">
              <div className="flex items-center">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                  <FiTruck className="text-green-600 dark:text-green-400 text-xl" />
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold">Free Shipping</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">On orders over $50</p>
                </div>
              </div>
            </div>
            
            {/* Floating card 2 */}
            <div className="absolute -top-4 -right-4 bg-base-200 rounded-xl shadow-lg p-4 max-w-xs z-20">
              <div className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                  <FiStar className="text-blue-600 dark:text-blue-400 text-xl" />
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold">4.8/5 Rating</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">From 2k+ reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div id="features" className="relative mt-8 md:mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose Next Gadget?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-base-200 rounded-xl p-6 shadow-lg">
              <div className="bg-indigo-100 dark:bg-indigo-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FiShield className="text-indigo-600 dark:text-indigo-400 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
              <p className="text-gray-800 dark:text-gray-400">
                Your data is protected with industry-leading security measures and encryption.
              </p>
            </div>
            
            <div className="bg-base-200 rounded-xl p-6 shadow-lg">
              <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FiRefreshCw className="text-purple-600 dark:text-purple-400 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600 dark:text-gray-400">
                30-day money-back guarantee on all products. No questions asked.
              </p>
            </div>
            
            <div className="bg-base-200 rounded-xl p-6 shadow-lg">
              <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FiCheck className="text-green-600 dark:text-green-400 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All products undergo rigorous testing to ensure the highest quality standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}