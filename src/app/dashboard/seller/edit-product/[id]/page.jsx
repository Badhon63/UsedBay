import EditProduct from "@/components/dashboard/seller/EditProduct";
import React from "react";

const EditProductPage = async ({ params }) => {
  const { id } = await params;
  return (
    <div className="w-full max-w-7xl mx-auto">
      <EditProduct productId={id} />
    </div>
  );
};

export default EditProductPage;
