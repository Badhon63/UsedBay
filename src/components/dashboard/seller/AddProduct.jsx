"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { createProduct } from "@/lib/actions";
import Loading from "@/app/loading";

const AddProduct = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    condition: "Good",
    price: "",
    images: ["", "", ""],
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const categories = [
    "Electronics",
    "Furniture",
    "Vehicles",
    "Fashion",
    "Mobile Phones",
    "Books",
    "Sports",
    "Home & Garden",
  ];

  const conditions = ["Good", "Like New", "Refurbished"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
    if (errors[`image${index}`]) {
      setErrors({ ...errors, [`image${index}`]: "" });
    }
  };

  const isValidImageUrl = (url) => {
    if (!url) return true;
    try {
      const urlObj = new URL(url);
      const validExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".webp",
        ".svg",
      ];
      const pathname = urlObj.pathname.toLowerCase();
      return validExtensions.some((ext) => pathname.endsWith(ext));
    } catch {
      return false;
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.condition) {
      newErrors.condition = "Condition is required";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a valid positive number";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    const hasAtLeastOneImage = formData.images.some((img) => img.trim());
    if (!hasAtLeastOneImage) {
      newErrors.images = "At least one image is required";
    }

    formData.images.forEach((image, index) => {
      if (image && !isValidImageUrl(image)) {
        newErrors[`image${index}`] = "Invalid image URL";
      }
    });

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    const productData = {
      title: formData.title,
      category: formData.category,
      condition: formData.condition,
      price: Number(formData.price),
      images: formData.images.filter((img) => img.trim()),
      description: formData.description,
      sellerInfo: {
        userId: user?.id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
      },
      status: "available",
    };

    try {
      await createProduct(productData);
      router.push("/dashboard/seller/my-products");
    } catch (error) {
      setErrors({ form: error.message || "Failed to add product" });
    }

    setLoading(false);
  };

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add Product</h1>
        <p className="text-gray-600 mt-1">List a new product for sale</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg border border-gray-200 p-6 space-y-6"
      >
        {errors.form && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
            {errors.form}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 duration-100 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g. Used Dell Inspiron 15 Laptop"
          />
          {errors.title && (
            <p className="text-xs text-red-600 mt-1">{errors.title}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 duration-100 ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-xs text-red-600 mt-1">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Condition</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 duration-100"
            >
              {conditions.map((cond) => (
                <option key={cond} value={cond}>
                  {cond}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price (৳)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 duration-100 ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g. 35000"
          />
          {errors.price && (
            <p className="text-xs text-red-600 mt-1">{errors.price}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Images (Up to 3, at least 1 required)
          </label>
          {errors.images && (
            <p className="text-xs text-red-600 mb-2">{errors.images}</p>
          )}
          {formData.images.map((image, index) => (
            <div key={index} className="mb-3">
              <input
                type="text"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 duration-100 ${
                  errors[`image${index}`] ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={`Image URL ${index + 1} (optional)`}
              />
              {errors[`image${index}`] && (
                <p className="text-xs text-red-600 mt-1">
                  {errors[`image${index}`]}
                </p>
              )}
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 duration-100 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Describe your product in detail"
          />
          {errors.description && (
            <p className="text-xs text-red-600 mt-1">{errors.description}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 text-white py-2 rounded-md text-sm font-medium hover:bg-teal-700 disabled:opacity-50"
        >
          {loading ? "Adding product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
