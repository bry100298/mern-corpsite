// import { useSelector } from "react-redux";
// import { Outlet, Navigate } from "react-router-dom";

// export default function PrivateRoute() {
//   const { currentUser } = useSelector((state) => state.user);
//   return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
// }

// PrivateRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  // Check if the user is logged in
  const isLoggedIn = currentUser !== null;

  // Check if the user is an admin (jamestin100298@gmail.com)
  const isAdmin = currentUser?.email === "jamestin100298@gmail.com";

  // Define routes accessible to everyone (non-admin)
  const accessibleRoutes = [
    "/profile",
    "/create-job",
    "/user-list",
    "/update-list",
  ];

  if (!isLoggedIn) {
    // Redirect unauthenticated users to sign-in
    return <Navigate to="/sign-in" />;
  } else if (!isAdmin) {
    // Redirect non-admin users (other than jamestin100298@gmail.com) from admin routes
    if (window.location.pathname.includes("/admin")) {
      return <Navigate to="/" />;
    }
    // Render Outlet for authenticated non-admin users accessing accessible routes
    if (accessibleRoutes.includes(window.location.pathname)) {
      return <Outlet />;
    }
    // Redirect non-admin users from other protected routes
    return <Navigate to="/" />;
  }

  // Render Outlet for authenticated admin users allowing access to all routes
  return <Outlet />;
};

export default PrivateRoute;
