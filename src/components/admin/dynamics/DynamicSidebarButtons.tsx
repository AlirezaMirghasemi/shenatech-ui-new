import { IDynamicSidebarButtonGroup } from "@/interfaces/IDynamicSidebarButtonGroup";
import { SidebarCollapse, SidebarItem, SidebarItemGroup } from "flowbite-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

export default function DynamicSidebarButtons({
  sidebarButtons,
}: {
  sidebarButtons: IDynamicSidebarButtonGroup;
}) {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
// تابع بازگشتی برای بررسی فعال بودن گروه یا فرزندانش
  const isGroupActive = (group: IDynamicSidebarButtonGroup): boolean => {
    if (group.href === pathName) return true;
    if (group.children) {
      return group.children.some(child => isGroupActive(child));
    }
    return false;
  };

  // تنظیم وضعیت باز بودن بر اساس فعال بودن گروه
  useEffect(() => {
    if (sidebarButtons.children) {
      setIsOpen(isGroupActive(sidebarButtons));
    }
  }, [pathName, sidebarButtons]);

  return (
    <>
    <div className="w-full">
      {!sidebarButtons.children && (

        <SidebarItem
          className="transition-all transition-discrete duration-700 cursor-pointer flex  w-full px-4 py-3 rounded-lg"
          href={sidebarButtons.href}
          icon={sidebarButtons.icon}
          active={sidebarButtons.href === pathName}

        >
         <div className="flex items-center w-full whitespace-nowrap">
            {sidebarButtons.title}
          </div>
        </SidebarItem>
      )}
      {sidebarButtons.children && (
        <SidebarItemGroup className="w-full">
          <SidebarCollapse
            className=" flex items-center justify-between transition-all transition-discrete duration-700 cursor-pointer w-full px-4 py-3 hover:bg-bg-hover rounded-lg "
            icon={sidebarButtons.icon}
            label={sidebarButtons.title}
            open={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;
              return (
                <IconComponent
                  aria-hidden
                  className={twMerge(
                    theme.label.icon.open[open ? "on" : "off"],
                    "ml-2"
                  )}
                />
              );
            }}
          >
            <SidebarItemGroup className="pl-4 border-l  ml-3">
              {sidebarButtons.children.map((child) => (
                <DynamicSidebarButtons
                  key={child.name}
                  sidebarButtons={child}
                />
              ))}
            </SidebarItemGroup>
          </SidebarCollapse>
        </SidebarItemGroup>
      )}
      </div>
    </>
  );
}
