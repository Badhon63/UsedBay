"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";

const AllProducts = ({ products, total, pages, currentPage, search, sort }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(search || "");
  const [sortInput, setSortInput] = useState(sort || "newest");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchInput) params.set("search", searchInput);
    if (sortInput) params.set("sort", sortInput);
    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
  };

  const handleSortChange = (newSort) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", newSort);
    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="p-4 sm:p-6">
      <Link href={"/products"} className="cursor-pointer">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <p className="text-gray-600 mt-1">Browse all available products</p>
      </Link>

      <div className="bg-white rounded-lg mb-5 mt-8">
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div className="flex flex-wrap gap-4 sm:min-w-xl">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by product name..."
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
            <button
              type="submit"
              className="bg-teal-600 cursor-pointer text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-teal-700"
            >
              Search
            </button>
          </div>

          <select
            value={sortInput}
            onChange={(e) => handleSortChange(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 w-fit cursor-pointer"
          >
            <option value="newest">Newest</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </form>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-500">No products found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-2">
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
              >
                Previous
              </button>
            )}

            {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                  currentPage === page
                    ? "bg-teal-600 text-white"
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            {currentPage < pages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AllProducts;
