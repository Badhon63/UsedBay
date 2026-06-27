import ProductDetails from "@/components/products/ProductDetails";
import { fetchProductById } from "@/lib/fetch";

const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;
  const product = await fetchProductById(id);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductDetailsPage;
