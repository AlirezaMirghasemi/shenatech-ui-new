import { EditUser, User } from "@/types/User";

export const editUserInitial = ({ user }: { user: User }): EditUser => {
  return {
    username: user.username,
    email: user.email,
    mobile: user.mobile,
    gender: user.gender,
    first_name: user.first_name,
    last_name: user.last_name,
    full_name: user.full_name,
    bio: user.bio,
    profile_image: user.profile_image as File | null,
    status: user.status,
  };
};
