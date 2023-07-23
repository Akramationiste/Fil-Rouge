import { Outlet } from "react-router-dom";
import React from "react";
import SideNavdash from "../../components/Dashboard/SideNavdash";

function DashLayout() {
  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNavdash />
      </div>
      <div className="w-3/4">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashLayout;
