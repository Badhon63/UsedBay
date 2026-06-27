import AllProducts from "@/components/products/AllProducts";

const ProductsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = params.page || 1;
  const search = params.search || "";
  const sort = params.sort || "newest";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?page=${page}&search=${search}&sort=${sort}`,
    { cache: "no-store" },
  );
  const data = await res.json();

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
