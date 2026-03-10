import type { Dispatch, SetStateAction } from "react";
import { MdDashboard } from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FiX } from "react-icons/fi";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Sidebar({ isOpen, setIsOpen }: Props) {
  return (
    <>
    
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed md:static top-0 left-0 h-full w-64 bg-white shadow-md
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
      >

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">

          <h2 className="text-xl font-bold">
            Sales Admin
          </h2>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <FiX size={22} />
          </button>

        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">

          <NavLink
            to="/dashboard"
            className="flex items-center gap-3 p-3 rounded hover:bg-gray-100"
          >
            <MdDashboard />
            Dashboard
          </NavLink>

          <NavLink
            to="/Products"
            className="flex items-center gap-3 p-3 rounded hover:bg-gray-100"
          >
            <FaBox />
            Manage Items
          </NavLink>
          <NavLink
            to="/bill-generator"
            className="flex items-center gap-3 p-3 rounded hover:bg-gray-100"
          >
            <FaBox />
            bill-generator
          </NavLink>
        </nav>
      </div>
    </>
    
  );
}

