import type { Dispatch, SetStateAction } from "react";
import { FiMenu } from "react-icons/fi";

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Navbar({ setIsOpen }: Props) {
  return (
    <div className="flex items-center justify-between bg-white p-4 shadow">

      {/* Mobile Menu Button */}
      <button
        className="md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <FiMenu size={24} />
      </button>

      <h1 className="text-lg font-semibold">
        Admin Dashboard
      </h1>

    </div>
  );
}
