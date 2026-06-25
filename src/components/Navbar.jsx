"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-teal-600">
            UsedBay
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-teal-600 text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-teal-600 text-sm font-medium"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="text-gray-700 hover:text-teal-600 text-sm font-medium"
            >
              Categories
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-teal-600 text-sm font-medium"
            >
              Dashboard
            </Link>
          </div>

          <div className="flex gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-teal-600"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded hover:bg-teal-700"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="md:hidden pb-4 space-y-2">
          <Link
            href="/"
            className="block text-gray-700 hover:text-teal-600 text-sm font-medium py-2"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="block text-gray-700 hover:text-teal-600 text-sm font-medium py-2"
          >
            Products
          </Link>
          <Link
            href="/categories"
            className="block text-gray-700 hover:text-teal-600 text-sm font-medium py-2"
          >
            Categories
          </Link>
          <Link
            href="/dashboard"
            className="block text-gray-700 hover:text-teal-600 text-sm font-medium py-2"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
