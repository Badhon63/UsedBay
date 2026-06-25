"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

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

    await signUp.email(
      {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          const message = ctx.error.message || "Something went wrong";
          if (
            message.toLowerCase().includes("email") ||
            message.toLowerCase().includes("user already")
          ) {
            setErrors({ email: message });
          } else if (message.toLowerCase().includes("password")) {
            setErrors({ password: message });
          } else {
            setErrors({ form: message });
          }
        },
      },
    );

    setLoading(false);
  };

  return (
    <div className="flex py-10 items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-96 bg-white p-8 rounded-lg shadow-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Create an account</h1>
        <p className="text-sm text-gray-500 text-center">
          Join <span className="text-teal-600 font-medium">UsedBay</span> to
          start buying and selling
        </p>

        {errors.form && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            {errors.form}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 duration-100 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 duration-100 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-xs text-red-600 mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 duration-100 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-xs text-red-600 mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 text-white py-2 rounded-md text-sm font-medium hover:bg-teal-700 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-teal-600 font-medium">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
