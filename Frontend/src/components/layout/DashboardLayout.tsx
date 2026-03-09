import { useState } from "react";
import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex flex-col flex-1">

        <Navbar setIsOpen={setIsOpen} />

        <main className="p-6 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}
