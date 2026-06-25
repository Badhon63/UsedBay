"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="bg-linear-to-r from-teal-50 to-teal-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Buy & Sell Pre-Owned Products
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find affordable items, save money, and reduce waste with UsedBay
            </p>
            <button className="bg-teal-600 text-white px-8 py-3 rounded font-medium hover:bg-teal-700">
              Start Shopping
            </button>
          </div>

          <div className="flex justify-center">
            <Image
              src="/images/hero-shopping.png"
              alt="Shopping"
              width={500}
              height={500}
              priority
              className="rounded-lg w-full h-auto"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">
                5,000+
              </div>
              <p className="text-gray-700">Active Products</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">
                2,500+
              </div>
              <p className="text-gray-700">Trusted Sellers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">
                10,000+
              </div>
              <p className="text-gray-700">Happy Buyers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
