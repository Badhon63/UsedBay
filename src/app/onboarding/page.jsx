"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { updateUser } from "@/lib/auth-client";

const Onboarding = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [formData, setFormData] = useState({
    role: user?.role || "buyer",
    phone: user?.phone || "",
    location: user?.location || "",
    image: user?.image || "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
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

    if (!formData.role) {
      newErrors.role = "Please select a role";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (formData.image && !isValidImageUrl(formData.image)) {
      newErrors.image = "Please enter a valid image URL";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    const updateData = {
      role: formData.role,
      phone: formData.phone,
      location: formData.location,
    };

    if (formData.image) {
      updateData.image = formData.image;
    }

    await updateUser(updateData);
    router.push("/");
  };

  return (
    <div className="flex py-10 items-center justify-center bg-gray-50 min-h-screen">
      <div className="w-96 bg-white p-8 rounded-lg shadow-md space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold">Complete Your Profile</h1>
          <p className="text-sm text-gray-500">Help us know more about you</p>
        </div>

        {errors.form && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            {errors.form}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">I want to</label>
          <div className="grid grid-cols-2 gap-3">
            {["buyer", "seller"].map((r) => (
              <label
                key={r}
                className={`flex items-center justify-center gap-2 border rounded-md px-3 py-3 text-sm font-medium cursor-pointer transition-colors duration-100 ${
                  formData.role === r
                    ? "border-teal-600 bg-teal-50 text-teal-600"
                    : "border-gray-300 text-gray-600 hover:border-teal-400"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={r}
                  checked={formData.role === r}
                  onChange={handleChange}
                  className="sr-only"
                />
                {r === "buyer" ? "Buy items" : "Sell items"}
              </label>
            ))}
          </div>
          {errors.role && (
            <p className="text-xs text-red-600 mt-1">{errors.role}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 duration-100 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="+880 1234-567890"
          />
          {errors.phone && (
            <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 duration-100 ${
              errors.location ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="City, Country"
          />
          {errors.location && (
            <p className="text-xs text-red-600 mt-1">{errors.location}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Photo URL <span className="text-gray-500 text-xs">(optional)</span>
          </label>
          <input
            type="text"
            name="image"
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 duration-100 ${
              errors.image ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="https://example.com/photo.jpg"
          />
          {errors.image && (
            <p className="text-xs text-red-600 mt-1">{errors.image}</p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-teal-600 text-white py-2 rounded-md text-sm font-medium hover:bg-teal-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Complete Setup"}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
