"use client";
import { Header } from "@/components/admin/layout/Header";
import { SidebarPanel } from "@/components/admin/layout/SidebarPanel";
import {  useState } from "react";
export default function AdminPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(true);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
      <div className="flex h-screen">

        <SidebarPanel handleOpen={handleOpen} isOpen={isOpen} />

        <div
          className={`flex flex-col flex-1 transition-all duration-300 ${
            isOpen  ? "mr-64" : ""
          }`}
        >
<Header handleOpen={handleOpen} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>

      </div>
    </>
  );
}
