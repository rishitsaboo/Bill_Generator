import { Routes, Route } from "react-router-dom";
import BillGenerator from "./pages/bill_preview";
import Login_page from "./pages/login_page";
import Register from "./pages/register_page";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login_page />} />
      <Route path="/register" element={<Register />} />
      <Route path="/bill-generator" element={<BillGenerator />} />
    </Routes>
  );
}
