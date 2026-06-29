import Link from "next/link";
export default function PaymentFailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow p-10 text-center max-w-md">
        <div className="text-6xl mb-4">❌</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
        <p className="text-gray-500 mb-6">Something went wrong. Please try again.</p>
        <Link href="/" className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700">
          Back to Home
        </Link>
      </div>
    </div>
  );
}