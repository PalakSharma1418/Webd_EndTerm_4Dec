import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Dashboard from "./pages/vendor/Dashboard.jsx";
import Menu from "./pages/vendor/Menu.jsx";
import Orders from "./pages/vendor/Orders.jsx";
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import Users from "./components/admin/Users.jsx";
import Products from "./components/admin/Products.jsx";
import AdminOrders from "./components/admin/Orders.jsx";
import { AdminProvider } from "./components/admin/AdminContext.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <AdminProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/vendor/dashboard" element={<Dashboard />} />
          <Route path="/vendor/menu" element={<Menu />} />
          <Route path="/vendor/orders" element={<Orders />} />

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Routes>
      </AdminProvider>
    </BrowserRouter>
  );
}
