import React from "react";
import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState(location.state ? location.state.tab : 0);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            active={tab === "profile"}
            href="/dashboard?tab=profile"
            icon={HiUser}
            label={"User"}
            labelColor="dark"
          >
            Profile
          </Sidebar.Item>
          <Sidebar.Item
            href="/dashboard/profile"
            icon={HiArrowSmRight}
            className="cursor-pointer"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
