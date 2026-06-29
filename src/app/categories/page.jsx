import Link from "next/link";

const categories = [
  { name: "Electronics", icon: "💻", count: 1200, color: "bg-blue-50 border-blue-200 text-blue-700", href: "/products?search=Electronics" },
  { name: "Furniture", icon: "🪑", count: 850, color: "bg-orange-50 border-orange-200 text-orange-700", href: "/products?search=Furniture" },
  { name: "Vehicles", icon: "🚗", count: 450, color: "bg-red-50 border-red-200 text-red-700", href: "/products?search=Vehicles" },
  { name: "Fashion", icon: "👗", count: 1650, color: "bg-pink-50 border-pink-200 text-pink-700", href: "/products?search=Fashion" },
  { name: "Mobile Phones", icon: "📱", count: 920, color: "bg-emerald-50 border-emerald-200 text-emerald-700", href: "/products?search=Mobile" },
  { name: "Books", icon: "📚", count: 630, color: "bg-yellow-50 border-yellow-200 text-yellow-700", href: "/products?search=Books" },
  { name: "Sports", icon: "⚽", count: 410, color: "bg-green-50 border-green-200 text-green-700", href: "/products?search=Sports" },
  { name: "Home Appliances", icon: "🏠", count: 780, color: "bg-purple-50 border-purple-200 text-purple-700", href: "/products?search=Appliances" },
  { name: "Toys & Games", icon: "🎮", count: 320, color: "bg-indigo-50 border-indigo-200 text-indigo-700", href: "/products?search=Toys" },
  { name: "Musical Instruments", icon: "🎸", count: 190, color: "bg-teal-50 border-teal-200 text-teal-700", href: "/products?search=Musical" },
];

const CategoriesPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">All Categories</h1>
        <p className="text-gray-600">Browse products by category and find what you need</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.href}
            className={`border rounded-xl p-6 text-center hover:shadow-lg transition cursor-pointer ${cat.color}`}
          >
            <div className="text-5xl mb-4">{cat.icon}</div>
            <h3 className="text-lg font-semibold mb-1">{cat.name}</h3>
            <p className="text-sm opacity-75">{cat.count} products</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;