import { ISidebarButtonGroup } from "@/interfaces/ISidebarButtons";
import { SidebarCollapse, SidebarItem, SidebarItemGroup } from "flowbite-react";
import { usePathname } from "next/navigation";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

export default function DynamicSidebarButtons({
  sidebarButtons,
}: {
  sidebarButtons: ISidebarButtonGroup;
}) {
  const pathName = usePathname();
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
        <SidebarItemGroup >
        <SidebarCollapse
                className="transition-all transition-discrete duration-700 cursor-pointer"

          icon={sidebarButtons.icon}
          label={sidebarButtons.title}
          renderChevronIcon={(theme, open) => {
            const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;
            return (
              <IconComponent
                aria-hidden
                className={twMerge(theme.label.icon.open[open ? "on" : "off"])}
              />
            );
          }}
        >
            <SidebarItemGroup>
            {sidebarButtons.children.map((child)=>(
                <DynamicSidebarButtons key={child.name} sidebarButtons={child} />
            ))}
            </SidebarItemGroup>
        </SidebarCollapse>
        </SidebarItemGroup>
      )}
    </>
  );
}
