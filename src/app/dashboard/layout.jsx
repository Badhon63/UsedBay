import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row">
      <DashboardSidebar />
      {children}
    </div>
  );
};

export default DashboardLayout;
