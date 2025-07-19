import { Status } from "@/constants/data/Status";
import { Article } from "./Article";
import { User } from "./User";
import { Video } from "./Video";

export interface Comment {
  id: number;
  content: string;
  status: Status;
  user: User;
  article: Article | null;
  video: Video | null;
  event: Event | null;
  parent: Comment | null;
  replies: Comment[];
  created_at: string;
  updated_at: string| null;
  deleted_at: string | null;
  created_by: User;
  edited_by: User | null;
  deleted_by: User | null;
  restored_by: User | null;
}
