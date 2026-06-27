import { fetchMyProducts } from "@/lib/fetch";
import ProductCard from "../products/ProductCard";

const FeaturedProducts = async () => {
  const allProducts = await fetchMyProducts();
  const products = allProducts.slice(0, 6);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Featured Products
          </h2>
          <p className="text-gray-600">Check out our latest listings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
