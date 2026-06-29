"use client";

import { useSession, updateUser } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import Image from "next/image";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        location: user.location || "",
      });
    }
  }, [user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUser({
        name: form.name,
        phone: form.phone,
        location: form.location,
      });
      setEditing(false);
    } catch {
      alert("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile Management</h1>
        <p className="text-gray-600 mt-1">Manage your personal information</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        {/* Avatar + basic info */}
        <div className="flex items-center gap-5 mb-8 pb-6 border-b">
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-teal-100 flex-shrink-0">
            {user?.image ? (
              <Image
                src={user.image}
                alt="avatar"
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-teal-600">
                {user?.name?.[0]?.toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <p className="font-bold text-gray-900 text-xl">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <span className="inline-block mt-1 text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full capitalize font-medium">
              {user?.role || "buyer"}
            </span>
          </div>
        </div>

        {/* Editable fields */}
        <div className="space-y-5">
          {[
            { label: "Full Name", name: "name", placeholder: "Your full name" },
            { label: "Phone Number", name: "phone", placeholder: "01XXXXXXXXX" },
            { label: "Location", name: "location", placeholder: "City, Country" },
          ].map(({ label, name, placeholder }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              {editing ? (
                <input
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              ) : (
                <p className="text-gray-800 text-sm bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5">
                  {form[name] || (
                    <span className="text-gray-400">Not set</span>
                  )}
                </p>
              )}
            </div>
          ))}

          {/* Email — read only */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <p className="text-gray-500 text-sm bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 flex justify-between">
              {user?.email}
              <span className="text-xs text-gray-400">Cannot be changed</span>
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex gap-3">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-teal-600 text-white px-6 py-2.5 rounded-lg hover:bg-teal-700 transition font-semibold disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setForm({
                    name: user?.name || "",
                    phone: user?.phone || "",
                    location: user?.location || "",
                  });
                }}
                className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-teal-600 text-white px-6 py-2.5 rounded-lg hover:bg-teal-700 transition font-semibold"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;