"use client";

import { useSession, updateUser } from "@/lib/auth-client";
import { useState } from "react";
import Image from "next/image";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    location: user?.location || "",
    image: user?.image || "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUser({ name: form.name, phone: form.phone, location: form.location });
      setEditing(false);
    } catch (err) {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) return <div className="p-8 text-gray-400">Loading...</div>;

  return (
    <div className="p-4 sm:p-6 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile Management</h1>
        <p className="text-gray-600 mt-1">Manage your account details</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        {/* Avatar */}
        <div className="flex items-center gap-5 mb-6">
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200">
            {user?.image ? (
              <Image src={user.image} alt="avatar" fill unoptimized className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl text-gray-400">
                {user?.name?.[0]?.toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-xl">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded capitalize">
              {user?.role}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: "Full Name", name: "name", value: form.name },
            { label: "Phone", name: "phone", value: form.phone },
            { label: "Location", name: "location", value: form.location },
          ].map(({ label, name, value }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              {editing ? (
                <input
                  name={name}
                  value={value}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              ) : (
                <p className="text-gray-800 text-sm border border-gray-100 bg-gray-50 rounded-lg px-3 py-2">
                  {value || <span className="text-gray-400">Not set</span>}
                </p>
              )}
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p className="text-gray-500 text-sm border border-gray-100 bg-gray-50 rounded-lg px-3 py-2">
              {user?.email} <span className="text-xs text-gray-400">(cannot change)</span>
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700 disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => setEditing(false)}
                className="border border-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700"
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
