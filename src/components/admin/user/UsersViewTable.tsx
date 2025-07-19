"use client";
import DynamicTable from "@/components/admin/dynamics/dynamicTable/DynamicTable";

import { useEffect, useRef, useState } from "react";
import { User } from "@/types/User";
import { useUser } from "@/hooks/useUser";
import UserProfileModal from "./UserProfileModal";
import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import UsersViewTableInitials from "./Initials/UsersViewTableInitials";
export default function UsersViewTable({
  user,
  setUser,
  showUserDetails,
}: {
  user: User | null;
  setUser: (user: User | null) => void;
  showUserDetails: (user: User) => void;
}) {
  const {
    actions: { fetchUsers },
  } = useUser();

  const [usersPage, setUsersPage] = useState("1");
  const [userProfileModal, setUserProfileModal] = useState(false);
  const [createUserModal, setCreateUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);
  const [usersSearchedPage, setUsersSearchedPage] = useState("1");

  useEffect(() => {
    const fetchUsersData = async () => {
      if (searchValue != "") {
        await fetchUsers({search:searchValue, page:usersSearchedPage,perPage: "5"});
        searchRef.current?.focus();
        setUsersPage("1");
      } else {
        await fetchUsers({search:"", page:usersPage,perPage: "5"});
        setUsersSearchedPage("1");
      }
    };
    fetchUsersData();
  }, [usersPage, usersSearchedPage, searchValue]);

  const onCloseUserProfileModal = () => {
    setUserProfileModal(false);
    setUser(null);
  };

  const onCloseCreateUserModal = () => {
    setCreateUserModal(false);
    setUser(null);
  };

  const onCloseEditUserModal = () => {
    setEditUserModal(false);
    setUser(null);
  };

  const onCloseDeleteUserModal = () => {
    setDeleteUserModal(false);
    setUser(null);
  };

  return (
    <>
      <DynamicTable
        dynamicTable={UsersViewTableInitials({
          user,
          showUserDetails,
          setUser,
          setUserProfileModal,
          setEditUserModal,
          setDeleteUserModal,
          setCreateUserModal,
          searchValue,
          setSearchValue,
          searchRef,
        })}
        setPage={setUsersPage}
      />
      <CreateUserModal
        createUserModal={createUserModal}
        onCloseCreateUserModal={onCloseCreateUserModal}
      />
      {user && (
        <>
          <UserProfileModal
            user={user}
            onClose={onCloseUserProfileModal}
            userProfileModal={userProfileModal}
          />
          <EditUserModal
            editUserModal={editUserModal}
            onCloseEditUserModal={onCloseEditUserModal}
            user={user}
          />
          <DeleteUserModal
            deleteUserModal={deleteUserModal}
            onCloseDeleteUserModal={onCloseDeleteUserModal}
            user={user}
          />
        </>
      )}
    </>
  );
}
