import { Gender } from "@/constants/data/Gender";
import { UserStatus } from "@/constants/data/UserStatus";
import { CreateUser } from "@/types/User";

export const createUserInitial: CreateUser = {
  username: "",
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  full_name: "",
  bio: null,
  gender: Gender.NotSpecified,
  mobile: null,
  status: UserStatus.PENDING,
  profile_image: null,
  password_confirmation: null
};
