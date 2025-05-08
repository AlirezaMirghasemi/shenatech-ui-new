"use client";
import { Header } from "@/components/admin/Header";
import { SidebarPanel } from "@/components/admin/SidebarPanel";
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
      <div className="  max-h-screen">
        <Header handleOpen={handleOpen} />
        <SidebarPanel handleOpen={handleOpen} isOpen={isOpen} />
      <main
        className={`max-h-screen flex-1 transition-all duration-300 pt-25  ${
          !isOpen ? "lg:px-35" : "lg:px-80"
        }`}
      >
        {children}
      </main>
      </div>
    </>
  );
}
