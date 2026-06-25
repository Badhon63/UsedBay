"use client";

export default function MarketplaceStatistics() {
  const stats = [
    {
      id: 1,
      label: "Total Products",
      value: "5,000+",
    },
    {
      id: 2,
      label: "Total Sellers",
      value: "2,500+",
    },
    {
      id: 3,
      label: "Total Buyers",
      value: "10,000+",
    },
    {
      id: 4,
      label: "Completed Orders",
      value: "8,500+",
    },
  ];

  return (
    <section className="py-16 bg-linear-to-r from-teal-50 to-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Marketplace Statistics
          </h2>
          <p className="text-gray-600">
            Join thousands of users buying and selling on UsedBay
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-lg p-8 text-center shadow-sm"
            >
              <div className="text-5xl font-bold text-teal-600 mb-2">
                {stat.value}
              </div>
              <p className="text-gray-700 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
