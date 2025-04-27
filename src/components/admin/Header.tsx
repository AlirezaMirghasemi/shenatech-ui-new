"use client";
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
import { useAuth } from "@/hooks/useAuth";
import { FaUser } from "react-icons/fa6";
import { useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";

export function Header() {
  const { user, actions } = useAuth();
  const logout = async () => {
    await actions.logout();
    window.location.href = "/admin/login";
  };
  useEffect(() => {
    actions.loadUser();
  }, []);
  return (
    <Navbar fluid rounded>
      <NavbarBrand href="">
        <Image
          src="/shenatech_logo.png"
          className="mr-3 h-6 sm:h-9"
          alt="شناتک"
          width={100}
          height={150}
        />
      </NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            user?.profile_image ? (
              <Avatar
                alt="User settings"
                img={user?.profile_image.path}
                rounded
              />
            ) : (
              <FaUser />
            )
          }
        >
          <DropdownHeader>
            <span className="block text-sm">
              {user?.first_name} {user?.last_name}
            </span>
            <span className="block truncate text-sm font-medium">
              {user?.email}
            </span>
          </DropdownHeader>
          <DropdownItem>داشبورد</DropdownItem>
          <DropdownItem>تنظیمات</DropdownItem>
          <DropdownItem>درآمد</DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={logout}>
            <FaSignOutAlt />
            خروج
          </DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
    </Navbar>
  );
}
