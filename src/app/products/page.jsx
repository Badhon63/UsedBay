import AllProducts from "@/components/products/AllProducts";
import { fetchAllProductsPage } from "@/lib/fetch";

const ProductsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = params.page || 1;
  const search = params.search || "";
  const sort = params.sort || "newest";

  const data = await fetchAllProductsPage(page, search, sort);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <AllProducts
        products={data.products}
        total={data.total}
        pages={data.pages}
        currentPage={data.currentPage}
        search={search}
        sort={sort}
      />
    </div>
  );
};

export default ProductsPage;
