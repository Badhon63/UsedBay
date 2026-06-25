"use client";

export default function PopularCategories() {
  const categories = [
    {
      id: 1,
      name: "Electronics",
      productCount: 1200,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
    },
    {
      id: 2,
      name: "Furniture",
      productCount: 850,
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      textColor: "text-orange-700",
    },
    {
      id: 3,
      name: "Vehicles",
      productCount: 450,
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-700",
    },
    {
      id: 4,
      name: "Fashion",
      productCount: 1650,
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      textColor: "text-pink-700",
    },
    {
      id: 5,
      name: "Mobile Phones",
      productCount: 920,
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-700",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Popular Categories
          </h2>
          <p className="text-gray-600">Browse products by category</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`border rounded-lg p-6 text-center hover:shadow-lg transition cursor-pointer ${category.bgColor} ${category.borderColor}`}
            >
              <h3
                className={`text-lg font-semibold mb-2 ${category.textColor}`}
              >
                {category.name}
              </h3>
              <p className={`text-sm ${category.textColor} opacity-75`}>
                {category.productCount} products
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
