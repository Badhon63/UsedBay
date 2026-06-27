import { Suspense } from "react";
import MyProducts from "@/components/dashboard/seller/MyProducts";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { fetchMyProducts } from "@/lib/fetch";
import { Spinner } from "@heroui/react";

async function ProductsList({ userId }) {
  const products = await fetchMyProducts(userId);
  return <MyProducts products={products} />;
}

const MyProductsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Suspense
        fallback={
          <div className="flex justify-center my-16">
            <Spinner color="current" />
          </div>
        }
      >
        <ProductsList userId={userId} />
      </Suspense>
    </div>
  );
};

export default MyProductsPage;
