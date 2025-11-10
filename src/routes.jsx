import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import EditUser from "./pages/EditUser";
import NotFound from "./pages/NotFound";

const token = localStorage.getItem("accessToken");
const isAuth = token ? true : false;

const isAdmin = () => localStorage.getItem("role") === "admin";
// console.log(isAdmin());

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: isAuth ? <Dashboard /> : <Login /> },

      { path: "admin", element: isAuth && isAdmin() ? <Admin /> : <Login /> },

      {
        path: "edit/:id",
        element: isAuth && isAdmin() ? <EditUser /> : <Login />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
// src/
// ├─ api.js                  <-- Axios instance + interceptors
// ├─ main.jsx                <-- Entry point
// ├─ routes.jsx              <-- All routes + route protection
// ├─ AppLayout.jsx           <-- Layout with navbar + outlet
// ├─ components/
// │   └─ Navbar.jsx          <-- Navbar with logout
// └─ pages/
//     ├─ Login.jsx
//     ├─ Register.jsx
//     ├─ Dashboard.jsx       <-- Normal user dashboard
//     ├─ Admin.jsx           <-- Admin panel
//     ├─ EditUser.jsx        <-- Admin edit user
//     └─ NotFound.jsx
