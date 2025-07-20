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
        className="py-3 px-4 border-b border-border-default bg-bg-alt dark:bg-bg-alt w-full "
      >
        <div className="flex justify-between w-full items-center">
          <div className="flex items-center">
            <AdminDashboardButton handleOpen={handleOpen} />
          </div>
          <div className="flex items-center space-x-3">
            <ThemeToggle className="ml-2" />
            <Dropdown
              arrowIcon={false}
              inline
              label={
                user && (
                  <Avatar
                    alt="عکس کاربر"
                    img={
                      user?.profile_image
                        ? `${process.env.NEXT_PUBLIC_FILE_URL}/${(user?.profile_image as Image).path}`
                        : undefined
                    }
                    placeholderInitials={user?.username.charAt(0)}
                    rounded
                    bordered
                    color="primary"
                    status="online"
                    className="cursor-pointer "
                  />
                )
              }
            >
              <DropdownHeader>
                <span className="block text-sm text-center pb-1 font-medium">
                  {user?.first_name} {user?.last_name}
                </span>
                <span className="block truncate text-sm text-text-secondary">
                  {user?.email}
                </span>
              </DropdownHeader>
              <DropdownItem className="flex items-center">
                <FaUserPen className="ml-2 text-text-secondary" />
                حساب کاربری
              </DropdownItem>
              <DropdownItem className="flex items-center">
                <FaGear className="ml-2 text-text-secondary" />
                تنظیمات
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem
                onClick={() => setLogoutModalMode(true)}
                className="flex items-center text-danger hover:!bg-danger/10"
              >
                <FaDoorOpen className="ml-2" />
                خروج
              </DropdownItem>
            </Dropdown>
          </div>{" "}
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
