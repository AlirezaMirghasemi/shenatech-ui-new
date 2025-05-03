"use client";

import { Drawer, DrawerItems, Sidebar, SidebarItems } from "flowbite-react";
import Image from "next/image";
import { FaX } from "react-icons/fa6";

import DynamicSidebarButtons from "./dynamics/DynamicSidebarButtons";
import { SidebarButtons } from "@/config/admin/SidebarButtons";

export function SidebarPanel({
  handleOpen,
  isOpen,
}: {
  handleOpen: () => void;
  isOpen: boolean;
}) {
  return (
    <div className="fixed lg:sticky z-50  max-w-72 lg:size-full ">
      <Drawer
        className="overflow-y-auto  max-w-72 p-0 m-0 bg-bg-active border-l-2 border-border-default/15 dark:bg-bg-active"
        open={isOpen}
        onClose={handleOpen}
        position="right"
        backdrop={false}
      >
        <div className="flex items-center justify-center p-5 bg-bg-default border-b-2 border-accent/50 mb-5">
          <FaX
            className="rounded-lg hover:text-secondary-hover hover:bg-primary/20 absolute top-5 left-5 text-text-default/50 cursor-pointer p-2 w-8 h-8"
            onClick={handleOpen}
          />
          <Image
            src="/shenatech_logo.png"
            alt="Shenatech Logo"
            width={100}
            height={125}
          />
        </div>
        <DrawerItems className="bg-bg-active">
          <Sidebar
            aria-label="admin-sidebar"
            className="bg-bg-active child-padding-0 p-3 mr-3 "
          >
            <SidebarItems className="bg-bg-active">
              <DynamicSidebarButtons sidebarButtons={SidebarButtons} />
            </SidebarItems>
          </Sidebar>
        </DrawerItems>
      </Drawer>
    </div>
  );
}
