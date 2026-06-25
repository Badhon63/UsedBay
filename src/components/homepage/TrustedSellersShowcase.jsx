"use client";

export default function TrustedSellersShowcase() {
  const sellers = [
    {
      id: 1,
      name: "Nusrat Jahan",
      rating: 4.9,
      reviews: 245,
      products: 48,
      verified: true,
    },
    {
      id: 2,
      name: "Ahmed Khan",
      rating: 4.8,
      reviews: 198,
      products: 35,
      verified: true,
    },
    {
      id: 3,
      name: "Fatima Begum",
      rating: 4.9,
      reviews: 312,
      products: 62,
      verified: true,
    },
    {
      id: 4,
      name: "Karim Hassan",
      rating: 4.7,
      reviews: 156,
      products: 28,
      verified: true,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Trusted Sellers
          </h2>
          <p className="text-gray-600">
            Shop with confidence from our verified sellers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sellers.map((seller) => (
            <div
              key={seller.id}
              className="border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition"
            >
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-700 font-bold text-2xl">
                  {seller.name.charAt(0)}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {seller.name}
              </h3>

              {seller.verified && (
                <p className="text-sm text-gray-700 font-medium mb-3">
                  ✓ Verified Seller
                </p>
              )}

              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < Math.floor(seller.rating)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="text-sm text-gray-600 mb-3">
                {seller.rating} ({seller.reviews} reviews)
              </p>

              <p className="text-sm text-gray-700 font-medium">
                {seller.products} products listed
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
