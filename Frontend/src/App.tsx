import { Routes, Route } from "react-router-dom";
import BillGenerator from "./pages/bill_preview";
import Login from "./components/login";
import Register from "./components/Register";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/bill-generator" element={<BillGenerator />} />
    </Routes>
  );
}
