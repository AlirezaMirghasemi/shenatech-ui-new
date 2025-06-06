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
import { FaDoorOpen, FaGear, FaUserPen } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminDashboardButton from "./AdminDashboardButton";
import ThemeToggle from "../../common/ThemeToggle";
import LogoutModal from "../auth/logout/LogoutModal";
import { Image } from "@/types/Image";

export function Header({ handleOpen }: { handleOpen: () => void }) {
  const [logoutModalMode, setLogoutModalMode] = useState(false);

  const { user, actions } = useAuth();
  const logout = async () => {
    await actions.logout();
    setLogoutModalMode(false);
    toast.success("خروج با موفقیت انجام شد ، به امید دیدار");
    window.location.href = "/admin/login";
  };
  useEffect(() => {
    actions.loadUser();
  }, []);
  console.log(user);
  return (
    <>
      <Navbar
        fluid
        rounded
        className=" py-[21px] border-b-2 border-accent/50 dark:border-accent/50 bg-bg-default dark:bg-bg-default  w-full z-16 top-0 start-0 fixed "
      >
        <div className="flex justify-between">
          <AdminDashboardButton handleOpen={handleOpen} />
        </div>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              user && (
                <Avatar
                  alt="عکس کاربر"
                  img={`${process.env.NEXT_PUBLIC_FILE_URL}/${
                    (user?.profile_image as Image).path
                  }`}
                  placeholderInitials={user?.username.charAt(0)}
                  rounded
                  bordered
                  color="primary"
                  status="online"
                  className="cursor-pointer ml-2"
                />)
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
            <DropdownItem onClick={() => setLogoutModalMode(true)}>
              <FaDoorOpen className="ml-2" />
              خروج
            </DropdownItem>
          </Dropdown>
          <ThemeToggle className=" static m-1 p-0" />
        </div>
      </Navbar>
      <LogoutModal
        logoutModalMode={logoutModalMode}
        setLogoutModalMode={setLogoutModalMode}
        logout={logout}
      />
    </>
  );
}
