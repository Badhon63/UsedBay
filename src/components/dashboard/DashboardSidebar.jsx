"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  const sellerLinks = [
    { href: "/dashboard/seller", label: "Dashboard" },
    { href: "/dashboard/seller/add-product", label: "Add Product" },
    { href: "/dashboard/seller/my-products", label: "My Products" },
    { href: "/dashboard/seller/manage-orders", label: "Manage Orders" },
    { href: "/dashboard/seller/analytics", label: "Sales Analytics" },
    { href: "/dashboard/seller/profile", label: "Profile Management" },
  ];

  const buyerLinks = [
    { href: "/dashboard/buyer", label: "Dashboard" },
    { href: "/dashboard/buyer/orders", label: "My Orders" },
    { href: "/dashboard/buyer/wishlist", label: "Wishlist" },
    { href: "/dashboard/buyer/payment-history", label: "Payment History" },
    { href: "/dashboard/buyer/profile", label: "Profile Management" },
  ];

  const adminLinks = [
    { href: "/dashboard/admin", label: "Dashboard" },
    { href: "/dashboard/admin/analytics", label: "Analytics" },
    { href: "/dashboard/admin/manage-users", label: "Manage Users" },
    { href: "/dashboard/admin/manage-orders", label: "Manage Orders" },
    { href: "/dashboard/admin/manage-products", label: "Manage Products" },
    { href: "/dashboard/admin/profile", label: "Profile Management" },
  ];

  const getLinks = () => {
    if (user?.role === "admin") return adminLinks;
    if (user?.role === "seller") return sellerLinks;
    return buyerLinks;
  };

  const links = getLinks();
  const isActive = (href) => pathname === href;

  if (!user) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 bg-teal-600 text-white cursor-pointer"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      <aside
        className={`fixed md:relative md:w-64 w-64 h-screen bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } z-30 md:z-0`}
      >
        <nav className="p-6 space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 rounded text-sm font-medium transition-colors cursor-pointer ${
                isActive(link.href)
                  ? "bg-teal-100 text-teal-600 border-l-4 border-teal-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20 top-16 cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default DashboardSidebar;
