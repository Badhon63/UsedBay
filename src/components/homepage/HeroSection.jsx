"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-teal-50 to-teal-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Buy &amp; Sell Pre-Owned Products
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find affordable items, save money, and reduce waste with UsedBay
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/products"
                className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
              >
                Start Shopping
              </Link>
              <Link
                href="/register"
                className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition"
              >
                Start Selling
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <Image
              src="/images/hero-shopping.png"
              alt="Shopping"
              width={500}
              height={500}
              priority
              className="rounded-xl w-full h-auto"
            />
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl p-8 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "5,000+", label: "Active Products" },
              { value: "2,500+", label: "Trusted Sellers" },
              { value: "10,000+", label: "Happy Buyers" },
            ].map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-teal-600 mb-2">{value}</div>
                <p className="text-gray-700">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}