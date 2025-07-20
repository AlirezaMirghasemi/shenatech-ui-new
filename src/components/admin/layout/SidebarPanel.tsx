import { Drawer, DrawerItems, Sidebar, SidebarItems } from "flowbite-react";
import Image from "next/image";
import { FaX } from "react-icons/fa6";

import DynamicSidebarButtons from "../dynamics/DynamicSidebarButtons";
import { SidebarButtons } from "@/config/admin/SidebarButtons";

export function SidebarPanel({
  handleOpen,
  isOpen,
}: {
  handleOpen: () => void;
  isOpen: boolean;
}) {
  return (
    <Drawer
      className={`fixed top-0 right-0 h-full z-30 transition-all duration-300 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      open={isOpen}
      onClose={handleOpen}
      position="right"
      backdrop={false}
      style={{ width: 'fit-content' }}
    >
      <div className="flex flex-col min-w-64 w-full ">
        <div className="flex items-center justify-center p-5  border-b  relative">
          <FaX
            className="absolute top-5 left-5 cursor-pointer p-2 w-8 h-8 transition-colors"
            onClick={handleOpen}
            aria-label="بستن منو"
          />
          <Image
            src="/shenatech_logo.png"
            alt="Shenatech Logo"
            width={100}
            height={125}
            className="dark:invert"
          />
        </div>
        <DrawerItems className="overflow-y-auto  w-full p-4">
          <Sidebar className="w-full">
            <SidebarItems className="w-full space-y-1">
              <DynamicSidebarButtons
                key={Math.random()}
                sidebarButtons={SidebarButtons}
              />
            </SidebarItems>
          </Sidebar>
        </DrawerItems>
      </div>
    </Drawer>
  );
}
