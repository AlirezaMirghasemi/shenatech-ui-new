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
  poster: {
    id: number;
    path: string;
    type: ImageType.POSTER;
  } | null;
  tags: Tag[];
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}
