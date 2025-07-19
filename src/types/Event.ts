import { User } from "./User";
import { Slug } from "./Slug";
import { Tag } from "./Tag";
import { Status } from "@/constants/data/Status";
import { ImageType } from "@/constants/data/Type";

export interface Event {
  id: number;
  title: string;
  content: string;
  status: Status;
  user: User;
  slug: Slug;
  image: {
    id: number;
    path: string;
    type: ImageType.CONTENT;
  }
  poster: {
    id: number;
    path: string;
    type: ImageType.POSTER;
  } | null;
  tags: Tag[];
  created_at: string;
  updated_at: string| null;
  deleted_at: string | null;
  created_by: User;
  edited_by: User | null;
  deleted_by: User | null;
  restored_by: User | null;
}
