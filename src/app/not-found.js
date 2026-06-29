import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <p className="text-9xl font-black text-teal-600">404</p>
          <div className="w-24 h-1 bg-teal-600 mx-auto rounded mt-2 mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Page Not Found
          </h1>
          <p className="text-gray-500">
            Oops! The page you are looking for does not exist or has been moved.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
          >
            Back to Home
          </Link>
          <Link
            href="/products"
            className="border border-teal-600 text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}