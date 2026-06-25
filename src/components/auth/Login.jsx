"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
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

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
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

    await signIn.email(
      {
        email: formData.email,
        password: formData.password,
      },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          const message = ctx.error.message || "Something went wrong";
          if (
            message.toLowerCase().includes("email") ||
            message.toLowerCase().includes("user")
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
        <h1 className="text-2xl font-bold text-center">Welcome back</h1>
        <p className="text-sm text-gray-500 text-center">
          Login to <span className="text-teal-600 font-medium">UsedBay</span> to
          continue
        </p>

        {errors.form && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            {errors.form}
          </div>
        )}

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
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-teal-600 font-medium">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
