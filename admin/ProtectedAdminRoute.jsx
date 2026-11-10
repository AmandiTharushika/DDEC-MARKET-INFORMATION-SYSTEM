import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
  const isAdminLoggedIn =
    sessionStorage.getItem("adminLoggedIn") === "true";

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedAdminRoute;