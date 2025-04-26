import { User } from "./User";
import { Slug } from "./Slug";
import { Tag } from "./Tag";
import { Image } from "./Image";

export interface Event {
  id: number;
  title: string;
  content: string;
  status: "draft" | "pending" | "approved" | "rejected";
  user: User;
  slug: Slug;
  poster: Image | null;
  tags: Tag[];
  created_at: string;
  updated_at: string;
}
