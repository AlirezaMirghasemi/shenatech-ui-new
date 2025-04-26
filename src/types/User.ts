import { Gender } from "@/constants/data/Gender";
import { Permission } from "./Permission";
import { Image } from "./Image";

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  bio: string | null;
  gender: Gender | null;
  mobile: string | null;
  profile_image: Image | null;
  roles: string[]|null;
  permissions: Permission[]|null;
}
