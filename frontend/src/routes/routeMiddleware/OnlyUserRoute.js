import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function OnlyUserRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  return user.role === "user" ? children : <Navigate to="/user" />;
}
