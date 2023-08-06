import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LayoutPostAddEdit from "../../views/layout/LayoutPostAddEdit";

export default function AuthRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  return user ? (
    <LayoutPostAddEdit>{children}</LayoutPostAddEdit>
  ) : (
    <Navigate to="/auth" />
  );
}
