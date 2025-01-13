import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom"; // Navigate is a component and useNavigate is a hook

export default function PrivateRoutes() {
  const { currentUser } = useSelector((state) => state.user.currentUser);
  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
}
