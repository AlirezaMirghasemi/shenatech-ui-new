"use client";
import { Header } from "@/components/admin/layout/Header";
import { SidebarPanel } from "@/components/admin/layout/SidebarPanel";
import { useState } from "react";
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
      <div className=" flex flex-col max-h-screen max-w-screen items-center">
        <Header handleOpen={handleOpen} />
        <SidebarPanel handleOpen={handleOpen} isOpen={isOpen} />
        <main
          className={`max-h-screen max-w-screen transition-all duration-300 pt-25    p-5 `}
        >
          <div className={` items-center ${isOpen ? "mr-[350px] transition-all duration-300" : "transition-all duration-300"}  sm:px-6 mx-auto   `}>
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
