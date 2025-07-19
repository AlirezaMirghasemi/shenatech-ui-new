import { Status } from "@/constants/data/Status";
import { User } from "./User";
import { ImageType } from "@/constants/data/Type";
import { Tag } from "./Tag";
import { Slug } from "./Slug";

export interface Article {
  id: number;
  title: string;
  content: string;
  status: Status;
  user: User;
  image: {
    id: number;
    path: string;
    type: ImageType.CONTENT;
  } | null;
  slug: Slug;
  poster: {
    id: number;
    path: string;
    type: ImageType.POSTER;
  } | null;
  tags: Tag[];
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  created_by: User;
  edited_by: User | null;
  deleted_by: User | null;
  restored_by: User | null;
}
