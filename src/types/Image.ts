import { ImageType } from "@/constants/data/Type";
import { User } from "./User";

export interface Image {
  id: number;
  title: string | null;
  type: ImageType;
  path: string;
  disk: string;
  mime_type: string | null;
  size: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  created_by: User;
  edited_by: User | null;
  deleted_by: User | null;
  restored_by: User | null;
}
export interface CreateImage {
  title: string | null;
  type: ImageType;
  path: string;
  disk: string;
  mime_type: string | null;
  size: number | null;
}
