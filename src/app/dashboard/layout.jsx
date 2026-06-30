"use client";

import dynamic from "next/dynamic";

const DashboardSidebar = dynamic(
  () => import("@/components/dashboard/DashboardSidebar"),
  { ssr: false },
);

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row">
      <DashboardSidebar />
      {children}
    </div>
  );
}
