import { CommonStatus } from "@/constants/data/CommonStatus";
import { User } from "./User";

export interface Slug {
  id: number;
  title_persian: string;
  title_english: string;
  status: CommonStatus;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  created_by: User;
  edited_by: User | null;
  deleted_by: User | null;
  restored_by: User | null;
}
