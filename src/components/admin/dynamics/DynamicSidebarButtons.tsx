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
      {!sidebarButtons.children && (
        <SidebarItem
          className="transition-all transition-discrete duration-700 cursor-pointer"
          href={sidebarButtons.href}
          icon={sidebarButtons.icon}
          active={sidebarButtons.href === pathName}

        >
          {sidebarButtons.title}
        </SidebarItem>
      )}
      {sidebarButtons.children && (
        <SidebarItemGroup>
          <SidebarCollapse
            className="transition-all transition-discrete duration-700 cursor-pointer"
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
                    theme.label.icon.open[open ? "on" : "off"]
                  )}
                />
              );
            }}
          >
            <SidebarItemGroup>
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
    </>
  );
}
