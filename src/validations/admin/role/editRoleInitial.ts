import {  EditRole } from "@/types/Role";

export const editRoleInitial = ({roleName}: {roleName: string}): EditRole => {
  return {
    name: roleName,
  };
};
