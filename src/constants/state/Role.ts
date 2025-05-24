import { Role } from "@/types/Role";
import { DataStatus } from "../data/DataStatus";
import { ApiError, PaginatedResponse } from "@/types/Api";

export interface RoleState {
  data: Role[] ;
  assigned:Role[];
  meta?: PaginatedResponse<Role>;
  loading: DataStatus;
  error: ApiError | null;
  uniqueLoading:DataStatus;
}
