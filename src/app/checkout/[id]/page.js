import { fetchProductById } from "@/lib/fetch";
import CheckoutClient from "@/components/checkout/CheckoutClient";

const CheckoutPage = async ({ params }) => {
  const { id } = await params;
  const product = await fetchProductById(id);
  return <CheckoutClient product={product} />;
};

export default CheckoutPage;