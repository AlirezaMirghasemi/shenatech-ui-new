import { Tag } from "@/types/Tag";
import { DataStatus } from "../data/DataStatus";
import { ApiError, PaginatedResponse } from "@/types/Api";

export interface TagState {
  data: Tag[] | [];
  meta?: PaginatedResponse<Tag>;
  loading: DataStatus;
  error: ApiError | null;
  uniqueLoading: DataStatus;
  isUnique: boolean;
}
