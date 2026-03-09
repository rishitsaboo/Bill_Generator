import { Routes, Route } from "react-router-dom";
import BillGenerator from "./pages/bill_preview";
import Login_page from "./pages/login_page";
import Register from "./pages/register_page";
import DashBoard from "./pages/dashboard";
import DashboardLayout from "./components/layout/DashboardLayout"

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login_page />} />
      <Route path="/register" element={<Register />} />
      <Route path="bill-generator" element={<BillGenerator />} />
      {/* <Route path="/DashBoard" element={< DashBoard/>} /> */}

       <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <DashBoard />
          </DashboardLayout>
        }
      />
      {/* <Route
        path="/products"
        element={
          <DashboardLayout>
            <Products />
          </DashboardLayout>
        }
      />  */}
    </Routes>
  );
}
