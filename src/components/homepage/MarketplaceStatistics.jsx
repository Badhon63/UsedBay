"use client";

import { motion } from "motion/react";

const stats = [
  { id: 1, label: "Total Products", value: "5,000+" },
  { id: 2, label: "Total Sellers", value: "2,500+" },
  { id: 3, label: "Total Buyers", value: "10,000+" },
  { id: 4, label: "Completed Orders", value: "8,500+" },
];

export default function MarketplaceStatistics() {
  return (
    <section className="py-16 bg-gradient-to-r from-teal-50 to-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Marketplace Statistics</h2>
          <p className="text-gray-600">Join thousands of users buying and selling on UsedBay</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition"
            >
              <div className="text-5xl font-bold text-teal-600 mb-2">{stat.value}</div>
              <p className="text-gray-700 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}