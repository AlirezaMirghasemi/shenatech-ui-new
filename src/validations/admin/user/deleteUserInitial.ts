import { DeleteUser } from "@/types/User";

export const deleteUserInitial = ({
  userId,
}: {
  userId: number;
}): DeleteUser => {
  return { removeProfilePicture: false, removeRoles: false, userId: userId };
};
