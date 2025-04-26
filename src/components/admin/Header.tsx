
import {
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarToggle,
  } from "flowbite-react";
import Image from "next/image";

  export function Header() {
    return (
      <Navbar fluid rounded>
        <NavbarBrand href="">
          <Image src="/shenatech_logo.png" className="mr-3 h-6 sm:h-9" alt="شناتک" width={100} height={150} />
        </NavbarBrand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">name@flowbite.com</span>
            </DropdownHeader>
            <DropdownItem>داشبورد</DropdownItem>
            <DropdownItem>تنظیمات</DropdownItem>
            <DropdownItem>درآمد</DropdownItem>
            <DropdownDivider />
            <DropdownItem>خروج</DropdownItem>
          </Dropdown>
          <NavbarToggle />
        </div>

      </Navbar>
    );
  }
