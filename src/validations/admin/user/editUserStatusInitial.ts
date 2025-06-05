import { UserStatus } from "@/constants/data/UserStatus";
import {  EditUserStatus } from "@/types/User";

export const editUserStatusInitial = ({status}: {status: UserStatus}): EditUserStatus => {
  return {
    status: status,
  };
};
