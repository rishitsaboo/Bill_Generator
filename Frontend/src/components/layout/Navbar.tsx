import type { Dispatch, SetStateAction } from "react";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Navbar({ setIsOpen }: Props) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    
    <div className="flex items-center justify-between bg-white p-4">

      {/* Mobile Menu Button */}
      <button
        className="md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <FiMenu size={24} />
      </button>

      <h1 className="text-lg font-semibold font-serif">
        Admin Dashboard
      </h1>
      <button
        onClick={handleLogout}
        className=" shadow-md flex items-center gap-2 bg-white text-black border rounded-full border-gray-300 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition"
      >
        <LuLogOut />
        Logout
      </button>
    </div>
  );
}
