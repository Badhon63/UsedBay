"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IoLogOutOutline } from "react-icons/io5";
import { useSession, signOut } from "@/lib/auth-client";
import Image from "next/image";
import { Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const getDashboardLink = () => {
    if (!user) return null;
    if (user.role === "admin") return "/dashboard/admin";
    if (user.role === "seller") return "/dashboard/seller";
    return "/dashboard/buyer";
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About Us" },
    ...(getDashboardLink()
      ? [{ href: getDashboardLink(), label: "Dashboard" }]
      : []),
  ];

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  const router = useRouter();

  useEffect(() => {
    if (!isPending && session?.user) {
      const missingFields = [];
      if (!session.user.role) missingFields.push("role");
      if (!session.user.phone) missingFields.push("phone");
      if (!session.user.location) missingFields.push("location");
      if (missingFields.length > 0) {
        router.push("/onboarding");
      }
    }
  }, [session, isPending]);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-teal-600">
            UsedBay
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-teal-600 text-sm font-medium transition"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-1">
            {isPending ? (
              <div className="w-9 h-9 flex items-center justify-center">
                <Spinner color="current" />
              </div>
            ) : user ? (
              <div className="flex items-center gap-2">
                {user?.image ? (
                  <Image
                    src={user?.image}
                    alt={user?.name || "User avatar"}
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-medium">
                    {user.name?.charAt(0).toUpperCase() || "?"}
                  </div>
                )}
                <span className="text-sm text-gray-700 font-medium hidden lg:block">
                  {user.name}
                </span>
              </div>
            ) : (
              <>
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
              </>
            )}

            <button
              onClick={handleSignOut}
              className={`p-2 cursor-pointer ${
                isPending ? "invisible" : user ? "text-gray-600 hover:text-teal-600" : "hidden"
              }`}
              aria-label="Log out"
              title="Log out"
            >
              <IoLogOutOutline className="w-8 h-8" />
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-teal-600"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:text-teal-600 hover:bg-gray-50 text-sm font-medium py-2 px-2 rounded"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 border-t border-gray-100 mt-2 px-2 py-2">
              {isPending ? (
                <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
              ) : user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User avatar"}
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-full object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-medium">
                        {user.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </div>
                  <button onClick={handleSignOut} className="p-2 text-gray-700 hover:text-teal-600">
                    <IoLogOutOutline className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href="/login" onClick={() => setIsOpen(false)} className="text-center px-4 py-2 text-gray-700 text-sm font-medium hover:text-teal-600">
                    Login
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)} className="text-center px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded hover:bg-teal-700">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;