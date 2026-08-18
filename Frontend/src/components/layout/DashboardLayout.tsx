import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex min-w-0 flex-1 flex-col">

        <Navbar setIsOpen={setIsOpen} />

        <main className="min-w-0 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>

      </div>
    </div>
  );
}
