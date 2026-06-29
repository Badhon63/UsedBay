import CheckoutClient from "@/components/checkout/checkoutClient";
import { fetchProductById } from "@/lib/fetch";

const CheckoutPage = async ({ params }) => {
  const { id } = await params;
  const product = await fetchProductById(id);
  return <CheckoutClient product={product} />;
};

export default CheckoutPage;
