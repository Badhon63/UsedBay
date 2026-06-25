"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white text-3xl font-bold mb-4">UsedBay</h3>
            <p className="text-sm text-gray-400">
              Buy and sell pre-owned products safely and efficiently. Join our
              community today.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <a href="/products" className="hover:text-white transition">
                  All Products
                </a>
              </li>
              <li>
                <a href="/categories" className="hover:text-white transition">
                  Categories
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: support@usedbay.com</li>
              <li>Phone: +880 1234-567890</li>
              <li>Address: Dhaka, Bangladesh</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="space-y-2 text-sm">
              <p>
                <a href="#" className="hover:text-white transition">
                  Facebook
                </a>
              </p>
              <p>
                <a href="#" className="hover:text-white transition">
                  Twitter
                </a>
              </p>
              <p>
                <a href="#" className="hover:text-white transition">
                  Instagram
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 py-5">
          <p className="text-center text-sm text-gray-400">
            © 2026 UsedBay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
