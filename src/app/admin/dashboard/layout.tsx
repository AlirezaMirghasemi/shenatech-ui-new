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
      <div className="w-full min-w-0 ">
        <Header handleOpen={handleOpen} />
        <div className=" lg:flex ">
          <SidebarPanel handleOpen={handleOpen} isOpen={isOpen} />
            <div className="flex p-5">
              <div className="flex min-w-0 flex-1 flex-col   lg:mt-0 mt-10">
                <main>{children}</main>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
