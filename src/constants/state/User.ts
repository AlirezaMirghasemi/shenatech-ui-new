import { User } from "@/types/User";
import { DataStatus } from "../data/DataStatus";
import { ApiError, PaginatedResponse } from "@/types/Api";

export interface UserState {
  data: User[] | [];
  meta?: PaginatedResponse<User>;
  loading: DataStatus;
  error: ApiError | null;
}
