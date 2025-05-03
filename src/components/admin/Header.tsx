"use client";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,

} from "flowbite-react";
import { useAuth } from "@/hooks/useAuth";
import { FaDoorOpen, FaGear, FaUser, FaUserPen } from "react-icons/fa6";
import { useEffect } from "react";
import { toast } from "sonner";
import AdminDashboardButton from "./AdminDashboardButton";
import ThemeToggle from "../common/ThemeToggle";

export function Header({ handleOpen }: { handleOpen: () => void }) {
  const { user, actions } = useAuth();
  const logout = async () => {
    await actions.logout();
    toast.success("خروج با موفقیت انجام شد ، به امید دیدار");
    window.location.href = "/admin/login";
  };
  useEffect(() => {
    actions.loadUser();
  }, []);

  return (
    <>
      <Navbar
        fluid
        rounded
        className=" bg-bg-default  fixed w-full z-16 top-0 start-0 lg:sticky "
      >
        <div className="flex justify-between">

        <AdminDashboardButton handleOpen={handleOpen} />
        </div>

        <div className="flex md:order-2">

          <Dropdown
            arrowIcon={false}
            inline
            label={
              user?.profile_image ? (
                <Avatar
                  alt="user profile picture"
                  img={user?.profile_image.path}
                  rounded
                />
              ) : (
                <FaUser className="rounded-full p-2 mr-2    transition-colors duration-300
         hover:text-secondary-hover hover:bg-primary w-10 h-10 text-center" />
              )
            }
          >
            <DropdownHeader>
              <span className="block text-sm text-center pb-1">
                {user?.first_name} {user?.last_name}
              </span>
              <span className="block truncate text-sm font-medium ">
                {user?.email}
              </span>
            </DropdownHeader>
            <DropdownItem>
              <FaUserPen className="ml-2" />
              حساب کاربری
            </DropdownItem>
            <DropdownItem>
              <FaGear className="ml-2" />
              تنظیمات
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={logout}>
              <FaDoorOpen className="ml-2" />
              خروج
            </DropdownItem>
          </Dropdown>
          <ThemeToggle/>
        </div>
      </Navbar>
    </>
  );
}
