import { Routes, Route, Navigate } from "react-router-dom";
import BillGenerator from "./pages/bill_preview";
import Login_page from "./pages/login_page";
import Register from "./pages/register_page";
import DashBoard from "./pages/dashboard";
import DashboardLayout from "./components/layout/DashboardLayout"
import Products from "./pages/products";
import ProtectedRoute from "./components/ProtectedRoute";
import AddItem from "./pages/AddItem";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login_page />} />
      <Route path="/register" element={<Register />} />
      <Route path="bill-generator" element={<BillGenerator />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <DashBoard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Products />
            </DashboardLayout>
          </ProtectedRoute>
        }
      /> 
      <Route
        path="/add-item"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <AddItem />
            </DashboardLayout>
          </ProtectedRoute>
        }
      /> 
    </Routes>
  );
}
